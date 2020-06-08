export class Modal {
  static get className() {
    return 'modal'
  }
  constructor($root, emitter) {
    this.$root = $root
    this.emitter = emitter
  }
  init() {
    this.emitter.subscribe('create-modal', () => this.createModal())
    this.$root.addEventListener('click', (e) => this.onClick(e))
    this.$root.addEventListener('submit', (e) => this.submit(e))
  }
  render() {
    return ``
  }
  createModal() {
    this.$root.innerHTML = `
    <div data-type="overlay" class="overlay">
                <div class="window">
                    <div class="title">Ага, ещё один сервер, да?</div>
                     <form>
                         <input 
                            type="text" 
                            placeholder="Введите название сервера" autofocus>
                         <button>
                            <span class="arrow"></span>
                          </button>
                      </form>
                </div>
            </div>
   `
  }
  onClick(e) {
    const $target = e.target
    if ($target.dataset.type === 'overlay') {
      this.destroy()
    }
  }
  submit(e) {
    e.preventDefault()
    const $input = this.$root.querySelector('input')
    this.emitter.emit('add-room', $input.value)
    this.destroy()
  }
  destroy() {
    this.$root.innerHTML = ``
  }
}