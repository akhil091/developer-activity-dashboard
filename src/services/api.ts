import axios from 'axios';

const API_URL = 'https://mocki.io/v1/ec30feb1-3f4f-486c-92b4-e8dd7803f98b';

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
