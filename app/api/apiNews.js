import axios from "axios";

const BASE_URL = "https://api.currentsapi.services/v1";
const API_KEY = "nrcbrjGOxTscn42gLrH3pi38u3CvikA5W8dxCH-UgDwztfBg";

export const getNews = async ({
  page_number = 1,
  page_size = 10,
  keywords,
}) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search?language=en&keywords=Bitcoin`,
      {
        params: {
          apiKey: API_KEY,
          page_number,
          page_size,
          keywords,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
