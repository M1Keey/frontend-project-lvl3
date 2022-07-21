/* eslint-disable no-param-reassign */
import _ from 'lodash';
import loadRSS from './RSS_loader.js';

const links = [];

const updateRSS = (state) => {
  const promises = links.map(loadRSS);
  Promise.all(promises)
    .then((results) => {
      const loadedPosts = results.flatMap(({ posts }) => posts);
      const allPosts = _.union(loadedPosts, state.posts);
      const newPosts = _.differenceBy(allPosts, state.posts, 'url');

      if (newPosts.length > 0) {
        state.posts = [...newPosts, ...state.posts];
      }
    })
    .finally(() => {
      setTimeout(() => updateRSS(state), 5000);
    });
};

export default (link, state) => {
  links.push(link);

  setTimeout(() => updateRSS(state), 5000);
};
