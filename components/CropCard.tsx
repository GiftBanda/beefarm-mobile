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

export const CropCard = ({ crop}: CropProps) => {
    return (
        <View style={styles.cropCard}>
            <View style={styles.cropCardContent}>
                <Image source={crop.url} style={{ width: 80, height: 80, borderRadius: 8 }} />
                <View style={{ marginLeft: 10, flexDirection: 'column', }}>
                    <Text style={styles.headerText}>{crop.title}</Text>
                    <Text style={styles.subText}>{crop.weight}</Text>
                    <Text style={styles.headerSubText}>{crop.market}</Text>
                </View>
            </View>

            <Text style={styles.price}>K {crop.price}.00</Text>
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
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    headerText: {
        //color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        //marginBottom: 16,
    },
    headerSubText: {
        //color: '#fff',
        fontSize: 14,
        //fontWeight: 'bold',
        marginBottom: 16,
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
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#d5d5d5ff',
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
        fontSize: 16,
        fontWeight: 'bold',
    }
})