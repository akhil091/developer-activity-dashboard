import axios from 'axios';

const API_URL = 'https://mocki.io/v1/612f96f7-0d72-45ef-bf20-a066fdf9b5a8';

export const fetchData = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log(response, "response of api");
        return response.data.data.AuthorWorklog;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
