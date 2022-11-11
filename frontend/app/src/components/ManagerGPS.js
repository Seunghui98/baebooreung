import {StyleSheet, View, Text} from 'react-native';

export default function ManagerGPS() {
  const user = useSelector(state => state.user); //react-redux를 이용하여 user 정보 받을 예정
  return (
    <View>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
