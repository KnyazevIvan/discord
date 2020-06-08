import '../src/font/HelveticaNeueCyr-Black.otf'
import './style/style.scss'
import './svg/arrow.svg'
import {Discord} from './components/discord/Discord';
import {Login} from './components/login/login';
import {parseToArray, storage, xhr} from './utils/utils';
import {Emitter} from './core/Emitter';
import {Rooms} from './components/Rooms/Rooms';
import {Modal} from './components/Modal/Modal';
import {Chat} from './components/Chat/Chat';

const emitter = new Emitter()
const loginPage = [Login]
const mainPage = [Rooms, Modal, Chat]
const $app = document.querySelector('.App')

emitter.subscribe('login-changed', state => {
  discord.destroy()
  discord = new Discord('.App', {components: mainPage, emitter})
  init()
})
emitter.subscribe('logout', () => {
  discord.destroy()
  discord = createDiscord(loginPage)
  discord.init()
})

const login = storage('login') || ''
let discord = createDiscord(login === '' ? loginPage : mainPage)
login === '' ? discord.init() : init()

function createDiscord(page) {
  return discord = new Discord(
      '.App',
      {
        components: page,
        emitter})
}

function init() {
  $app.innerHTML = `<div class="loader">Loading...</div>`
  xhr('GET', 'https://discord-9ba65.firebaseio.com/rooms.json')
      .then(res => {
        const rooms = JSON.parse(res)
        discord.init(parseToArray(rooms))
      })
}