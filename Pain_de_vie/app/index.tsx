import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Share, TouchableOpacity } from 'react-native';
import { getVerseOfTheDay } from '@/scripts/versets';
import { requestNotificationPermissions, scheduleDailyNotifications } from '@/scripts/NotificationService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Notifications from 'expo-notifications';


// Types pour les routes
type RootStackParamList = {
    Home: undefined; // Pas de paramètres pour l'écran Home
    Favorites: undefined; // Pas de paramètres pour l'écran Favorites
};

// Typage des props du composant
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;



const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const [verse, setVerse] = useState<{ text: string; book_name: string; chapter: number; verse: number } | null>(null);

    useEffect(() => {
        const fetchVerse = async () => {
            try {
                const verseData = await getVerseOfTheDay();
                setVerse(verseData);
            } catch (error) {
                console.error('Erreur lors de la récupération du verset du jour :', error);
            }
        };

        fetchVerse();
    }, []);

    useEffect(() => {
        const setupNotifications = async () => {
            try {
                const hasPermissions = await requestNotificationPermissions();
                if (hasPermissions && verse) {
                    const verseReference = `${verse.book_name} ${verse.chapter}:${verse.verse}`;
                    const scheduleTimes = [12]; // Heures souhaitées
                    await scheduleDailyNotifications(scheduleTimes, verseReference);
                }
            } catch (error) {
                console.error('Erreur lors de la configuration des notifications :', error);
            }
        };

        if (verse) setupNotifications();
    }, [verse]);


    const shareVerse = async () => {
        if (verse) {
            await Share.share({
                message: `*${verse.text}*    - _${verse.book_name}, Chapitre ${verse.chapter}, Verset ${verse.verse}_`,
            });
        }

    };


    /* // Obtenir la date actuelle
    const today = new Date();

    // Formater la date
    const formatter = new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',  // Jour de la semaine
        year: 'numeric',  // Année
        month: 'long',    // Mois (texte complet)
        day: 'numeric',   // Jour du mois
    });
 
    const formattedDate = formatter.format(today);   */


    return (
        <View style={styles.container}>
            {verse ? (
                <>
                    {/* Carte du verset */}
                    {/*<Text>{`${formattedDate}`}</Text>*/}
                    <View style={styles.card}>
                        <Text style={styles.verseText}>"{verse.text}"</Text>
                        <Text style={styles.verseReference}>{`${verse.book_name} Chapitre ${verse.chapter}, Verset ${verse.verse}`}</Text>
                    </View>

                    {/* Boutons d'action */}
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity style={styles.shareButton} onPress={shareVerse}>
                            <Icon name="share-alt" size={16} color="#fff" />
                            <Text style={styles.buttonText}>  Partager</Text>
                        </TouchableOpacity>


                    </View>
                </>
            ) : (
                <Text>Chargement...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        elevation: 4, // Ombre sur Android
        shadowColor: '#000', // Ombre sur iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 30,
        alignItems: 'center',
        width: 'auto',
    },
    verseText: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#343a40',
        marginBottom: 10,
    },
    verseReference: {
        fontSize: 13,
        fontStyle: 'italic',
        color: '#6c757d',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    shareButton: {
        backgroundColor: '#000814',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginRight: 10,
    },
    favoriteButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingText: {
        fontSize: 18,
        color: '#6c757d',
    },
});
export default HomeScreen;
