export function storage(key, value) {
  if (value === '' || value) {
    localStorage.setItem(key, value)
  } else {
    return localStorage.getItem(key)
  }
}

export function xhr(method, url, body = null) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify(body))
    xhr.onload = () => {
      resolve(xhr.response)
    }
  })
}

export function parseToArray(obj) {
  if (obj === null) {
    return []
  }
  return Object.keys(obj).map(key => {
    return {id: key, value: obj[key].name, body: obj[key].body || []}
  })
}

export function nickToColor(nick) {
  const length = nick.length*nick.length*2
  return `rgba(${length*(1+nick.length)}, ${length+20}, ${length*4})`
}