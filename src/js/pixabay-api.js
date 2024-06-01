import axios from 'axios';

const API_KEY = "44094007-67477d06fc63ea0136e02e71a";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: "15"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}