### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  Ajax is the only method that I am aware of.

- What is a Promise?
  Data that comes after the page as loaded.

- What are the differences between an async function and a regular function?
  Async functions return promises.

- What is the difference between Node.js and Express.js?
  Express is an application build on top of Node with additional tools

- What is the error-first callback pattern?
```js
  router.get("/:name", function (req, res) {
  const foundCat = cats.find(cat => cat.name === req.params.name)
  if (foundCat === undefined) {
    throw new ExpressError("Cat not found", 404)
  }
  res.json({ cat: foundCat })
})
```

- What is middleware?
  Seperate functions that are called before a function is run. Like a password checker or somthing to check weather a user is logged in

- What does the `next` function do?
  It allows a function to continue onto the next part of the script instead of ending there.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
const link = 'https://api.github.com/users'
async () => {
  const elie = await $.getJSON(`${link}/elie`);
  const joel = await $.getJSON(`${link}/joelburton`);
  const matt = await $.getJSON(`${link}/mmmaaatttttt`);

  return [elie, matt, joel];
}
```
