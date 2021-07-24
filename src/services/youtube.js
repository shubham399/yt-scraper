var axios = require('axios');

module.exports.search = (apiKey, query, publishedAfter) => {
  let date = new Date(publishedAfter).toISOString();
  var config = {
    method: 'get',
    url: `https://www.googleapis.com/youtube/v3/search?type=video&order=date&part=snippet&publishedAfter=${date}&key=${apiKey}&q=${query}`,
    headers: {}
  };
  return axios(config);
}