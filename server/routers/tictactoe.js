const sql = require("../utils/db");
const express = require("express");
const router = express.Router();

// saves
router.post("/save-histories", async (req, res) => {
  // there should be middleware for all of this
  if (!req.cookies?.user) {
    return res.status(400).end();
  }
  if (!req.body.history) {
    return res.status(400).end();
  }

  const gameHistory = req.body.history;
  const { userId } = JSON.parse(req.cookies.user);

  try {
    const [{ id }] = await sql`
      insert into 
        game_histories (user_id, game_history)
        values (${userId}, ${gameHistory})
      returning id
    `;

    return res.status(200).send({ id });
  } catch (e) {
    res.status(400).end();
  }
});

router.post("/delete-histories", async (req, res) => {
  if (!req.cookies?.user) {
    return res.status(400);
  }
  const id = req.body.id;

  try {
    await sql`
      delete from
        game_histories
        where 
          id=${id}
    `;
    return res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
});

router.get("/get-histories", async (req, res) => {
  if (!req.cookies?.user) {
    return res.status(400);
  }

  const { userId } = JSON.parse(req.cookies.user);
  try {
    const result = await sql`
      select id, game_history
      from game_histories
        where user_id=${userId}
    `;

    res.status(200).send(result.map((val) => [val["id"], val["game_history"]]));
  } catch (error) {
    res.status(400);
  } 
});

module.exports = router;
