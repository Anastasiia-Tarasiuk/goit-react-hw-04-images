import axios from "axios";

export const initials = {
    PER_PAGE: 12,
    API_KEY: '27618691-16873fc26bb6498af6bbdd835',
}

axios.defaults.baseURL = 'https://pixabay.com/';
const perPage = initials.PER_PAGE;

export const apiSearch = async (searchValue, page) => {
    const response = await axios(`api/`, {
        params: {
            key: initials.API_KEY,
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

