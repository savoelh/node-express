const fs = require("fs")
const process = require("process")
const axios = require("axios");
const { raw } = require("express");
const args = process.argv.slice(2)

//This file freezes on my machine and cannot complete.
//It freezes in the makeURLTest function.
//specifically at the resp = await axios.get(url)
//somtimes it will go through and other times it will not.
//Ive never seen it go past the 3rd item.
//After refactoring my code to a axios.then() function I get a similar result
//I think I am missing an await or an async somewhere in my code.

//node urls.js urls.txt

async function makeURLText(urlLines) {
  let shitData;
  let resp;
  try {

    const boxOfBoxes = urlLines.map(async shit => {
      console.log("boxofboxes started")
      const boxes = await axios.get(shit)
      console.log(boxes.config.url)
      const shitsName = `${boxes.config.url}`.replace(/^https?:\/\//, "")
      const rawShit = boxes.data
      shitData = rawShit

      return writeFile(shitsName, rawShit)
    })

    const boxOfShit = await Promise.all(boxOfBoxes)

  } catch (err) {
    console.error(`Cannot read URL: ${err}`);
    // process.exit(1);
  }
}

async function makeText(path) {
  console.log("Making text")
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

function writeFile(fileName, data) {
  console.log(fileName)
  console.log("freeze check1")
  fs.writeFile(fileName, data, function (error) {
    console.log("frezzse2")
    if (error) {
      console.log(error)
      process.exit(2)
    }
  })
}

makeText(args[0])
