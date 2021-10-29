const axios = require('axios')

 const allowed = [ '123457890' ];

function log(text) {
	console.log(new Date().toISOString() + " - " + text);
}

function readToken() {
	var stdin = process.openStdin();

    // resume stdin in the parent process (node app won't quit all by itself
    // unless an error or process.exit() happens)
	stdin.resume();
	
	// use string instead of 'binary'
	stdin.setEncoding( 'utf8' );    
	
	stdin.on('data', function(chunk) { 
	  chunk = chunk.trim(); // cut off newline

      if (allowed.includes(chunk)) {
		  log("Grant access to " + chunk);
		  openDoor();
	  } else {
		  log("Forbid access to " + chunk);
	  }
	});
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

readToken();
