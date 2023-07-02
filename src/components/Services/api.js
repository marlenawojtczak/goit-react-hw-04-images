import axios from 'axios';

const API_KEY = '35795176-8901e7fc6175cd339787320de';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchImages = async (searchQuery, page) => {
  const response = await axios.get('', {
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });
  return response.data.hits;
};
