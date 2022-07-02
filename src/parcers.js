export default (data) => {
  const parser = new DOMParser();
  const parcedData = parser.parseFromString(data, 'text/xml');

  console.log(parcedData);
};
