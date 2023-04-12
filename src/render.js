const renderError = (fields, error) => {
    fields.rssInput.classList.add('is-invalid');
    if (!fields.rssInputFeedback.classList.contains('text-danger')) {
        fields.rssInputFeedback.classList.remove('text-success');
        fields.rssInputFeedback.classList.add('text-danger');
    }
    fields.rssInputFeedback.textContent = error;
};

const renderSuccess = (fields) => {
    const hadError = fields.rssInput.classList.contains('is-invalid');
    if (hadError) {
        fields.rssInput.classList.remove('is-invalid');
    }
    if (!fields.rssInputFeedback.classList.contains('text-success')) {
        fields.rssInputFeedback.classList.remove('text-danger');
        fields.rssInputFeedback.classList.add('text-success');
    }
    fields.rssInputFeedback.textContent = 'RSS load success';
};

export const render = (elements, initialState) => (path, value, prevValue) => {
    console.log(initialState, prevValue);
    switch (path) {
        case 'form.validLinks':
        renderSuccess(elements.fields);
        break;

        case 'form.error':
        renderError(elements.fields, value);
        break;
        default:
            break;
    }
};

export default render;