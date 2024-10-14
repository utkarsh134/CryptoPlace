import { createRequire } from "module";
const require = createRequire(import.meta.url);
const twilio = require("twilio");

// Twilio credentials
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

function handleSendSMS(req, res) {
  const { organization, description } = req.body;

  // Customize the message
  const message = `Organization: ${organization}\nDescription: ${description}`;

  client.messages
    .create({
      body: message,
      from: `${process.env.TWILIO_PHONE_NUMBER}`, // Twilio phone number
      to: `${process.env.MY_MOBILE_NUMBER}`, // Your personal mobile number
    })
    .then((message) => {
      res
        .status(200)
        .json({ success: true, message: "Message sent!", sid: message.sid });
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to send message" });
    });
}

export { handleSendSMS };
