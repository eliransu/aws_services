require("dotenv").config();
const Twitter = require("twitter");
const metric = require("../shared/metric");

const sqs = require("./sqs_sendmessage");
console.log({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
})
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

client.stream("statuses/filter", { track: 'javascript' }, function (stream) {
  stream.on("data", function (tweet) {
    if (tweet.entities.urls.length > 0) {
      const { text, id, timestamp_ms } = tweet;

      const urls = [];

      for (let i = 0; i < tweet.entities.urls.length; i++) {
        urls.push(tweet.entities.urls[i].expanded_url);
      }

      const tweetData = {
        track: 'javascript',
        text,
        id,
        timestamp_ms,
        urls
      };

      sqs.sendMessage(tweetData);
      console.log(JSON.stringify(tweetData));

      metric.sendMetric("fetch-service", "Url", urls.length, [
        {
          Name: "track",
          Value: 'javascript'
        }
      ]);
    }
  });

  stream.on("error", function (error) {
    console.error(error);
  });
});
