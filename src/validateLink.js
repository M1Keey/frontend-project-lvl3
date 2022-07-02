import * as yup from 'yup';

export default (link, feeds) => {
  const urls = feeds.map((url) => url);

  const schema = yup.string().url().notOneOf(urls);

  try {
    schema.validateSync(link);
    return null;
  } catch (e) {
    switch (e.message) {
      case 'this must be a valid URL':
        return 'invalidUrl';
      case 'RSS is already exist':
        return 'existedUrl';
      default:
        return e.message;
    }
  }
};
