import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import resources from './locales/index.js';
import render from './render.js';

export default () => {
    const defaultLanguage = 'ru';
    const i18Instance = i18next.createInstance();
    i18Instance.init({
        lng: defaultLanguage,
        debug: true,
        resources,
    }).then();
    
    const elements = {
        form: document.querySelector('.rss-form'),
        fields: {
            rssInput: document.getElementById('url-input'),
            rssInputFeedback: document.querySelector('.feedback'),
        },
        submitButton: document.querySelector('button[type="submit"]'),
    };
//model
    const initialState = {
        form: {
            valid: true,
            processState: 'filling',
            validLinks: [],
            error: '',
        },
    };
    
    const state = onChange(initialState, render(elements, initialState, i18Instance));
//controllers
    elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputData = formData.get('url');
        console.log(inputData)
        yup.setLocale({
            string: {
                url: () => ({key: 'url'}),
            },
            mixed: {
                notOneOf: () => ({key: 'notOneOf'}),
            }
        })
        const schema = yup.string().url().notOneOf(initialState.form.validLinks);
        schema.validate(inputData)
        .then((link) => {
            state.form.validLinks.push(link);
            state.form.valid = true;
            state.form.processState = 'sending';
        })
        .catch((err) => {
            state.form.error = err.errors.map((err) => i18Instance.t(err.key)).join('');
            state.form.valid = false;
            state.form.processState = 'error';
            console.log(state.form.error)
        });
    });
};
