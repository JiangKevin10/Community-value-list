const { google } = require("googleapis");
const path = require("path");

console.log("START: testSheets.js is running");

async function main() {
  // ✅ New Google Sheets ID you gave
  const spreadsheetId = "1nfamyGums2NolPPwN9X8hHODSrJICZ-hzlUTcS3VVZ4";

  // ✅ Tab name (the bottom sheet tab)
  const tabName = "Test for bot";

  // Spaces in tab name => wrap in single quotes
  const appendRange = `'${tabName}'!A:B`;

  const keyPath = "C:\\Users\\firek\\OneDrive\\Documents\\Secret Keys\\discord-sheets-bot-key.json";
  console.log("Looking for key at:", keyPath);
  console.log("About to append to:", appendRange);

  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: appendRange,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[new Date().toISOString(), "hello from discord bot"]],
    },
  });

  console.log("SUCCESS: wrote to:", res.data.updates.updatedRange);

  const readRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${tabName}'!A1:B10`,
  });

  console.log("READ BACK (A1:B10):");
  console.log(readRes.data.values);
}

main().catch((err) => {
  console.error("ERROR:", err?.message || err);
});
