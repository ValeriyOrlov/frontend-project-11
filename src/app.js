import * as yup from 'yup';
import onChange from 'on-change';
import render from './render.js';

export default () => {
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
            state: 'valid',
            processState: 'filling',
            validLinks: [],
            error: '',
        },
    };
    
    const state = onChange(initialState, render(elements, initialState));
//controllers
    elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputData = formData.get('url');
        console.log(inputData)
        const schema = yup.string().url().notOneOf(initialState.form.validLinks);
        schema.validate(inputData)
        .then((link) => {
            state.form.validLinks.push(link);
            state.form.state = true;
            state.form.processState = 'sending';
            elements.fields.rssInput.value = '';
            elements.fields.rssInput.focus();
        })
        .catch((e) => {
            state.form.error = e.message;
            state.form.valid = false;
            state.form.processState = 'error';
        });
    });
};