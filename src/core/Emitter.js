export class Emitter {
  constructor() {
    this.listeners = {}
  }
  subscribe(key, fn) {
    this.listeners[key] = this.listeners[key] || []
    this.listeners[key].push(fn)
  }
  emit(key, ...args) {
    this.listeners[key].forEach(fn => fn(...args))
  }
}