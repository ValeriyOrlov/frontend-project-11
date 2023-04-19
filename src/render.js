/*
task: 

*/

const feedCardMaker = ({ title, description }) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.classList.add('list-group-item', 'border-0', 'border-end-0');
    const titleEl = document.createElement('h3');
    titleEl.classList.add('h6', 'm-0');
    titleEl.textContent = title;
    const descriptionEl = document.createElement('p');
    descriptionEl.classList.add('m-0', 'small', 'text-black-50');
    descriptionEl.textContent = description;
    listGroupItem.appendChild(titleEl);
    listGroupItem.appendChild(descriptionEl);
    return listGroupItem;
} 

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
    const cardBorder = document.createElement('div'); // начало отрисовки фидов
    cardBorder.classList.add('card', 'border-0');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h2');
    cardTitle.textContent = 'Фиды';
    cardTitle.classList.add('card-title', 'h4');
    const listGroup = document.createElement('ul');
    listGroup.classList.add('list-group', 'border-0', 'rounded-0');
    cardBorder.appendChild(cardBody);
    cardBorder.appendChild(listGroup);
    const newFeedCard = feedCardMaker(elements.data[elements.data.length - 1]);
    if (document.querySelector('.card-title') === null) {
        cardBody.appendChild(cardTitle);
    }
    listGroup.prepend(newFeedCard);
    elements.feeds.appendChild(cardBorder)
     // конец отрисовки фидов


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

