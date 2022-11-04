const HOST = "https://k7c207.p.ssafy.io:8080/api/"
const VOICE = "http://k7c207.p.ssafy.io:5000/"

const CHAT = "chat/"

const chat = {
    findAllRooms : () => HOST + CHAT + "rooms/",
    createRoom : () => HOST + CHAT + "room/",
    findRoom : () => HOST + CHAT +"room/"
}

const voice ={
    file : () => VOICE + "file"
}
export { chat, voice };