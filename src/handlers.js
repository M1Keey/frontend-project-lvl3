/* eslint-disable no-param-reassign */
import validateLink from './validateLink';

const handleAddLink = (e, state) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const link = formData.get('url');
  state.field = link;
  const errors = validateLink(state.field, state.feeds);
  state.form.errors = errors;

  console.log(errors);

  if (!errors) {
    state.feeds.push(link);
    state.form.processState = 'success';
  } else {
    state.form.processState = 'failed';
  }
};
export default handleAddLink;
