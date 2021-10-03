import { google } from "googleapis";
import credentials from "./_drive.json";

const { client_id, client_secret, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[1]);

const SCOPE = ["https://www.googleapis.com/auth/drive.metadata.readonly", "https://www.googleapis.com/auth/drive.file"];

export async function get(req, res, next) {
  if (!req.query.code) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPE,
    });

    res.end(authUrl);
  } else {
    oAuth2Client.getToken(req.query.code, (err, token) => {
      if (!err) {
        oAuth2Client.setCredentials(token);
        const drive = google.drive({ version: "v3", auth: oAuth2Client });

        drive.files.list({ q: "mimeType='application/json' and name = 'facturasgratis.json'" }, (err, response) => {
          if (!err) {
            const files = response.data.files;

            if (files.length > 0) {
              const fileId = files[0].id;

              drive.files.get({ fileId, alt: "media" }, { responseType: "stream" }).then((result) => {
                result.data
                  .on("end", () => {
                    console.log("Done downloading file.");
                  })
                  .on("error", (err) => {
                    console.error("Error downloading file.");
                  })
                  .on("data", (d) => {
                    console.log("Downloading...");
                  })
                  .pipe(res);
              });
            } else {
              console.log("no files");
              res.status(301).redirect("/ajustes");
            }
          }
        });
      }
    });
  }
}

export async function post(req, res, next) {
  console.log(req);
}
