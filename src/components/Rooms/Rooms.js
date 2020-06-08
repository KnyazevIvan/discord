import {nickToColor, storage} from '../../utils/utils';
import {addRoom, renderRooms} from './rooms.functions';

export class Rooms {
  static get className() {
    return 'rooms'
  }
  constructor($root, emitter, rooms) {
    this.$root = $root
    this.emitter = emitter
    this.rooms = rooms
    console.log(rooms)
  }
  init() {
    const $list = this.$root.querySelector('.lists')
    this.$root.addEventListener('click', (e) => this.onClick(e))
    this.emitter.subscribe('add-room', text => {
      addRoom($list, text, this.rooms)
    })
  }
  onClick(e) {
    const $target = e.target
    if ($target.dataset.type === 'logout') {
      storage('login', '')
      this.emitter.emit('logout')
    }
    if ($target.dataset.type === 'addBtn') {
      this.emitter.emit('create-modal')
    }
    if ($target.dataset.type === 'room') {
      this.$root.querySelectorAll('.room')
          .forEach(room=> room.classList.remove('select'))
      $target.classList.add('select')
      this.emitter.emit('room-selected', $target.dataset.id)
    }
  }
  render() {
    const nickName = storage('login')
    return `
        <div class="title">Список доступных серверов</div>
        <div class="lists">${renderRooms(this.rooms)}</div>
        <div class="menu">
        <div class="logo"> 
            <img 
                style="background: ${nickToColor(nickName)}" 
                src="../svg/logo.svg">
            <span class="nickName">${nickName}</span>
        </div>
        <div class="menuBtn"> 
          <img class="logout" data-type="logout" src="./svg/logout.svg">
          <img class="addBtn" data-type="addBtn" src="./svg/add.svg">
        </div>
        </div>

`
  }
  destroy() {
  }
}

