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
import axios from 'axios';
import {voice} from '../api/api';
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
// // MediaRecorder 변수 생성
// let mediaRecorder = null;

// // 녹음 데이터(Blob) 조각 저장 배열
// const audioArray = [];
// let granted = null;

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

  // 마이크 mediaStream 생성: Promise를 반환하므로 async/await 사용
  // const mediaStream = await navigator.mediaDevices.getUserMedia({
  //   audio: true,
  // });

  // // MediaRecorder 생성: 마이크 MediaStream을 인자로 입력
  // try {
  //   //   console.log(MediaRecorder);
  //   mediaRecorder = new MediaRecorder();
  //   console.log(mediaRecorder);
  //   // 이벤트핸들러: 녹음 데이터 취득 처리
  //   mediaRecorder.ondataavailable = event => {
  //     audioArray.push(event.data); // 오디오 데이터가 취득될 때마다 배열에 담아둔다.
  //   };

  //   // 이벤트핸들러: 녹음 종료 처리 & 재생하기
  //   mediaRecorder.onstop = event => {
  //     // 녹음이 종료되면, 배열에 담긴 오디오 데이터(Blob)들을 합친다: 코덱도 설정해준다.
  //     const blob = new Blob(audioArray, {type: 'audio/ogg codecs=opus'});
  //     audioArray.splice(0); // 기존 오디오 데이터들은 모두 비워 초기화한다.

  //     // Blob 데이터에 접근할 수 있는 객체URL을 생성한다.
  //     const blobURL = window.URL.createObjectURL(blob);

  //     // audio엘리먼트로 재생한다.
  //   };

  //   // 녹음 시작
  //   mediaRecorder.start();
  //   isRecording = true;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const stopRecord = async () => {
    // mediaRecorder.stop();
    // isRecording = false;
    // try {
    //   const sound = new File(
    //     [SoundRecorder.PATH_DOCUMENT + '/voice.mp3'],
    //     'soundBlob',
    //     {lastModified: new Date().getTime(), type: 'audio'},
    //   );
    //   console.log(sound);
    SoundRecorder.stop().then(function (result) {
      console.log(result);
      console.log('stopped recording, audio file saved at: ' + result.path);
    });
  };
  //     formData.append('file', sound);
  //     console.log(formData);
  //     axios({
  //       url: voice.file(),
  //       method: 'post',
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
  //         'Access-Control-Allow-Headers':
  //           'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
  //       },
  //       // data : formData,
  //       data: {
  //         file: sound,
  //       },

  //       transformRequest: (data, headers) => {
  //         return data;
  //       },
  //     })
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       });
  // });
  // }) catch (e) {
  //     console.log(e);
  //   }
  // };

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
