import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '38535575-2b05e44024ae670a115fb0cfb';

export const fetchSerch = async (name, page, perPage) => {
  const resp = await axios.get(
    `/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  return resp.data;
};
