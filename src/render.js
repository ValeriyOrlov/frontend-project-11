/*
task: 
реализовать отрисовку оглавлений списков
скорее всего нужно будет избавиться от кардбордермэйкер
*/

const cardBorderMaker = (title) => {
    const cardBorder = document.createElement('div');
    cardBorder.classList.add('card', 'border-0');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title', 'h4');
    cardTitle.textContent = `${title}`;
    cardBody.appendChild(cardTitle);
    const listGroup = document.createElement('ul');
    listGroup.classList.add('list-group', 'border-0', 'rounded-0');
    cardBorder.appendChild(cardBody);
    cardBorder.appendChild(listGroup);
    return cardBorder;
};

const feeds = (data) => {
    const feedsCollection = data.map(({ title, description }) => {
        const feedItem = document.createElement('li');
        feedItem.classList.add('list-group-item', 'border-0', 'border-end-0');
        const feedTitle = document.createElement('h3');
        feedTitle.classList.add('h6', 'm-0');
        feedTitle.textContent = `${title}`;
        const feedDescription = document.createElement('p');
        feedDescription.classList.add('m-0', 'small', 'text-black-50');
        feedDescription.textContent = `${description}`;
        feedItem.appendChild(feedTitle);
        feedItem.appendChild(feedDescription);

        return feedItem;
    });
    return feedsCollection.reverse();  
};

const posts = (data) => {
    const postsCollection = data.map(({ items }) => {
        const postItems = items.map(({ title, description, link }, id) => {
            const postItem = document.createElement('li');
            postItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
            const postLink = document.createElement('a');
            postLink.classList.add('fw-bold');
            postLink.setAttribute('href', `${link}`);
            postLink.setAttribute('data-id', `${id}`);
            postLink.setAttribute('target', '_blank');
            postLink.setAttribute('rel', 'noopener noreferrer');
            postLink.textContent = `${title}`;
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
            button.setAttribute('type', 'button');
            button.setAttribute('data-id', `${id}`);
            button.setAttribute('data-bs-toggle', 'modal');
            button.setAttribute('data-bs-target', '#modal');
            button.textContent = 'Search';
            postItem.appendChild(postLink);
            postItem.appendChild(button);
            return postItem;
        });
        return postItems;
    });
    
    return postsCollection.flat().reverse();
};

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
    const feedsContainer = cardBorderMaker('Feeds');
    const newFeeds = feeds(elements.data);
    newFeeds.forEach((item) => feedsContainer.querySelector('.list-group').append(item));
    const postsContainer = cardBorderMaker('Posts');
    const newPosts = posts(elements.data);
    newPosts.forEach((item) => postsContainer.querySelector('.list-group').append(item));
    elements.feeds.replaceChildren(feedsContainer);
    elements.posts.replaceChildren(postsContainer);
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

