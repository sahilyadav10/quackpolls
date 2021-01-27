const Poll = require("../model/poll");

module.exports.showPolls = async (req, res) => {
  const poll = await Poll.find({ visibility: "Public" }).exec();
  const fields = poll.map((poll) => {
    let total = 0;
    const question = poll.question;
    const pollId = poll._id;
    const votes = poll.options.map((votes) => votes.votes);
    total = votes.reduce((a, b) => a + b);
    return { question, total, pollId };
  });
  res.status(200).send({ fields });
};
