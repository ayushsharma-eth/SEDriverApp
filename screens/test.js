const fetch = require("node-fetch");
const image = require("./banana.png")
//const data = { image: image };

var data = new FormData()
data.append('file', image)

fetch('http://127.0.0.1:3000/s3Test/2/', {
  method: 'POST', // or 'PUT'
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
    .then((response) => response.json())
    .then((data) => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });