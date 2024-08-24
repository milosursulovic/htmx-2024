import express from "express";
import xss from "xss";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/users", (req, res) => {
  setTimeout(async () => {
    const limit = +req.query.limit || 10;

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
    );
    const users = await response.json();

    res.send(`
        <h1 class="text-2xl font-bold my-4">Users</h1>
        <ul>
            ${users.map((user) => `<li>${user.name}</li>`).join("")}
        </ul>
    `);
  }, 2000);
});

app.post("/convert", (req, res) => {
  setTimeout(() => {
    const fahrenheit = parseFloat(req.body.fahrenheit);
    const celsius = (fahrenheit - 32) * (5 / 9);
    res.send(`
        <p>${fahrenheit} degrees Fahrenheit is equal to ${celsius} degrees Celsius</p>
      `);
  }, 2000);
});

let currentTemperature = 20;

app.get("/get-temperature", (req, res) => {
  currentTemperature += Math.random() * 2 - 1;
  res.send(currentTemperature.toFixed(1) + "°C");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
