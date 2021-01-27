const Poll = require("../model/poll");
const WebSocket = require("ws");

module.exports.createPoll = async (req, res) => {
  const inputs = req.body.inputs;
  const options = inputs.map((input) => ({ value: input.value }));
  const poll = new Poll({
    question: req.body.question,
    visibility: req.body.visibility,
    options: [...options],
  });
  await poll.save();
  res.send(`${poll._id}`);
};

module.exports.showPoll = async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  if (!poll) {
    return res.sendStatus(400).send("Not found!");
  }
  res.status(200).json({ poll });
};

module.exports.voteOnPoll = async (req, res) => {
  const { id } = req.params;
  const voteID = req.body.radio;
  const poll = await Poll.findOneAndUpdate(
    { _id: id, "options._id": voteID },
    { $inc: { "options.$.votes": 1 } },
    { new: true }
  );
  await poll.save();
  res.status(200).send()

  req.app.locals.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(poll));
    }
  });
};