const sql = require("../utils/db");
const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await sql`select * from users where email=${email}`;

  if (!result.length) {
    return res.status(400).send(`Unable to find ${email}`);
  }

  const row = result[0];
  if (password !== row.password) {
    res.status(400).send(`Password for ${email} is not right, try again.`);
  } else {
    const data = {
      name: row.name,
      email: row.email,
      userId: row.id,
    };

    res.cookie("user", JSON.stringify(data), {
      sameSite: "None",
      // secure: true,
    });
    res.status(200).json(data);
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(`registering ${name} with ${email} and ${password}`);

  try {
    const [{ id: userId }] = await sql`
    insert into 
      users (create_time, name, email, password) 
      values (
        ${Date()}, ${name}, ${email}, ${password}
      )
      returning id`;

    const data = {
      name,
      email,
      userId,
    };

    res.cookie("user", JSON.stringify(data), {
      sameSite: "None",
      secure: true,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
});

module.exports = router;
