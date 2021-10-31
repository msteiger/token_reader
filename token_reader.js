const InputEvent = require('input-event');

class TokenReader {

  // See description at https://www.kernel.org/doc/Documentation/input/input.txt
  // Converted with regex from https://github.com/torvalds/linux/blob/master/include/uapi/linux/input-event-codes.h
 
  constructor(devicename, callback) {
    const map = new Map();
	
	map.set(2, '1');
	map.set(3, '2');
	map.set(4, '3');
	map.set(5, '4');
	map.set(6, '5');
	map.set(7, '6');
	map.set(8, '7');
	map.set(9, '8');
	map.set(10, '9');
	map.set(11, '0');
	map.set(28, '\n');

    const input = new InputEvent(devicename);

    const keyboard = new InputEvent.Keyboard(input);


	var buffer = '';

	keyboard.on('keypress', obj => {
	  var char = map.get(obj.code);
	  if (!char) {
		char = '?';
	  }

	  if (char == '\n') {
                 callback(buffer);
		 buffer = '';
	  } else {
		buffer += char;
	  }
	});
  }
}

module.exports = TokenReader
