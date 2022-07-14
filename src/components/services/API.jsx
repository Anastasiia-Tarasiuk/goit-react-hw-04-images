import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/';
const API_KEY = '27618691-16873fc26bb6498af6bbdd835';
const perPage = 12;

export const apiSearch = async (searchValue, page) => {
    const response = await axios(`api/`, {
        params: {
            key: API_KEY,
            q: searchValue,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page: page,
            per_page: perPage,
        }
    });
    return response.data;
}

