const prompts = require("prompts");
const Twit = require("twit");
const { lobsters } = require("./lobsters");
const { twitters } = require("./twitters");

(async () => {
  const response = await prompts([
    {
      type: "text",
      name: "consumer_key",
      message: "Twitter consumer key",
      validate: (value) => !!value,
    },
    {
      type: "text",
      name: "consumer_secret",
      message: "Twitter consumer secret",
      validate: (value) => !!value,
    },
    {
      type: "text",
      name: "access_token",
      message: "Twitter access token",
      validate: (value) => !!value,
    },
    {
      type: "text",
      name: "access_token_secret",
      message: "Twitter access token secret",
      validate: (value) => !!value,
    },
    {
      type: "text",
      name: "user_id",
      message: "Twitter user id",
      validate: (value) => !isNaN(value) || "Must be number.",
    },
  ]);

  const T = new Twit({
    consumer_key: response.consumer_key,
    consumer_secret: response.consumer_secret,
    access_token: response.access_token,
    access_token_secret: response.access_token_secret,
    timeout_ms: 60 * 1000,
  });

  Promise.all([twitters(T, response.user_id), lobsters()])
    .then(([twitters, lobsters]) =>
      twitters.filter((twitter) => lobsters.includes(twitter))
    )
    .then((people) =>
      people.length
        ? console.log(
            `Ask for lobste.rs invite from your twitter followers: ${people}`
          )
        : console.log(`You have twitter followers who use lobste.rs :(`)
    );
})();
