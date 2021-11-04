const InputEvent = require('input-event');

class TokenReader {

  // See description at https://www.kernel.org/doc/Documentation/input/input.txt
  // Converted with regex from https://github.com/torvalds/linux/blob/master/include/uapi/linux/input-event-codes.h
 
  keyCodeMappings = new Map([
    [2, '1'],
    [3, '2'],
    [4, '3'],
    [5, '4'],
    [6, '5'],
    [7, '6'],
 //   [8, '7'],
 //   [9, '8'],
    [10, '9'],
    [11, '0'],
    [28, '\n'],
  ]);

  constructor(devicename) {
    const input = new InputEvent(devicename);
    this.keyboard = new InputEvent.Keyboard(input);
  }

  onTokenEvent(callback) {
    var buffer = '';

    this.keyboard.on('keypress', obj => {
      const char = keyCodeMappings.get(obj.code) || '?';

      if (char === '\n') {
         callback(buffer);
         buffer = '';
      } else {
        buffer += char;
      }
    });
  }
}

module.exports = TokenReader
