import { google } from "googleapis";
import credentials from "./_drive.json";

const { client_id, client_secret, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[1]);

const SCOPE = ["https://www.googleapis.com/auth/drive.metadata.readonly", "https://www.googleapis.com/auth/drive.file"];

export async function get(req, res) {
  if (!req.query.code) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPE,
    });

    res.status(301).redirect(authUrl);
    return;
  }

  oAuth2Client.getToken(req.query.code, (err, token) => {
    if (err) {
      console.log(err);
      res.status(301).redirect("/ajustes");
      return;
    }


    oAuth2Client.setCredentials(token);
    const drive = google.drive({ version: "v3", auth: oAuth2Client });

    drive.files.list({
      q: "mimeType='application/json' and name='facturasgratis.json'",
      fields: "files(id, name, modifiedTime)",
    }, (err, response) => {
      if (err) {
        console.log(err);
        res.status(301).redirect("/ajustes");
        return;
      }

      const file = response.data.files[0];
      drive.files.export({
        fileId: file.id,
        mimeType: "apllication/json",
      }, {
        responseType: 'stream'
      }, (err, response) => {
        if (err) {
          console.log(err);
          res.status(301).redirect("/ajustes");
          return;
        }

        console.log(response);
      });
    });
  });
}

export async function post(req, res, next) {
  console.log(req);
}
