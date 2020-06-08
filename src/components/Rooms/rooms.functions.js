import {xhr} from '../../utils/utils';

export function addRoom($list, text, rooms) {
  xhr('POST', 'https://discord-9ba65.firebaseio.com/rooms.json', {name: text})
      .then(response => {
        const res = JSON.parse(response)
        if (res.name) {
          const div = document.createElement('div')
          div.classList.add('room')
          div.innerHTML = text
          div.setAttribute('data-id', res.name)
          div.setAttribute('data-type', 'room')
          $list.appendChild(div)
          rooms.push({id: res.name, value: text, body: []})
        }
      })
}

export function renderRooms(rooms) {
  return rooms.map(mapRooms)
      .join('')
}
const mapRooms = r => `
        <div 
        data-id=${r.id}
        data-type="room" 
        class="room">${r.value}</div>

`