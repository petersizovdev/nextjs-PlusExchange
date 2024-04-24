import axios from "axios";

const BASE_URL = 'https://api.currentsapi.services/v1'
const API_KEY = 'huKoNX3n-xB-T62xvcqLD7VxqYgs84YUqY-LeRjsZVkm6vhZ'

export const getNews = async ({page_number = 1, page_size = 10, category, keywords}) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params:{
        apiKey: API_KEY,
        page_number,
        page_size,
        category,
        keywords,
      }
    ,})
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/available/categories`, {
      params:{
        apiKey: API_KEY,
      }
    ,})
    return response.data;
  } catch (error) {
    console.log(error)
  }
};