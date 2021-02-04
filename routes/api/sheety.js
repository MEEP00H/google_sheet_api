const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const keys = require("../../keys.json");

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected!!");
    gsrun(client);
  }
});

async function gsrun(cl) {
  const gsapi = google.sheets({ version: "v4", auth: cl });
  let spreadsheetId = "1buCfwvedtERnGIWwLWByD8gNJHaRfldmNpGMfkXCtn4";
  const data_sheet = await (
    await gsapi.spreadsheets.get({ spreadsheetId: spreadsheetId })
  ).data;
  console.log(data_sheet);
  //   router.get("/", (req, res) => res.json({ test: "test" }));
  await router.get("/", (req, res) => res.json({ data: data_sheet }));
}

module.exports = router;
