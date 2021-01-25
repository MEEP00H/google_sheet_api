const { google } = require("googleapis");
const keys = require("./keys.json");
var _ = require("lodash");

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

  const opt = {
    spreadsheetId: "1buCfwvedtERnGIWwLWByD8gNJHaRfldmNpGMfkXCtn4",
    range: "province",
  };

  let data = await (await gsapi.spreadsheets.values.get(opt)).data.values;
  let head_data = data[0];
  let body_data = _.drop(data);
  function toObj(arr) {
    return arr.reduce(function (p, c, i) {
      p[head_data[i]] = c;
      return p;
    }, {});
  }

  var JSON = body_data.map(toObj);

  console.log(JSON);
}
