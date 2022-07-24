import * as yup from 'yup';

export default (url, feeds) => {
  const urls = feeds.map(({ link }) => link);

  const schema = yup.string().url().notOneOf(urls);

  try {
    schema.validateSync(url);
    return null;
  } catch (e) {
    return e.message;
  }
};
