import {storage} from '../../utils/utils';

export class Login {
  static get className() {
    return 'login'
  }

  constructor($root, emitter) {
    this.$root = $root
    this.emitter = emitter
  }

  init() {
    const input = this.$root.querySelector('input')
    this.$root.addEventListener('submit', (e) => {
      e.preventDefault()
      storage('login', input.value)
      this.emitter.emit('login-changed', input.value)
    })
  }

  render() {
    return `<div class='title'>
            Новый способ общения с вашими друзьями и сообществами.
            </div>
            <div class="subTitle"> <p>
            Discord — простейший способ голосового, видео- и 
            текстового общения для любых компаний: 
            школьных кружков,
             полуночных игровых групп, международных сообществ 
             художников или просто друзей.</p>
            </div>
            <form>
                <input 
                    type="text" 
                    placeholder="Введите имя пользователя" autofocus>
                <button>
                    <span class="arrow"></span>
                </button>
            </form>
`
  }
  destroy() {
  }
}