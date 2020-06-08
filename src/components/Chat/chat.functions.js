import {nickToColor, xhr} from '../../utils/utils';

export function createMessageTemplate(body = []) {
  return body.map(mes => {
    return `
                <div class="message">
                    <img style="background: ${nickToColor(mes.nick)}" src="./svg/logo.svg" class="icon"/>
                    <div>
                      <div class="nick">${mes.nick}</div>  
                      <div class="text">${mes.value}</div>
                    </div>
                </div>`
  }).join('')
}

export function fetchMessage(id, $mesWindow, currentRoom) {
  xhr('GET', `https://discord-9ba65.firebaseio.com/rooms/${id}.json`)
      .then(response => {
        console.log('interval')
        currentRoom.body = JSON.parse(response).body
        if (JSON.parse(response).body.length > currentRoom.body) {
          $mesWindow.innerHTML = createMessageTemplate(currentRoom.body)
        }
      })
}
