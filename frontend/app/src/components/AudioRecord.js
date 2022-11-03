import { useEffect, useState } from "react";
import { View,Button,Text,TouchableOpacity } from "react-native";
import { PermissionsAndroid } from "react-native";
import SoundRecorder from 'react-native-sound-recorder';
import axios from 'axios';

export default function AudioRecord(){
    const [folderName, setFolderName] = useState('');
    const formData = new FormData();


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
                setFolderName(SoundRecorder.PATH_DOCUMENT+'/test.mp4');
                console.log('started recording : ' + SoundRecorder.PATH_DOCUMENT+'/test.mp4');
            });
        }catch(e){
            console.log(e);
        }
    }
    
    const stopRecord = async () =>{
        try{
            formData.append("file",SoundRecorder.PATH_DOCUMENT+'/test.mp4')
            console.log(formData);
            await SoundRecorder.stop()
            .then(function(result) {
                console.log(result);
                console.log('stopped recording, audio file saved at: ' + result.path);
                axios({
                    url: url,
                    method: 'post',
                    headers: {
                        "Content-Type": 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
                        'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
                    },
                    data : formData,
                    transformRequest: (data, headers) => {
                        return data;
                     },
    
                }).then((res)=>{
                     console.log(res);   
                }).catch((e)=>{
                    console.log(e);
                })
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
            <Text>{folderName}</Text>
         <TouchableOpacity onPress={stopRecord}><Text>종료</Text></TouchableOpacity>
        </View>
    )
}
