import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";

require("dotenv").config();

export const hello = onRequest((req, res) => {
  const accountSid = process.env.TWILIO_USER_ID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  console.log("hello");

  console.log(accountSid);
  console.log("TOKEN: " + authToken);
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: "You are now the 57th customer of the day! Please click the following link to view your status in-line",
      to: "+19054625839",
      from: "+14482421518",
    })
    .then((message: { sid: any }) => console.log(message.sid));

  res.send("Cloud Functions Sent Message 🚀");
});
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
