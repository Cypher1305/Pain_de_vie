import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configuration de base des notifications (affichage lors de la réception)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
    }),
});

/**
 * Demande de permissions pour envoyer des notifications.
 * @returns {Promise<boolean>} - True si les permissions sont accordées.
 */
export const requestNotificationPermissions = async () => {
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        return finalStatus === 'granted';
    } else {
        return false;
    }
};

/**
 * Planifie des notifications à des heures spécifiques.
 * @param {Array} scheduleTimes - Les heures au format [8, 12, 16, 20, 24].
 * @param {string} verseReference - La référence du verset du jour.
 */
export const scheduleDailyNotifications = async (scheduleTimes, verseReference) => {
    const now = new Date();

    scheduleTimes.forEach(async (hour) => {
        const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0);

        // Si l'heure est déjà passée aujourd'hui, planifiez pour le lendemain
        if (notificationTime <= now) {
            notificationTime.setDate(notificationTime.getDate() + 1);
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Un Message pour toi!', // Titre de la notification
                body: ` ${verseReference}`, // Message
            },
            trigger: {
                hour: notificationTime.getHours(),
                minute: notificationTime.getMinutes(),
                repeats: true, // Répétition quotidienne
            },
        });
    });
};
