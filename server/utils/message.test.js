var  expect =require('expect');
var {generatemessage,generateLocationmessage}=require('./message');


describe("Generate message",()=>{
   it('Should generate correct message object',()=>{
       var from = 'amin';
       var text='test message';
    
       var message = generatemessage(from,text);
       

       expect(typeof message.createAt).toBe('number');
       expect(message).toEqual(expect.objectContaining({from,text}));
   })
})

describe("Generate Location message",()=>{
    it('Should generate correct location object',()=>{
      var from = 'amin';
      var latitude =15;
      var longitude=32;
      var url = 'https://www.google.com/maps?q=15,32';
      var message = generateLocationmessage(from,latitude,longitude);
      expect(typeof message.createAt).toBe('number');

      expect(message).toEqual(expect.objectContaining({from,url}))


    })
})