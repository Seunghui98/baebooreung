import {useEffect, useState} from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  Pressable,
  PermissionsAndroid,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Mic from '../assets/images/mic.png';
import MicOFF from '../assets/images/micoff.png';
import SoundRecorder from 'react-native-sound-recorder';
import RNFS from 'react-native-fs';
import axios from 'axios';
import {voice} from '../api/api';
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

export default function AudioRecord() {
  const [mic, setMic] = useState(false);
  const [folderName, setFolderName] = useState('');
  const formData = new FormData();

  const requestRecordingAudioPermission = async () => {
    try {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the record_audio');
      } else {
        console.log('record_audio permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startRecord = async () => {
    try {
      await SoundRecorder.start(
        SoundRecorder.PATH_DOCUMENT + '/voice.mp4',
      ).then(function () {
        setFolderName(SoundRecorder.PATH_DOCUMENT + '/voice.mp4');
        console.log(
          'started recording : ' + SoundRecorder.PATH_DOCUMENT + '/voice.mp4',
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  const stopRecord = async () => {
    await SoundRecorder.stop().then(function (res) {
      console.log('stopped recording, audio file saved at: ' + res.path);
    });
    await RNFS.readDir(RNFS.DocumentDirectoryPath).then(result => {
      const file = result.find(item => item.name === 'voice.mp4');
      // console.log('GOT RESULT', result);
      console.log(file);
      formData.append('file', file);
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    });

    axios({
      url: voice.file(),
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      transformRequest: (data, headers) => {
        return data;
      },
    })
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // Usage with Options:

  //  SoundRecorder.start(
  //         SoundRecorder.PATH_CACHE + '/' + fileName + '.mp3',
  //         {
  //           quality: SoundRecorder.QUALITY_MAX,
  //           format : SoundRecorder.FORMAT_AAC_ADTS,
  //         }
  //       ).then(function () {
  //         console.log('started recording');
  //       });

  useEffect(() => {
    requestRecordingAudioPermission();
  }, []);

  return (
    <View style={styles.container}>
      {!mic && (
        <Pressable
          onPress={() => {
            startRecord();
            setMic(!mic);
          }}>
          <Image source={Mic} style={styles.image} />
        </Pressable>
      )}
      {mic && (
        <Pressable
          onPress={() => {
            stopRecord();
            setMic(!mic);
          }}>
          <Image source={MicOFF} style={styles.image} />
        </Pressable>
      )}
      <Text>{folderName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'stretch',
    width: 200,
    height: 200,
  },
});
