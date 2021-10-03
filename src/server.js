import sirv from "sirv";
import express from "express";
import cors from "cors";
import compression from "compression";
import * as sapper from "@sapper/server";

const app = (module.exports = express());

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

app.use(cors())
  .use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))
  .use(express.json({limit: '50mb', extended: true}))
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: (req, res) => {
        return {
          locale: req.headers["accept-language"].substring(0, 2),
        };
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
