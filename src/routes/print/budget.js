import fetch from "node-fetch";
import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import { numerationFormat, roundWithTwoDecimals } from "../../lib/functions";
import { budget_w_ret } from "./assets/budget_w_ret.svg";
import { budget_wo_ret } from "./assets/budget_wo_ret.svg";

PDFDocument.prototype.svg = function (svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options), this;
};

const mm = (size) => size * 2.83465;

export async function post(req, res) {
  const data = req.body;

  const doc = new PDFDocument({
    size: [mm(210), mm(297)],
    margin: 0,
    info: {
      Title: `Presupuesto_${numerationFormat(data.number, data.date.year)}_${data.client.legal_name}`,
    },
  });

  const reqFont = await fetch(req.headers.origin + "/fonts/fira.ttf");
  const fira = await reqFont.arrayBuffer();
  doc.font(fira).fontSize(8);

  doc.svg(data.totals.ret > 0 ? budget_w_ret : budget_wo_ret, 0, 0, {
    width: mm(210),
    height: mm(297),
  });

  if (data.user.logo) {
    doc.image(data.user.logo, mm(25), mm(23), {
      fit: [mm(40), mm(25)],
      align: "center",
      valign: "center",
    });

    doc.text(
      `${data.user.legal_name} | ${data.user.legal_id}
${data.user.street},
${data.user.city}, ${data.user.cp} (${data.user.country})
${data.user.phone ? "t." + data.user.phone : ""} ${data.user.email ? "| e. " + data.user.email : ""
      }`,
      mm(68),
      mm(27),
      {
        width: mm(75),
      }
    );
  } else {
    doc.text(
      `${data.user.legal_name} | ${data.user.legal_id}
${data.user.street},
${data.user.city}, ${data.user.cp} (${data.user.country})
${data.user.phone ? "t." + data.user.phone : ""} ${data.user.email ? "| e. " + data.user.email : ""
      }`,
      mm(25),
      mm(27),
      {
        width: mm(75),
      }
    );
  }

  doc.text(
    numerationFormat(data.number, data.date.year),
    mm(168),
    mm(31)
  );
  doc.text(
    `${data.date.day}/${data.date.month}/${data.date.year}`,
    mm(168),
    mm(36)
  );

  doc.text(data.client.legal_name, mm(34.5), mm(66.7));
  doc.text(data.client.legal_id, mm(163.5), mm(66.7));
  doc.text(data.client.address, mm(42), mm(74));
  doc.text(data.client.contact, mm(163.5), mm(74));

  for (let l = 0; l < data.items.length; l++) {
    const line = data.items[l];
    const jump = mm(5.5) * l;
    const with_dto = (line.price * (line.dto > 0 ? line.dto : 100)) / 100;
    const line_total =
      (line.price - (line.dto > 0 ? with_dto : 0)) * line.amount;

    doc.text(line.amount, mm(27), mm(97) + jump);
    doc.text(line.label, mm(38), mm(97) + jump);
    doc.text(`${line.dto > 0 ? line.dto + "%" : "--"}`, mm(139), mm(97) + jump);
    doc.text(
      `${roundWithTwoDecimals(line.price).toFixed(2)}${data.user.currency}`,
      mm(150),
      mm(97) + jump
    );
    doc.text(
      `${roundWithTwoDecimals(line_total).toFixed(2)}${data.user.currency}`,
      mm(168),
      mm(97) + jump
    );
  }

  if (data.totals.ret > 0) {
    doc.text(
      `${roundWithTwoDecimals(data.totals.base).toFixed(2)}${data.user.currency
      }`,
      mm(63.5),
      mm(238)
    );

    doc.fontSize(7).text(`${data.user.ret}`, mm(87.2), mm(238.1));
    doc
      .fontSize(8)
      .text(
        `-${roundWithTwoDecimals(data.totals.ret).toFixed(2)}${data.user.currency
        }`,
        mm(96),
        mm(238)
      );

    doc.fontSize(7).text(`${data.user.iva}`, mm(119.3), mm(238.1));
    doc
      .fontSize(8)
      .text(
        `${roundWithTwoDecimals(data.totals.iva).toFixed(2)}${data.user.currency
        }`,
        mm(128),
        mm(238)
      );

    doc
      .fillColor("#fff")
      .text(
        `${roundWithTwoDecimals(data.totals.total).toFixed(2)}${data.user.currency
        }`,
        mm(154),
        mm(238)
      );
  } else {
    doc.text(
      `${roundWithTwoDecimals(data.totals.base).toFixed(2)}${data.user.currency
      }`,
      mm(79.5),
      mm(238)
    );

    doc.fontSize(7).text(`${data.user.iva}`, mm(102.6), mm(238.1));
    doc
      .fontSize(8)
      .text(
        `${roundWithTwoDecimals(data.totals.iva).toFixed(2)}${data.user.currency
        }`,
        mm(111.5),
        mm(238)
      );

    doc
      .fillColor("#fff")
      .text(
        `${roundWithTwoDecimals(data.totals.total).toFixed(2)}${data.user.currency
        }`,
        mm(137),
        mm(238)
      );
  }

  if (data.note) {
    doc.fillColor("#000").text(data.note, mm(27), mm(258), {
      width: mm(156),
      height: mm(12.5),
      align: "center",
      ellipsis: true,
    });
  }

  res.statusCode = 200;
  res.setHeader("Content-type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="Presupuesto_${numerationFormat(data.number, data.date.year)}_${data.client.legal_name}.pdf"`
  );

  doc.pipe(res);

  doc.end();
}
