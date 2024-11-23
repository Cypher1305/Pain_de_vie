import axios from 'axios';

const API_URL = 'http://localhost:3100';

export const getVerseOfTheDay = async () => {
    try {
        const response = await axios.get(`${API_URL}/verset`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du verset du jour', error);
        throw error;
    }
};
