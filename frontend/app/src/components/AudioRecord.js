import { useEffect, useState } from "react";
import { View,Button,Text,TouchableOpacity } from "react-native";
import { PermissionsAndroid } from "react-native";
import SoundRecorder from 'react-native-sound-recorder';

export default function AudioRecord(){
    const [file, setFile] = useState('');
    const requestRecordingAudioPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the record_audio");
          } else {
            console.log("record_audio permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
    };
    
    const startRecord = async ()=>{
        try{
            await SoundRecorder.start(SoundRecorder.PATH_DOCUMENT + '/test.mp4',)
            .then(function() {
                setFile(SoundRecorder.PATH_DOCUMENT+'/test.mp4');
                console.log('started recording : ' + SoundRecorder.PATH_DOCUMENT+'/test.mp4');
            });
        }catch(e){
            console.log(e);
        }
    }
    
    const stopRecord = async () =>{
        try{
            await SoundRecorder.stop()
            .then(function(result) {
                console.log('stopped recording, audio file saved at: ' + result.path);
            });
        }catch(e){
            console.log(e);
        }
    }
    
    
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
    
    useEffect(()=>{
        requestRecordingAudioPermission();
    },[])
    return(
        <View>
            <TouchableOpacity onPress={startRecord}><Text>시작</Text></TouchableOpacity>
            <Text>{file}</Text>
         <TouchableOpacity onPress={stopRecord}><Text>종료</Text></TouchableOpacity>
        </View>
    )
}
