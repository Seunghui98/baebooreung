import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import Swiper from 'react-native-swiper';
import DetailJob from '../../components/DetailJob';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  DetailWorkContainer: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  headerText: {
    fontSize: 20,
  },
  body: {
    padding: 10,
    flex: 8,
  },
});

const coord = {latitude: 35.204314, longitude: 126.807268};
export const Test = () => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={true}
      showsPagination={true}
      loop={false}>
      <SafeAreaView style={styles.DetailWorkContainer}>
        <View style={styles.body}>
          <DetailJob />
        </View>
      </SafeAreaView>
    </Swiper>
  );
};

export default Test;
