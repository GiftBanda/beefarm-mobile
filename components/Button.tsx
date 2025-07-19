import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
  isLoading?: boolean;
  icon?: any
};

export default function Button({ label, theme, onPress, isLoading = false, icon }: Props) {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderRadius: 24},
        ]}>
        <Pressable style={[styles.button, { backgroundColor: '#fff' }]} onPress={onPress} disabled={isLoading}>
          <Text>
          {
            icon ? <Text>{icon}</Text> : ''
          }
          
          {isLoading ? <Text><ActivityIndicator /></Text> : <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>}
          </Text>
        </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 240,
    paddingHorizontal: 14,
        paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 2,
    borderColor: '#14532D',

  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
