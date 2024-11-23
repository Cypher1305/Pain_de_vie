import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Share } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

// Types pour les routes
type RootStackParamList = {
    Home: undefined; // Pas de paramètres pour l'écran Home
    Favorites: undefined; // Pas de paramètres pour l'écran Favorites
};

// Typage des props du composant
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

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

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [verse, setVerse] = useState<{ text: string; chapter: number; verse: number } | null>(null);

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

    const shareVerse = async () => {
        if (verse) {
            await Share.share({
                message: `${verse.text} - Chapitre ${verse.chapter}, Verset ${verse.verse}`,
            });
        }
    };

    return (
        <View style={styles.container}>
            {verse ? (
                <>
                    <Text style={styles.verseText}>{verse.text}</Text>
                    <Text style={styles.verseReference}>{`Chapitre ${verse.chapter}, Verset ${verse.verse}`}</Text>
                    <Button title="Partager" onPress={shareVerse} />
                    <Button title="Mes Favoris" onPress={() => navigation.navigate('Favorites')} />
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    verseText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    verseReference: {
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 20,
    },
});

export default HomeScreen;
