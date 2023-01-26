const express = require('express');
const axios = require('axios')
const app = express();
const bodyParser = require('body-parser')
const ExpressError = require("./expressError");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', async function (request, response, next) {

  try {

    if (request.body == {}) {
      throw new ExpressError("Not Found", 404)
    }
    let results = request.body.developers.map(async d => {
    const result = await axios.get(`https://api.github.com/users/${d}`);
    return result.data
    });

    let out = await Promise.all(results)

    return response.send(out)
    
    // let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

  } catch (error) {
    next(error);
  }
});

app.listen(3000, function () {
  console.log("App running on port 3000")
});
