import _ from 'lodash';
import axios from 'axios';
import parseRSS from './RSS_parcer.js';

const allOrigin = (url) => {
  const result = new URL('/get', 'https://allorigins.hexlet.app');
  result.searchParams.set('url', url);
  result.searchParams.set('disableCache', true);
  return result.toString();
};
const addPostId = (data) => {
  const postsWithId = data.posts.map((post) => ({
    id: _.uniqueId(),
    ...post,
  }));
  return { ...data, posts: postsWithId };
};

const loadRSS = (link) => axios.get(allOrigin(link))
  .then((response) => parseRSS(link, response.data.contents))
  .then((parcedData) => addPostId(parcedData));
export default loadRSS;
