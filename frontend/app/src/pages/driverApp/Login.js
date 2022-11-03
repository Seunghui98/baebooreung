import {React, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {login} from '../../api/auth';
import {isEmail, isPassword} from '../../utils/auth';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const loginAPI = login;
  const loginProps = {
    email: id,
    password: password,
  };
  const onChangeId = event => {
    const ID = event.nativeEvent.text;
    if (isEmail(ID)) {
      // 유효성 통과 시 true 반환
      setId(ID);
      setIdMessage('올바른 이메일 형식입니다.');
      setIsId(true);
    } else {
      setIdMessage('이메일 형식으로 입력해주세요.');
      setIsId(false);
    }
    // console.log(isId, '-', idMessage);
  };
  // 비밀번호 유효성 검사
  const onChangePw = event => {
    const PW = event.nativeEvent.text;
    if (isPassword(PW)) {
      // 유효성 통과 시 true 반환
      setPwMessage('올바른 비밀번호입니다.');
      setPassword(PW);
      setIsPw(true);
    } else {
      setPwMessage(
        '비밀번호는 영문자, 숫자, 특수기호를 포함하여  8 ~ 16자로 입력해주세요.',
      );
      setIsPw(false);
    }
    // console.log(isPw, '-', pwMessage);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerFont}>배부릉</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.infoTitle}>아이디</Text>
        <TextInput
          style={styles.inputArea}
          placeholder="아이디를 입력하세요."
          onChange={onChangeId}
        />
        <Text style={styles.infoText}>{idMessage}</Text>
        <Text style={styles.infoTitle}>비밀번호</Text>
        <TextInput
          style={styles.inputArea}
          placeholder="비밀번호를 입력하세요."
          onChange={onChangePw}
        />
        <Text style={styles.infoText}>{pwMessage}</Text>
        <View style={styles.signupArea}>
          <Text>회원이 아니신가요?</Text>
          <Pressable
          // onPress={() => {
          //   console.log('pressed');
          // }}
          >
            <Text style={{color: 'blue'}}>회원가입</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.btnArea}>
        <CustomButton onPress={loginAPI} data={loginProps}>
          <Text>로그인</Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 60,
  },
  headerFont: {
    fontSize: 20,
    fontWeight: '800',
  },
  inputContainer: {
    height: '30%',
    width: '80%',
    marginBottom: 5,
    // borderWidth: 1,
  },
  infoTitle: {
    fontWeight: '800',
    fontSize: 15,
  },
  inputArea: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 0.8,
    paddingHorizontal: 20,
  },
  signupArea: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 5,
    margin: 0,
  },
  btnArea: {
    flex: 1,
    marginTop: 25,
    width: '40%',
  },
  infoText: {},
});

export default Login;
