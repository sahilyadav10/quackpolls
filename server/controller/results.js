const Poll = require("../model/poll");

module.exports.showResults = async (req, res) => {
  const { id } = req.params;
  const poll = await Poll.findById(id);
  if (!poll) {
    return res.status(400).send("Not found!");
  }
  res.status(200).send({ poll });
};
