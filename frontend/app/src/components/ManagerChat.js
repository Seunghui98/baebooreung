import {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../redux/user';
import {Client} from '@stomp/stompjs';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {chat, user} from '../api/api';
import CheckBox from '@react-native-community/checkbox';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

export default function ManagerChat({navigation}) {
  const [page, setPage] = useState('user');
  const [chatRoomList, setChatRoomList] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [createChatVisible, setCreateChatVisible] = useState(false);
  const [createChatCheckBox, setCreateChatCheckBox] = useState([]);
  const [roomNamePlaceholder, setRoomNamePlaceholder] = useState('black');
  const sender = useSelector(state => state.user.name); //메세지를 전송하는 주체
  const dispatch = useDispatch();
  const client = useRef({});
  // const [chatRoomListTemp, setChatRoomListTemp] = useState([
  //   {
  //     id: 1,
  //     name: '김싸피',
  //     last_message: '점심1 배달 완료했습니다.',
  //     last_time: '오후 1시 12분',
  //     last_count: 2,
  //   },
  //   {
  //     id: 2,
  //     name: '박싸피',
  //     last_message: '점심2 배달 완료했습니다.',
  //     last_time: '오후 1시 30분',
  //     last_count: 1,
  //   },
  //   {
  //     id: 3,
  //     name: '이싸피',
  //     last_message: '저녁1 배달 완료했습니다.',
  //     last_time: '어제',
  //     last_count: 1,
  //   },
  // ]);
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
      name: '구싸피',
      phone: '010-3333-3333',
      region: 3,
    },
  ]);

  useEffect(() => {
    userList.map((el, idx) => {
      setCreateChatCheckBox(createChatCheckBox => {
        const newArr = [...createChatCheckBox];
        newArr.push(false);
        return newArr;
      });
    });
  }, []);

  async function connect() {
    client.current = new Client();
    client.current.configure({
      brokerURL: 'wss://k7c207.p.ssafy.io:8080/api/ws-stomp/websocket',
      onConnect: () => {
        console.log('성공');
      },
      onChangeState: () => {
        console.log('change');
      },
      onDisconnect: () => {
        console.log('실패');
      },
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
      logRawCommunication: true,
      connectHeaders: {},
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
  }

  function findAllRooms() {
    axios({
      method: 'get',
      url: chat.findAllRooms(),
    })
      .then(res => {
        console.log(res.data);
        setChatRoomList(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async function createRoom(roomId, sender) {
    setRoomId(roomId);
    subscribe(roomId);
    await enter(roomId);
  }

  function enterRoom(roomId) {
    setRoomId(roomId);
  }

  // function quitRoom(roomId) {
  //   quit(roomId);
  // }

  // function findRoom() {
  //   axios({
  //     method: 'get',
  //     url: chat.findRoom(),
  //     params: {
  //       roomId: roomId,
  //     },
  //   })
  //     .then(res => {
  //       setRoom(res.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  function sendMessage() {
    client.current.publish({
      destination: '/api/pub/chat/message',
      headers: {id: sender},
      body: JSON.stringify({
        type: 'TALK',
        roomId: roomId,
        sender: sender,
        message: message,
        userCount: userCount,
      }),
    });
    setMessage('');
  }

  function recvMessage(recv) {
    setMessages(messages => {
      const newMessages = [...messages];
      newMessages.push({
        type: recv.type,
        sender: recv.sender,
        message: recv.message,
      });
      return newMessages;
    });
  }

  const subscribe = roomId => {
    client.current.subscribe(
      '/api/sub/chat/room/' + roomId,
      body => {
        const recv = JSON.parse(body.body);
        recvMessage(recv);
      },
      {id: sender},
    );
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const handleChange = event => {
    //채팅 입력시 state에 값 설정
    setMessage(event);
  };

  const RoomNameChange = event => {
    setRoomName(event);
  };
  async function enter(roomId) {
    await client.current.publish({
      destination: '/api/pub/chat/message',
      headers: {},
      body: JSON.stringify({
        type: 'ENTER',
        roomId: roomId,
        sender: sender,
      }),
    });
  }

  // async function quit(roomId) {
  //   await client.current.publish({
  //     destination: '/api/pub/chat/message',
  //     headers: {},
  //     body: JSON.stringify({
  //       type: 'QUIT',
  //       roomId: roomId,
  //       sender: sender,
  //     }),
  //   });
  // }

  useEffect(() => {
    findAllRooms();
    // console.log(sender);
    // dispatch(setUser({name: '김싸피'}));
    // console.log(sender);
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

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
                findAllRooms();
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
                    <Icon name="person" size={30}></Icon>
                    <Text style={styles.userListTextStyle}>
                      {item.name} {item.grade}
                    </Text>
                  </View>
                  <View style={styles.userListDetailIcon}>
                    <TouchableOpacity>
                      <Icon name="phone-forwarded" size={30}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        chatRoomList.forEach(value => {
                          subscribe(roomId);
                          setPage('chat');
                        });
                      }}>
                      <Icon
                        name="textsms"
                        size={30}
                        style={styles.userMessageIcon}></Icon>
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
            <TouchableOpacity
              onPress={findAllRooms}
              style={styles.leftBtn}
              activeOpacity={1}>
              <Icon name="messenger" size={40}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.rightBar}>
            <Pressable
              onPress={() => {
                setCreateChatVisible(!createChatVisible);
              }}>
              <View style={{alignItems: 'flex-end'}}>
                <Icon name="maps-ugc" size={40}></Icon>
              </View>
            </Pressable>
            <FlatList
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
                      <Icon name="person" size={30}></Icon>
                    </View>
                    <View style={styles.chatRoomDetail}>
                      <View style={styles.chatRoomDetailTop}>
                        <View style={{paddingLeft: 10}}>
                          <Text style={styles.chatRoomName}>
                            {item.roomName}
                          </Text>
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
                findAllRooms();
                setPage('chatRoomList');
              }}>
              <Icon name="messenger" size={40}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.rightBar}>
            <FlatList
              style={styles.chatHistroy}
              data={messages}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={({item}) => (
                <View>
                  {/*  */}
                  <View
                    style={
                      item.sender === sender
                        ? styles.myChatComponent
                        : styles.otherChatComponent
                    }>
                    {/*  */}
                    {item.type === 'TALK' && item.sender !== sender && (
                      <View style={styles.otherChatProfile}>
                        <Icon name="person" size={50}></Icon>
                      </View>
                    )}

                    <View
                      style={
                        (item.type === 'ENTER' ||
                          item.type === 'QUIT' ||
                          item.sender !== sender) && {flex: 1}
                      }>
                      {/*  */}
                      {item.type === 'TALK' && item.sender !== sender && (
                        <View style={styles.otherChatName}>
                          <Text style={{fontWeight: 'bold'}}>
                            {item.sender}
                          </Text>
                        </View>
                      )}

                      {/*  */}
                      <View
                        style={
                          item.type === 'ENTER'
                            ? styles.noticeChat
                            : item.sender === sender
                            ? styles.myChat
                            : styles.otherChat
                        }>
                        {item.type === 'ENTER' && (
                          <Text style={styles.noticeChatText}>
                            {item.sender}님이 입장하셨습니다.
                          </Text>
                        )}

                        {/* */}
                        {item.type === 'TALK' && (
                          <Text
                            style={
                              item.sender === sender
                                ? styles.myChatText
                                : styles.otherChatText
                            }>
                            {item.message}
                          </Text>
                        )}
                        {item.type === 'QUIT' && (
                          <Text style={styles.noticeChatText}>
                            {item.sender}님이 퇴장하셨습니다.
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              )}></FlatList>
            <View style={styles.bottomContainer}>
              <TextInput
                style={styles.messageInput}
                multiline={true}
                placeholder={'메세지를 입력하세요'}
                onChangeText={text => {
                  handleChange(text);
                }}
                value={message}></TextInput>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={sendMessage}
                disabled={message === ''}>
                <Text style={styles.buttonTextStyle}>전송</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* 채팅방 생성 모달창 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={createChatVisible}
        onRequestClose={() => {
          setCreateChatVisible(!createChatVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.createRoomNameLayout}>
              <Text>방 제목</Text>
              <TextInput
                style={styles.roomNameInput}
                placeholder={'방 제목을 입력하세요'}
                placeholderTextColor={roomNamePlaceholder}
                onChangeText={text => {
                  RoomNameChange(text);
                }}
                value={roomName}
                maxLength={45}></TextInput>
            </View>
            <FlatList
              contentContainerStyle={{}}
              data={userList}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => (
                <View style={styles.createChatListStyle}>
                  <View style={styles.userListDetailText}>
                    <Icon name="person" size={30}></Icon>
                    <Text style={styles.userListTextStyle}>
                      {item.name} {item.grade}
                    </Text>
                  </View>
                  <View style={styles.userListDetailIcon}>
                    <CheckBox
                      value={createChatCheckBox[index]}
                      onValueChange={newValue => {
                        setCreateChatCheckBox(el => {
                          const newArr = [...el];
                          newArr[index] = !newArr[index];
                          return newArr;
                        });
                      }}
                    />
                  </View>
                </View>
              )}
            />

            <View style={styles.buttonLayout}>
              <Pressable
                style={styles.submitButton}
                onPress={async () => {
                  if (roomName === '') {
                    setRoomNamePlaceholder('red');
                  } else {
                    await axios({
                      method: 'post',
                      url: chat.createRoom(),
                      params: {
                        name: roomName,
                      },
                    })
                      .then(res => {
                        createRoom(res.data.roomId, sender);
                        createChatCheckBox.map((item, idx) => {
                          if (item === true) {
                            userList[idx].name;
                          }
                        });
                      })
                      .catch(e => {
                        console.log(e);
                      });
                    createChatCheckBox.map((item, idx) => {
                      if (item === true) {
                        setCreateChatCheckBox(createChatCheckBox => {
                          const newArr = [...createChatCheckBox];
                          newArr[idx] = false;
                          return newArr;
                        });
                      }
                    });
                    setCreateChatVisible(!createChatVisible);
                    setRoomName('');
                    setRoomNamePlaceholder('black');
                  }
                }}>
                <Text style={styles.createChatButtonTextStyle}>초대</Text>
              </Pressable>
              <Pressable
                style={styles.cancelButton}
                onPress={() => {
                  createChatCheckBox.map((item, idx) => {
                    if (item === true) {
                      setCreateChatCheckBox(createChatCheckBox => {
                        const newArr = [...createChatCheckBox];
                        newArr[idx] = false;
                        return newArr;
                      });
                    }
                  });
                  setCreateChatVisible(!createChatVisible);
                  setRoomName('');
                  setRoomNamePlaceholder('black');
                }}>
                <Text style={styles.createChatButtonTextStyle}>취소</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* 채팅방 생성 모달창 끝 */}
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
    backgroundColor: 'white',
    marginRight: 2,
    borderBottomLeftRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 7,
    shadowOpacity: 0.4,
  },
  leftBtn: {
    paddingTop: 10,
  },
  rightBar: {
    flex: 6,
  },
  userListStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginVertical: 1,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 4,
    shadowOpacity: 0.4,
  },
  userListDetailText: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userListTextStyle: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userListDetailIcon: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  userMessageIcon: {
    paddingLeft: 10,
  },
  chatRoomListStyle: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginVertical: 1,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 4,
    shadowOpacity: 0.4,
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
    fontSize: 20,
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
  chatHistroy: {
    flex: 1,
  },
  myChatComponent: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  otherChatComponent: {
    flex: 1,
    flexDirection: 'row',
  },
  otherChatProfile: {
    maxWidth: SCREEN_WIDTH / 7,
  },
  otherChatName: {
    marginLeft: 2,
    paddingLeft: 2,
  },
  noticeChat: {
    flex: 1,
    margin: 1,
    alignItems: 'center',
  },
  myChat: {
    maxWidth: (SCREEN_WIDTH * 4) / 7,
    backgroundColor: '#58ACFA',
    borderRadius: 10,
    margin: 5,
    padding: 5,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 4,
    shadowOpacity: 0.4,
  },
  otherChat: {
    flex: 1,
    maxWidth: (SCREEN_WIDTH * 4) / 7,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 7,
    padding: 7,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 4,
    shadowOpacity: 0.4,
  },

  noticeChatText: {
    fontSize: 16,
    color: '#BDBDBD',
    fontWeight: 'bold',
  },
  myChatText: {
    fontSize: 16,
    color: 'white',
  },
  otherChatText: {
    fontSize: 16,
    color: 'black',
  },
  bottomContainer: {
    flexDirection: 'row',
  },
  messageInput: {
    flex: 1,
    maxHeight: SCREEN_HEIGHT / 7.3,
    fontSize: 15,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 10,
    shadowOpacity: 0.4,
  },
  buttonStyle: {
    backgroundColor: 'black',

    paddingHorizontal: 10,
    justifyContent: 'center',
  },

  buttonTextStyle: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
  },
  createChatListStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 1,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 4,
    shadowOpacity: 0.4,
  },
  buttonLayout: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  submitButton: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#58ACFA',
  },
  cancelButton: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: 'red',
  },
  createChatButtonTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  createRoomNameLayout: {
    margin: 10,
    alignItems: 'center',
  },
  roomNameInput: {
    fontSize: 15,
  },
});
