import {StyleSheet, Text, View} from 'react-native';
import AudioRecord from '../../components/AudioRecord';
function STTScreen() {
  return (
    <View style={styles.container}>
      <AudioRecord></AudioRecord>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default STTScreen;
