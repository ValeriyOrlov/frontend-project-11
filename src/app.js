import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import resources from './locales/index.js';
import render from './render.js';
import parser from './parser.js';

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
        posts: document.querySelector('.posts'),
        feeds: document.querySelector('.feeds'),
        data: [],
    };
//model
    const initialState = {
        form: {
            valid: true,
            processState: 'filling',
            error: '',
        },
        validLinks: [],
    };
    const routes = (url) => `https://allorigins.hexlet.app/get?disableCache=true&url=${url}`; //url with proxy

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
        const schema = yup.string().url().notOneOf(initialState.validLinks);
        schema.validate(inputData)
        .then((link) => {
            state.validLinks.push(link);
            state.form.valid = true;
        })
        .catch((err) => {
            state.form.error = err.errors.map((err) => i18Instance.t(err.key)).join('');
            state.form.valid = false;
            state.form.processState = 'error';
        })
        .then(() => {
            if (initialState.form.valid) {
                axios.get(routes(state.validLinks[state.validLinks.length - 1]))
                .then((response) => {
                    state.form.processState = 'sending';
                    if (!parser(response.data.contents)) {
                        state.form.error = i18Instance.t('parseError');
                        state.form.processState = 'error';
                    } else {
                        elements.data.push(parser(response.data.contents));
                        state.form.processState = 'sent';
                    }
                })
                .catch((networkError) => {
                    state.form.processState = 'error';
                    state.form.error = `network error: ${networkError}`;
                })
            }
        })
        .then(() => state.form.processState = 'filling');
    });
};
