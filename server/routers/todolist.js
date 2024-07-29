const { v4: uuidv4 } = require('uuid'); // For generating UUIDs

const sql = require('../utils/db');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // should also have middleware for this
  if (!req.cookies?.user) {
    return res.status(400).end();
  }

  const { userId } = JSON.parse(req.cookies.user);

  try {
    const result = await sql`
      select *
      from tasks
        where user_id = ${userId}
    `;
    res.status(200).send(result);
  } catch (e) {
    res.send(400).end();
  }
});

router.post('/add-task', async (req, res) => {
  if (!req.cookies?.user) {
    return res.status(400).end();
  }

  const { userId } = JSON.parse(req.cookies.user);
  const { title, description, days, time, repeating } = req.body;

  try {
    const [{ id }] = await sql`
      insert into
        tasks (id, user_id, title, description, days, repeating_time, repeating)
        values (${uuidv4()}, ${userId}, ${title}, ${description}, ${days}, ${time}, ${repeating})
      returning id
    `;

    res.status(200).send({ id });
  } catch (e) {
    res.status(400);
  }
});

router.put('/change-task', async (req, res) => {
  if (!req.cookies?.user) {
    return res.status(400).end();
  }

  const { userId } = JSON.parse(req.cookies.user);
  const { title, description, days, time, repeating } = req.body;

  try {
    await sql`
      update tasks 
        set
          title=${title}, 
          description=${description}, 
          days=${days}, 
          repeating_time=${time}, 
          repeating=${repeating}
        where
          user_id = ${userId}
    `;

    console.log('here');
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
});

module.exports = router;
