const express = require("express");
const router = express.Router();
const users = require("../../Users");
const uuid = require("uuid");

//get all user
router.get("/", (req, res) => res.json(users));

//get single user
router.get("/:id", (req, res) => {
  let found = users.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    res.json(users.filter((user) => user.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

//post data
router.post("/", (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
  };
  if (!newUser.name) {
    return res.status(400).json({ msg: "Please include a name" });
  }
  users.push(newUser);
  //   res.json(users);
  res.redirect("/");
});

//Update users

router.put("/:id", (req, res) => {
  let found = users.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    const updUser = req.body;
    users.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updUser.name ? updUser.name : user.name;

        res.json({ msg: "User Updated", user });
      }
    });
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

//Delete user
router.delete("/:id", (req, res) => {
  let found = users.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member deleted",
      user: users.filter((user) => user.id != parseInt(req.params.id)),
    });
  } else {
    res
      .status(400)
      .res.json({ msg: `No user with the id of ${req.params.id}` });
  }
});

module.exports = router;
