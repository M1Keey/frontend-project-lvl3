/* eslint-disable no-param-reassign */
import validateLink from './validateLink';
import loadRSS from './RSS_loader';
import updateRSS from './RSS_updater';

const handleAddLink = (e, state, i18nextInstance) => {
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
export default handleAddLink;
