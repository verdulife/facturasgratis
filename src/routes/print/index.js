import fetch from "node-fetch";
import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import {
  numerationFormat,
  roundWithTwoDecimals,
  capitalize,
} from "../../lib/functions";
import { w_irpf } from "./_assets/w-irpf.svg";
import { wo_irpf } from "./_assets/wo-irpf.svg";

PDFDocument.prototype.svg = function (svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options), this;
};

const mm = (size) => size * 2.83465;
const black = "#1a1a1a";
const border = "#f0f0f0";

export async function post(req, res) {
  const data = req.body;
  let doc_type;

  if (req.headers.referer.includes("facturas")) doc_type = "factura";
  if (req.headers.referer.includes("presupuestos")) doc_type = "presupuesto";
  if (req.headers.referer.includes("proformas")) doc_type = "proforma";

  const doc = new PDFDocument({
    size: [mm(210), mm(297)],
    margin: 0,
    info: {
      Title: `${capitalize(doc_type)}_${numerationFormat(
        data.number,
        data.date.year
      )}_${data.client.legal_name}`,
    },
  });

  const req_regular = await fetch(
    req.headers.origin + "/fonts/fira-regular.woff"
  );
  const regular = await req_regular.arrayBuffer();
  const req_medium = await fetch(
    req.headers.origin + "/fonts/fira-medium.woff"
  );
  const medium = await req_medium.arrayBuffer();

  function fillPage() {
    doc.font(regular).fontSize(8).fillColor(black);

    doc.svg(data.totals.ret > 0 ? w_irpf : wo_irpf, 0, 0, {
      width: mm(210),
      height: mm(297),
    });

    doc.rect(mm(20), mm(20), mm(40), mm(30)).lineWidth(0.25).stroke(border);

    if (data.user.logo) {
      doc.image(data.user.logo, mm(22), mm(22), {
        fit: [mm(36), mm(26)],
        align: "center",
        valign: "center",
      });
    }

    doc.text(
      `${data.user.legal_name}
${data.user.legal_id}
${data.user.street},
${data.user.city}, ${data.user.cp} (${data.user.country})
${data.user.phone ? "t. " + data.user.phone : ""}
${data.user.email ? "e. " + data.user.email : ""}`,
      mm(data.user.logo ? 64 : 20),
      mm(23),
      {
        width: mm(85),
        lineGap: 1.5,
      }
    );

    doc.font(medium).fontSize(14);
    doc.text(capitalize(doc_type), mm(154), mm(23));

    doc.fontSize(8);
    doc.text(
      `${
        data.user.legal_initials ? data.user.legal_initials + "/" : ""
      }${numerationFormat(data.number, data.date.year)}`,
      mm(167.5),
      mm(31.2)
    );
    doc.text(
      `${data.date.day}/${data.date.month}/${data.date.year}`,
      mm(167.5),
      mm(36.2)
    );

    doc.text(data.client.legal_name, mm(30), mm(67));
    doc.text(
      `${data.client.address}, ${data.client.city}, ${data.client.cp} (${data.client.country})`,
      mm(38.4),
      mm(74)
    );
    doc.text(data.client.legal_id, mm(35), mm(81));
    doc.text(data.client.contact, mm(77.2), mm(81));

    doc.text(
      `${roundWithTwoDecimals(data.totals.base).toFixed(2)}${
        data.user.currency
      }`,
      mm(data.totals.ret > 0 ? 38.6 : 60.1),
      mm(237.3)
    );
    doc
      .font(regular)
      .text(
        `IVA ${data.user.iva}%`,
        mm(data.totals.ret > 0 ? 64.5 : 86.5),
        mm(237.3)
      );
    doc
      .font(medium)
      .text(
        `+${roundWithTwoDecimals(data.totals.iva).toFixed(2)}${
          data.user.currency
        }`,
        mm(data.totals.ret > 0 ? 79.5 : 101.1),
        mm(237.3)
      );
    if (data.totals.ret > 0) {
      doc.font(regular).text(`IRPF ${data.user.ret}%`, mm(105.5), mm(237.3));
      doc
        .font(medium)
        .text(
          `-${roundWithTwoDecimals(data.totals.ret).toFixed(2)}${
            data.user.currency
          }`,
          mm(122.5),
          mm(237.3)
        );
    }
    doc
      .fillColor("#fff")
      .text(
        `${roundWithTwoDecimals(data.totals.total).toFixed(2)}${
          data.user.currency
        }`,
        mm(data.totals.ret > 0 ? 159.5 : 138.2),
        mm(237.3)
      );

    /* if (doc_type === "factura") {
      doc.rect(mm(20), mm(257.25), mm(19.75), mm(19.75)).lineWidth(0.25).fillAndStroke("#fff", black);
      doc.image(data.ivon, mm(22), mm(259.5), {
        fit: [mm(15.5), mm(15.5)],
        align: "center",
        valign: "center",
      });
    } */

    if (data.note) {
      doc.fillColor(black).text(data.note, mm(30), mm(259.5), {
        width: mm(150),
        height: mm(15),
        align: "center",
        ellipsis: true,
      });
    }
  }

  const max_lines = 19;
  const chunkedLines = new Array(Math.ceil(data.items.length / max_lines))
    .fill()
    .map(() => data.items.splice(0, max_lines));

  for (let c = 0; c < chunkedLines.length; c++) {
    const chunk = chunkedLines[c];
    if (c > 0) doc.addPage();
    fillPage();

    if (chunkedLines.length >= 2) {
      doc
        .rect(mm(153.15), mm(40.2), mm(36.85), mm(5))
        .lineWidth(0.25)
        .stroke(black);
      doc.text(`Pág. ${c + 1}/${chunkedLines.length}`, mm(153.15), mm(41), {
        width: mm(36.85),
        align: "center",
      });
    }

    for (let l = 0; l < chunk.length; l++) {
      const line = chunk[l];
      const jump = mm(6) * l;
      const with_dto = (line.price * (line.dto > 0 ? line.dto : 100)) / 100;
      const line_total =
        (line.price - (line.dto > 0 ? with_dto : 0)) * line.amount;

      doc.fillColor(black);
      doc.text(line.amount, mm(21.5), mm(108) + jump);
      doc.text(line.label, mm(34.8), mm(108) + jump, {
        width: mm(106),
        height: mm(6),
        ellipsis: true,
      });
      doc.text(
        `${line.dto > 0 ? line.dto + "%" : "--"}`,
        mm(140.3),
        mm(108) + jump
      );
      doc.text(
        `${roundWithTwoDecimals(line.price).toFixed(2)}${data.user.currency}`,
        mm(150.5),
        mm(108) + jump
      );
      doc.text(
        `${roundWithTwoDecimals(line_total).toFixed(2)}${data.user.currency}`,
        mm(170.8),
        mm(108) + jump
      );
    }
  }

  res.statusCode = 200;
  res.setHeader("Content-type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${capitalize(doc_type)}_${numerationFormat(
      data.number,
      data.date.year
    )}_${data.client.legal_name}.pdf"`
  );

  doc.pipe(res);
  doc.end();
}
