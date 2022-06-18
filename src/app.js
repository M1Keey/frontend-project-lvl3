import handleAddLink from './handlers';
import view from './view';

const app = () => {
  const state = {
    form: {
      valid: true,
      processState: 'filling',
      processError: null,
      errors: {},
      field: '',
    },
    feeds: [],
  };
  const watchedState = view(state);

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    handleAddLink(e, watchedState);
    console.log(state);
  });
};

export default app;
