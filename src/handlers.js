/* eslint-disable no-param-reassign */
import validateLink from './validateLink';
import loadRSS from './RSS_loader';
import updateRSS from './RSS_updater';

export const handleAddLink = (e, state, i18nextInstance) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const link = formData.get('url').trim();

  const error = validateLink(link, state.feeds);
  state.form.error = error;

  if (!error) {
    state.form.processState = 'pending';

    loadRSS(link)
      .then((rss) => {
        const { feed, posts } = rss;
        state.feeds.unshift(feed);
        state.posts = [...posts, ...state.posts];
        state.form.processState = 'success';
        updateRSS(link, state);
      })
      .catch((err) => {
        if (err.isAxiosError) {
          state.form.error = i18nextInstance.t('errors.requestErr');
        } else {
          state.form.error = i18nextInstance.t('errors.invalidRSS');
        }
        state.form.processState = 'failed';
      });
  } else {
    state.form.processState = 'failed';
  }
};

export const handleViewPost = (post) => {
  document.body.classList.add('modal-open');
  document.querySelector('.modal-title').textContent = post.title;
  document.querySelector('.modal-body').innerHTML = post.description;
  document.querySelector('.full-article').href = post.url;

  const substrate = document.createElement('div');
  substrate.classList.add('modal-backdrop', 'fade', 'show');
  document.body.append(substrate);

  const modal = document.querySelector('#modal');
  modal.classList.add('show');
  modal.style.display = 'block';
  modal.setAttribute('role', 'dialog');
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', 'true');
};

export const handleCloseModal = () => {
  document.body.classList.remove('modal-open');

  const substrate = document.querySelector('.modal-backdrop');
  substrate.remove();

  const modal = document.querySelector('#modal');
  modal.classList.remove('show');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('role', 'aria-modal');
};
