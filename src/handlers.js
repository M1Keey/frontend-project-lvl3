/* eslint-disable no-param-reassign */
import axios from 'axios';
import validateLink from './validateLink';
import parseRSS from './RSS_parcer';

const handleAddLink = (e, state, i18nextInstance) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const link = formData.get('url').trim();

  const error = validateLink(link, state.feeds);
  state.form.error = error;

  if (!error) {
    state.form.processState = 'pending';

    const allOrigin = (url) => {
      const result = new URL('/get', 'https://allorigins.hexlet.app');
      result.searchParams.set('url', url);
      result.searchParams.set('disableCache', true);
      return result.toString();
    };

    axios.get(allOrigin(link))
      .then((response) => parseRSS(link, response.data.contents))
      .then((rss) => {
        const { feed, posts } = rss;
        state.feeds.unshift(feed);
        state.posts = [...posts, ...state.posts];
        state.form.processState = 'success';
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
