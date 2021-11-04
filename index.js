const axios = require('axios')

const TokenReader = require('./token_reader.js')

const allowed = [ '0003908287' ];

function log(text) {
    console.log(new Date().toISOString() + " - " + text);
}

function openDoor() {
    setTimeout(function() {
        sendRequest('ON');
        setTimeout(function() {
            sendRequest('OFF');
        }, 5000);
    },
    3000);
}

function sendRequest(data) {
  axios
    .post('http://raspberrypi:8080/rest/items/GHoma_Switch_d3590c', data, {
        headers: { 'Content-Type': 'text-plain' }
    })
    .then(res => {
      log('Sent request ' + data + ', received statusCode: ' + res.status)
    })
    .catch(error => {
      console.error(error)
    })
}

const name = '/dev/input/by-id/usb-HXGCoLtd_HIDKeys-event-kbd'
const reader = new TokenReader(name);

reader.onTokenEvent(function(chunk) {
    if (allowed.includes(chunk)) {
      log("Grant access to " + chunk);
      openDoor();
    } else {
      log("Forbid access to " + chunk);
    }
  });


function intervalFunc() {
  console.log('Waiting for input!');
}

setInterval(intervalFunc, 3600000);
console.log("Init complete");

