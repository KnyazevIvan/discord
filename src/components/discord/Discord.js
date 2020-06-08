export class Discord {
  constructor(selector, options) {
    this.$root = document.querySelector(selector)
    this.components = options.components
    this.emitter = options.emitter
    this.Components = []
    console.log(this.components)
  }
  init(rooms = []) {
    this.$root.innerHTML = ``
    this.Components = this.components.map(Component => {
      const $root = document.createElement('div')
      $root.classList.add(Component.className)
      const Comp = new Component($root, this.emitter, rooms)
      $root.innerHTML = Comp.render()
      this.$root.appendChild($root)
      Comp.init()
      return Comp
    })
    console.log(this.Components)
  }
  destroy() {
    this.Components.forEach(Comp => Comp.destroy())
    this.$root.innerHTML = ''
  }
}