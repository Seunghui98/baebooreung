import {StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
export default function MyPage() {
  const user = useSelector(state => state.user);
  return (
    <View style={styles.container}>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
