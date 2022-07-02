/* eslint-disable no-param-reassign */
import validateLink from './validateLink';

const handleAddLink = (e, state, i18nInstance) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const link = formData.get('url');
  state.field = link;
  const error = validateLink(state.field, state.feeds);
  state.form.error = i18nInstance.t(`errors.${error}`);

  console.log(error);

  if (!error) {
    state.feeds.push(link);
    state.form.processState = 'success';
  } else {
    state.form.processState = 'failed';
  }
};
export default handleAddLink;
