const renderError = (fields, error) => {
    fields.rssInput.classList.add('is-invalid');
    if (!fields.rssInputFeedback.classList.contains('text-danger')) {
        fields.rssInputFeedback.classList.remove('text-success');
        fields.rssInputFeedback.classList.add('text-danger');
    }
    fields.rssInputFeedback.textContent = error;
};

const renderSuccess = (fields, i18Instance) => {
    const hadError = fields.rssInput.classList.contains('is-invalid');
    if (hadError) {
        fields.rssInput.classList.remove('is-invalid');
    }
    if (!fields.rssInputFeedback.classList.contains('text-success')) {
        fields.rssInputFeedback.classList.remove('text-danger');
        fields.rssInputFeedback.classList.add('text-success');
    }
    fields.rssInputFeedback.textContent = i18Instance.t('success');
   fields.rssInput.value = ''; // to view !!
   fields.rssInput.focus(); // to view !!
};

export default (elements, initialState, i18Instance) => (path, value, prevValue) => {
    console.log(value)
    switch (value) {
        case 'success':
            renderSuccess(elements.fields, i18Instance);
            break;
        case 'error':
            renderError(elements.fields, initialState.form.error);
    }
};

