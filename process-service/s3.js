const AWS = require("aws-sdk");
const uuid = require("uuid");
const region = "eu-west-1";
AWS.config.update({
  region: region,
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  sessionToken: process.env.AWS_TOKEN
});

const s3 = new AWS.S3();
const bucketName = "screenshot-images-8520";

module.exports = {
  putImage: async function putImage(image) {
    const imageUUID = uuid.v4();
    await s3.putObject({
      Bucket: bucketName,
      Key: imageUUID,
      Body: image,
      ACL: 'public-read'


    }).promise();

    return `https://${bucketName}.s3-${region}.amazonaws.com/${imageUUID}`;
  }
};
