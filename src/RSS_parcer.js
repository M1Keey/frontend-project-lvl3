import _ from 'lodash';

export default (feedLink, data) => {
  try {
    const parser = new DOMParser();
    const parcedData = parser.parseFromString(data, 'text/xml');

    const result = {
      feed: null,
      posts: [],
    };

    const feedTitle = parcedData.querySelector('title').textContent;
    const feedDescription = parcedData.querySelector('description').textContent;
    const feedId = _.uniqueId();

    const posts = parcedData.querySelectorAll('item');
    posts.forEach((post) => {
      const postTitle = post.querySelector('title').textContent;
      const postDescription = post.querySelector('description').textContent;
      const postLink = post.querySelector('link').textContent;
      const postId = _.uniqueId();

      const postData = {
        id: postId,
        feedId,
        title: postTitle,
        description: postDescription,
        url: postLink,
      };
      result.posts.push(postData);
    });

    result.feed = {
      id: feedId,
      title: feedTitle,
      description: feedDescription,
      url: feedLink,
    };
    return result;
  } catch {
    throw new Error('errorParsing');
  }
};
