const fs = require("fs")
const process = require("process")
const axios = require("axios")
const args = process.argv.slice(2)

//This file freezes on my machine and cannot complete.
//It freezes int he makeURLTest function.
//specifically at the resp = await axios.get(url)
//somtimes it will go through and other times it will not.
//Ive never seen it go past the 3rd item.
//After refactoring my code to a axios.then() function I get a similar result
//I think I am missing an await or an async somewhere in my code.


async function makeURLText(urlLines) {
  let resp;
  try {
    for (url of urlLines) {
      console.log(url)
      resp = await axios.get(url);
      console.log("resp found")
      const fileName = `${resp.config.url}`.replace(/^https?:\/\//, "")
      console.log("filename reached")
      const data = resp.data
      console.log("data aquired")
      writeFile(fileName, data)
    }
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
}

async function makeText(path) {
  fs.readFile(path, "utf8", async function (err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      const allLines = data.split(/\r\n|\n/);
      await makeURLText(allLines)
    }
  });
}

async function writeFile(fileName, data) {
  console.log("freeze check")
  fs.writeFile(fileName, data, function (error) {
    if (error) {
      console.log(error)
      process.exit(2)
    }
  })
}

makeText(args[0])
