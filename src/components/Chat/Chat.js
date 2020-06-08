import {storage, xhr} from '../../utils/utils';
import {createMessageTemplate, fetchMessage} from './chat.functions';

export class Chat {
  static get className() {
    return 'chat'
  }
  constructor($root, emitter, rooms) {
    this.$root = $root
    this.emitter = emitter
    this.rooms = rooms
  }
  init() {
    this.$root.addEventListener('keydown', (e) => this.onInput(e))
    this.emitter.subscribe('room-selected', id => {
      clearInterval(this.inerval)
      this.id = id
      this.currentRoom = this.rooms.filter(room => room.id === this.id)[0]
      this.createChat()
      this.$mesWindow = this.$root.querySelector('.mes-window')
      this.inerval = setInterval(
          fetchMessage,
          2000,
          id, this.$mesWindow, this.currentRoom)
    })
  }
  render() {
    return ``
  }
  onInput(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const value = e.target.textContent
      e.target.textContent = ''
      const name = this.currentRoom.value
      const body = this.currentRoom.body || []
      body.push({value, nick: storage('login'), date: Date.now().toString()})
      xhr('PATCH', `https://discord-9ba65.firebaseio.com/rooms/${this.id}.json`, {'name': name, 'body': body})
          .then(respone => {
            this.$mesWindow.innerHTML = createMessageTemplate(body)
          })
    }
  }
  createChat() {
    this.$root.innerHTML = `
      <div contenteditable="true" class="input"></div>
      <div 
        class="mes-window">${createMessageTemplate(this.currentRoom.body)}
      </div>
`
  }
  destroy() {
    clearInterval(this.inerval)
  }
}
