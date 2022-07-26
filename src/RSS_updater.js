/* eslint-disable no-param-reassign */
import _ from 'lodash';
import loadRSS from './RSS_loader.js';

const updateRSS = (state, links) => {
  const promises = links.map(loadRSS);
  Promise.all(promises)
    .then((results) => {
      const loadedPosts = results.flatMap(({ posts }) => posts);
      const allPosts = _.union(loadedPosts, state.posts);
      const newPosts = _.differenceBy(allPosts, state.posts, 'link');

      if (newPosts.length > 0) {
        state.posts = [...newPosts, ...state.posts];
      }
    })
    .finally(() => {
      setTimeout(() => updateRSS(state, links), 5000);
    });
};

export default (link, state) => {
  const links = [];
  links.push(link);

  setTimeout(() => updateRSS(state, links), 5000);
};
