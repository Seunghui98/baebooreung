const HOST = "https://k7c207.p.ssafy.io:8080/api/"

const CHAT = "chat/"

const chat = {
    findAllRooms : () => HOST + CHAT + "/rooms/",
    createRoom : () => HOST + CHAT + "room/",
    findRoom : () => HOST + CHAT +"room/"
}

export { chat };