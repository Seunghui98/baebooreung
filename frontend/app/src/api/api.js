// chatting 관련 기능 api
const VOICE = 'http://k7c207.p.ssafy.io:5000/';
const CHAT = 'https://k7c207.p.ssafy.io:8080/api/chat/';

const chat = {
  findAllRooms: () => CHAT + 'rooms/', //모든 방 출력
  createRoom: () => CHAT + 'room/', // 방 만들기
  findRoom: () => CHAT + 'room/', // 이름으로 방 찾기
  updateSubscribeInfo: () => CHAT + 'room/update/subscribe/', // 구독 정보 true로 변경
  updateEnterInfo: () => CHAT + 'room/update/enter/', // 입장 정보 true로 변경
  exitRoom: () => CHAT + 'room/delete/', // 방 나가기
  getInfo: () => CHAT + 'room/user/info/', //해당 유저의 구독, 입장 정보 확인
  invite: () => CHAT + 'room/user/add/', //다른 유저를 채팅방에 초대
};

//음성호출 관련 기능
const voice = {
  file: () => VOICE + 'file',
};

// user 관련 기능 api
const USER_BASE_URL = 'https://k7c207.p.ssafy.io:8000/';
const USER = 'user-service/';

const user = {
  login: () => USER_BASE_URL + USER + 'login', // 로그인
  join: () => USER_BASE_URL + USER + 'join', // 회원가입
  // profile: () => USER_BASE_URL + USER + 'profile', // 프로필 사진 수정
  authdriver: () => USER_BASE_URL + USER + 'authdriver/', // 관리자가 드라이버를 인증하는 api
  getUserInfo: () => USER_BASE_URL + USER + 'user/', // id값 params로 전달, 사용자 정보 출력
  getAllUser: () => USER_BASE_URL + USER + 'users', // 전체 사용자 정보 출력
};

export {chat, user, voice};
//
