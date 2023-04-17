const renderError = (fields, error) => {
    fields.rssInput.classList.add('is-invalid');
    if (!fields.rssInputFeedback.classList.contains('text-danger')) {
        fields.rssInputFeedback.classList.remove('text-success');
        fields.rssInputFeedback.classList.add('text-danger');
    }
    fields.rssInputFeedback.textContent = error;
};

const renderSuccess = (elements, i18Instance) => {
    const hadError = elements.fields.rssInput.classList.contains('is-invalid');
    if (hadError) {
        elements.fields.rssInput.classList.remove('is-invalid');
    }
    if (!elements.fields.rssInputFeedback.classList.contains('text-success')) {
        elements.fields.rssInputFeedback.classList.remove('text-danger');
        elements.fields.rssInputFeedback.classList.add('text-success');
    }
    elements.fields.rssInputFeedback.textContent = i18Instance.t('success');
    elements.fields.rssInput.value = '';
    elements.fields.rssInput.focus();
   /* const title = elements.data.title;
    const description = elements.data.description;
    const cardBorder = document.createElement('div');
    cardBorder.classList('card, border-0');
    //здесь дописываю обёртку оглавления фидов с шаблона и отрисовываю её
    // нужно подумать, стоит ли выносить это в отдельную функцию
    */

};

export default (elements, initialState, i18Instance) => (path, value) => {
    console.log(value)
    switch (value) {
        case 'sent':
            renderSuccess(elements, i18Instance);
            break;
        case 'error':
            renderError(elements.fields, initialState.form.error);
    }
};

