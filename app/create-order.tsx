import { Header } from "@/components/Header"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const CreateOrder = () => {
    return (
        <SafeAreaView>
            <Header />
            <View style={styles.container}>
                <Text>CreateOrder</Text>
            </View>
        </SafeAreaView>
    )
}

export default CreateOrder

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})