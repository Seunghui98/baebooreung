const HOST = "https://k7c207.p.ssafy.io/api/v1/"
const CHAT = "chat/"

const chat = {
    findAllRooms : () => HOST + CHAT + "rooms/",
    createRoom : () => HOST + CHAT + "room/"
}

export { chat };