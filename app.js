const express = require('express');
const app = express();

app.get('/', (req, res)=> {
  res.send('My API')
});
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
