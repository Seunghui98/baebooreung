import {useState, useEffect,useRef} from 'react';
import {Client} from '@stomp/stompjs';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {chat} from '../api/api';


export default function ManagerChat({navigation}) {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [chatRoomListTemp, setChatRoomListTemp] = useState([
    {
      id: 1,
      name: '김싸피',
      last_message: '점심1 배달 완료했습니다.',
      last_time: '오후 1시 12분',
      last_count: 2,
    },
    {
      id: 2,
      name: '박싸피',
      last_message: '점심2 배달 완료했습니다.',
      last_time: '오후 1시 30분',
      last_count: 1,
    },
    {
      id: 3,
      name: '이싸피',
      last_message: '저녁1 배달 완료했습니다.',
      last_time: '어제',
      last_count: 1,
    },
  ]);
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [page, setPage] = useState('user');
  const [userList, setUserList] = useState([
    {
      user_id: 'kimssafy',
      grade: '드라이버',
      name: '김싸피',
      phone: '010-1111-1111',
      region: 1,
    },
    {
      user_id: 'parkssafy',
      grade: '드라이버',
      name: '박싸피',
      phone: '010-2222-2222',
      region: 2,
    },
    {
      user_id: 'leessafy',
      grade: '관리자',
      name: '이싸피',
      phone: '010-3333-3333',
      region: 3,
    },
  ]);
  const [room, setRoom] = useState({});
  const [sender, setSender] = useState('sub-0');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const client = useRef({});

  
  function findAllRooms() {
    axios({
      method: 'get',
      url: chat.findAllRooms(),
    })
      .then(res => {
        setChatRoomList(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function createRoom() {
    if (roomName === '' || undefined) {
      Alert.alert('방 제목을 입력해 주십시오.');
      return;
    } else {
      axios({
        method: 'post',
        url: chat.createRoom(),
        params: {
          name: roomName,
        },
      })
        .then(res => {
          Alert.alert(res.data.name + '방 개설에 성공하셨습니다.');
          setRoomName('');
          findAllRooms();
        })
        .catch(e => {
          Alert.alert('채팅방 개설에 실패하였습니다.');
        });
    }
  }

  function enterRoom(roomId) {
    subscribe(roomId);
    setRoomId(roomId);
  }


  function findRoom() {
    axios({
      method: 'get',
      url: chat.findRoom(),
      params: {
        roomId: roomId,
      },
    })
      .then(res => {
        setRoom(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function sendMessage() {
    console.log(messages);
    setMessages(messages => {
      const newMessages = [...messages];
      newMessages.unshift({
        type: 'TALK',
        sender: sender,
        message: message,
      });
      return newMessages;
    });

    client.current.publish({
      destination: '/pub/chat/message',
      headers: {},
      body: JSON.stringify({
        type: 'TALK',
        roomId: roomId,
        sender: sender,
        message: message,
      }),
    });
    setMessage('');
  }

  function recvMessage(recv) {
    setMessages(messages => {
      const newMessages = [...messages];
      newMessages.unshift({
        type: recv.type,
        sender: recv.type === 'ENTER' ? '[알림]' : recv.sender,
        message: recv.message,
      });
      return newMessages;
    });
  }

  async function connect() {
    client.current = new Client();
    console.log(new Client);
    client.current.configure({
      brokerURL: 'wss://k7c207.p.ssafy.io:8080/ws-stomp/websocket',
      onConnect: () => {
        console.log('성공');
      },
      onChangeState: ()=> {
        console.log("change");
      },
      onDisconnect: () => {
        console.log('실패');
      },
      logRawCommunication: true,
      connectHeaders: {
        login: 'user',
        passcode: 'password',
      },
      onStompError: function (frame) {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    await client.current.activate();
    console.log(client.current)
  }

  const subscribe = (roomId) => {
    client.current.subscribe('/sub/chat/room/' + roomId, body => {
      console.log(body);
      const recv = JSON.parse(body.body);
      recvMessage(recv);
    }, {id:"sub-0"});
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const handleChange = event => {
    //채팅 입력시 state에 값 설정
    setMessage(event);
  };

  // function pub() {
  //   client.current.publish({
  //     destination :'pub/chat/message',
  //     headers: {},
  //     body: JSON.stringify({
  //       type: 'ENTER',
  //       roomId: roomId,
  //       sender: sender,
  //     }),
  //   })
  // }

  useEffect(() => {
    findAllRooms();
  }, []);

  useEffect(() => {
      connect();
    return () => disconnect();
  }, []);

  return (
    <View style={styles.container}>
      {page === 'user' && (
        <View style={styles.container}>
          <View style={styles.leftBar}>
            <TouchableOpacity style={styles.leftBtn} activeOpacity={1}>
              <Icon name="person" size={40}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.leftBtn}
              onPress={() => {
                setPage('chatRoomList');
              }}>
              <Icon name="messenger-outline" size={40}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.rightBar}>
            <FlatList
              style={styles.list}
              data={userList}
              keyExtractor={item => item.user_id}
              renderItem={({item}) => (
                <View style={styles.userListStyle}>
                  <View style={styles.userListDetailText}>
                    <Icon name="person" size={40}></Icon>
                    <Text style={styles.userListTextStyle}>
                      {item.name} {item.grade}
                    </Text>
                  </View>
                  <View style={styles.userListDetailIcon}>
                    <TouchableOpacity>
                      <Icon name="phone-forwarded" size={40}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        chatRoomList.forEach(value => {
                            subscribe();
                            setPage('chat');
                        });
                      }}>
                      <Icon name="textsms" size={40}></Icon>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}
      {page === 'chatRoomList' && (
        <View style={styles.container}>
          <View style={styles.leftBar}>
            <TouchableOpacity
              style={styles.leftBtn}
              onPress={() => {
                setPage('user');
              }}>
              <Icon name="person-outline" size={40}></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.leftBtn} activeOpacity={1}>
              <Icon name="messenger" size={40}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.rightBar}>
            <FlatList
              style={styles.list}
              data={chatRoomList}
              keyExtractor={item => item.roomId}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    enterRoom(item.roomId);
                    setPage('chat');
                  }}>
                  <View style={styles.chatRoomListStyle}>
                    <View style={styles.profilePicture}>
                      <Icon name="person" size={60}></Icon>
                    </View>
                    <View style={styles.chatRoomDetail}>
                      <View style={styles.chatRoomDetailTop}>
                        <View>
                          <Text style={styles.chatRoomName}>{item.name}</Text>
                        </View>
                        <View>
                          <Text style={styles.chatRoomLastTime}>
                            {item.last_time}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.chatRoomDetailBottom}>
                        <Text style={styles.chatRoomLastMessage}>
                          {' '}
                          {item.last_message}{' '}
                        </Text>
                        <Text style={styles.chatRoomLastCount}>
                          {' '}
                          {item.last_count}{' '}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
      {page === 'chat' && (
        <View style={styles.container}>
          <View style={styles.leftBar}>
            <TouchableOpacity
              style={styles.leftBtn}
              onPress={() => {
                setPage('user');
              }}>
              <Icon name="person-outline" size={40}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.leftBtn}
              onPress={() => {
                setPage('chatRoomList');
              }}>
              <Icon name="messenger" size={40}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.rightBar}>
        <FlatList
          style={styles.list}
          data={messages}
          keyExtractor={item => idx}
          renderItem={({item, idx}) =>{
           <Text>{item.message}</Text>
          }}
        />
        <View style={styles.bottomContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Add Message'}
            onChangeText={text => {
              handleChange(text);
            }}
            value={message}></TextInput>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={sendMessage}
            disabled={message === ''}>
            <Text style={styles.buttonTextStyle}>Send</Text>
          </TouchableOpacity>
        </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftBar: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderRightWidth: 1,
  },
  leftBtn: {
    paddingTop: 10,
  },
  rightBar: {
    flex: 6,
    flexDirection: 'column',
  },
  userListStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  userListDetailText: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  userListTextStyle: {
    paddingLeft: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  userListDetailIcon: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatRoomListStyle: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  chatRoomDetail: {
    flex: 1,
    flexDirection: 'column',
  },
  chatRoomDetailTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatRoomDetailBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatRoomName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  chatRoomLastTime: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  chatRoomLastMessage: {
    fontSize: 18,
  },
  chatRoomLastCount: {
    fontSize: 18,
    color: 'red',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  chatRoomList: {},
  chatRoom: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 5,
  },
  bottomContainer: {
    backgroundColor: 'green',
  },

  buttonStyle: {
    backgroundColor: '#000',
    marginTop: 15,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
  },

  buttonTextStyle: {
    color: 'white',
  },

  
});
