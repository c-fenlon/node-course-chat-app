const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => { // synchronous message => no need to call done
    var from = 'Sender';
    var text = 'Some text';
    var res = generateMessage(from, text);
    
    expect(res).toMatchObject({ from, text });
    expect(typeof res.createdAt).toBe('number');
  });
});