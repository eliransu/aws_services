const AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-west-1",
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  sessionToken: process.env.AWS_TOKEN
});
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

module.exports = {
  sendMessage: function (msg) {
    var params = {
      MessageBody: JSON.stringify(msg),
      QueueUrl: process.env.SQS_URL
    };

    sqs.sendMessage(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      }
    });
  }
};
