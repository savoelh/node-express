const express = require('express');
const axios = require('axios')
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', async function (request, response, next) {

  try {
    let dataArray = []
    let data = request.body.developers
    async function dataRequest() {
      for (let i = 0; i < data.length; i++) {
        result = await axios.get(`https://api.github.com/users/${data[i]}`)
        const newObject = { name: result.data.name, bio: result.data.bio }
        dataArray.push(newObject)

      }
      return dataArray
    }

    const devInfo = await dataRequest()

    return response.send(devInfo);

  } catch (error) {
    next(error);
  }
});

app.listen(3000, function () {
  console.log("App running on port 3000")
});
