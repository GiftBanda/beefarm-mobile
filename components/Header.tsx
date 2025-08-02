import AntDesign from '@expo/vector-icons/AntDesign';
import { navigate } from 'expo-router/build/global-state/routing';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
    title?: string;
}

export const Header = ({ title }: HeaderProps) => {
    return (
        <View style={styles.header}>
                <Pressable onPress={() => navigate('..')} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={styles.text}><AntDesign name="arrowleft" size={24} color="black" /></Text>
                    <Text style={styles.text}>{title}</Text>
                </Pressable>
            </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    text: {
        fontWeight: 'bold',
        alignItems: 'center'
    }
});