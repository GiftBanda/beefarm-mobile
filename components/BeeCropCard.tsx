import { Link } from 'expo-router';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

interface CropCardProps {
    // Define any props if needed
    title: string;
    weight: string;
    market: string;
    price: string;
    url: ImageSourcePropType | undefined;
}

interface CropProps {
    crop: CropCardProps;
}

export const BeeCropCard = ({ crop }: CropProps) => {
    return (
        <View style={styles.container}>
            <Image source={crop.url} style={{ width: '100%', height: 200, borderRadius: 8, objectFit: 'contain' }} />
            <View style={styles.cropCard}>
                <View style={styles.cropCardContent}>
                    
                    <View style={{ marginLeft: 10, flexDirection: 'column', }}>
                        <Text style={styles.headerText}>{crop.title}</Text>
                        <Text style={styles.subText}>{crop.weight}</Text>
                        <Text style={styles.subText}>Grade A</Text>
                        <Text style={styles.headerSubText}>{'2 tonnes of ' + crop.title + ' sold'}</Text>
                        
                        <Text style={styles.price}>K {crop.price}.00</Text>
                    </View>

                </View>

                
            </View>
            <Link href="/create-order" style={styles.button}>
                <Text style={styles.buttonText}>Order</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        //height: 40,
        padding: 16,
        margin: 16,
        borderRadius: 12,
         borderWidth: 1,
        borderColor: '#d5d5d5ff',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    headerText: {
        //color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        //marginBottom: 16,
    },
    headerSubText: {
        //color: '#fff',
        fontSize: 14,
        //fontWeight: 'bold',
        marginBottom: 8,
        color: 'grey',
        lineHeight: 20,
    },
    subText: {
        //color: '#fff',
        fontSize: 14,
        //fontWeight: 'bold',
        // marginBottom: 16,
        color: 'grey',
        lineHeight: 20,
    },
    cropContainer: {
        //borderWidth: 1,
        borderColor: '#bcbcbcff',
        borderRadius: 12,
        //padding: 16,
    },
    cropCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //marginBottom: 10,
        //borderWidth: 1,
        //borderColor: '#d5d5d5ff',
        padding: 10,
        borderRadius: 12,
    },
    cropCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cropCardText: {
        // marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        //color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#04742dff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})