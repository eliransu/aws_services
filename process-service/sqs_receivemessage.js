const AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-east-1",
  sessionToken: process.env.AWS_TOKEN,
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});
console.log({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  sqs_url: process.env.SQS_URL
})
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

module.exports = {
  getMessages: async function () {

    const messages = await sqs.receiveMessage({
      QueueUrl: process.env.SQS_URL,
    }).promise();

    return messages;
  },

  deleteMessage: function (msgId) {
    sqs.deleteMessage({
      QueueUrl: process.env.SQS_URL,
      ReceiptHandle: msgId
    }).promise().catch((err) => {
      console.error(`Failed to delete message from queue ${err.message}`)
    })
  }
};
