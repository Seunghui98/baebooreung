import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
export default function ManagerGPS() {
  const userInfo = useSelector(state => state.user);
  const userList = useSelector(state => state.userList.userList);
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
