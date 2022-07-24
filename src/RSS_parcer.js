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

    const posts = parcedData.querySelectorAll('item');
    posts.forEach((post) => {
      const postTitle = post.querySelector('title').textContent;
      const postDescription = post.querySelector('description').textContent;
      const postLink = post.querySelector('link').textContent;

      const postData = {
        title: postTitle,
        description: postDescription,
        link: postLink,
      };
      result.posts.push(postData);
    });

    result.feed = {
      title: feedTitle,
      description: feedDescription,
      link: feedLink,
    };
    return result;
  } catch {
    throw new Error('errorParsing');
  }
};
