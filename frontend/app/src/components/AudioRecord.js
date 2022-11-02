import { useEffect } from "react";
import { View,Button,Text,TouchableOpacity } from "react-native";
import { PermissionsAndroid } from "react-native";
import SoundRecorder from 'react-native-sound-recorder';

export default function AudioRecord(){
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
            await SoundRecorder.start(SoundRecorder.PATH_CACHE + '/test.mp4',{
                source : SoundRecorder.SOURCE_MIC,
                format : SoundRecorder.FORMAT_MPEG_4,
                encoder : SoundRecorder.ENCODER_AAC,
                sampleRate : 44100,
              })
            .then(function() {
                console.log('started recording');
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
         <TouchableOpacity onPress={stopRecord}><Text>종료</Text></TouchableOpacity>
        </View>
    )
}
