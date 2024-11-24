import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://192.168.1.5:3100';

/**
 * Récupère ou génère une clé unique pour l'appareil
 */
const getDeviceKey = async () => {
    let deviceKey = await SecureStore.getItemAsync('deviceKey');
    if (!deviceKey) {
        deviceKey = uuidv4(); 
        await SecureStore.setItemAsync('deviceKey', deviceKey); // Stocke la clé
    }
    return deviceKey;
};


export const getVerseOfTheDay = async () => {
    try {
        // Obtenir la clé unique de l'appareil
        const deviceKey = await getDeviceKey();

        // Obtenir la date du jour
        const today = new Date().toISOString().split('T')[0];

        // Effectuer une requête GET à l'API backend
        const response = await axios.get(`${API_URL}/verset`, {
            params: {
                device_key: deviceKey, 
                date: today,          
            },
        });

        return response.data; 
    } catch (error) {
        console.error('Erreur lors de la récupération du verset du jour', error);
        throw error;
    }
};
