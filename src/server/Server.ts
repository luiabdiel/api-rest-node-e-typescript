import express from 'express';

const server = express();

interface Test {

}

server.get('/', (req, res) => {
  return res.send('Hello world!');
});


export { server };
