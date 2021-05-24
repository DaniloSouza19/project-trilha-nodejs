// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';

const app = express();

app.get('/', (request, response) =>
  response.json({ message: 'Hello world!!' })
);

app.listen(3333, () => {
  console.log('server is running on port 3333');
});
