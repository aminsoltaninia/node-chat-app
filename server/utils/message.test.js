var  expect =require('expect');
var {generatemessage}=require('./message');


describe("Generate message",()=>{
   it('Should generate correct message object',()=>{
       var from = 'amin';
       var text='test message';
    
       var message = generatemessage(from,text);
       

       expect(typeof message.createAt).toBe('number');
       expect(message).toEqual(expect.objectContaining({from,text}));
   })
})