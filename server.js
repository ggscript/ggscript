var express = require('express');
const app = express();

app.set('port', (process.env.API_PORT || 3001));


app.get('/api/test', function(req, res) {
  console.log('request recieved');
  res.send('success - proxy is working');
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

/////