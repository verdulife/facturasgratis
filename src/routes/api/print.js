import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import { bill } from "$lib/bill.svg";

const mm = (size) => size * 2.83465;

PDFDocument.prototype.svg = function (svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options), this;
};

export function post(req) {
  return {
    body: req.body
  };
  /* const data = req.body;
  
  res.statusCode = 200;
  res.setHeader("Content-type", "application/pdf");
  res.setHeader("Content-disposition", "attachment; filename=file.pdf");

  const doc = new PDFDocument({
    size: [mm(210), mm(297)],
    margin: 0,
    info: {
      Title: `Factura_${numerationFormat(data.number)}_${data.client.legal_id}`,
    },
  });

  doc.registerFont('Operator', '../../fonts/OperatorMonoLig-Medium.woff2', 'OperatorMonoLig-Medium');
  doc.pipe(res);

  doc.svg(bill, 0, 0, {
    width: mm(210),
    height: mm(297),
  });

  doc.font("Operator").fontSize(8);

  doc.text(data.number, mm(168), mm(31));
  doc.text(date, mm(168), mm(36));

  doc.text(data.client.legal_name, mm(34.5), mm(66.7));
  doc.text(data.client.legal_id, mm(163.5), mm(66.7));
  doc.text(data.client.address, mm(42), mm(74));
  doc.text(data.client.contact, mm(163.5), mm(74));

  let base = 0;
  for (let l = 0; l < data.products_list.length; l++) {
    const line = data.products_list[l];
    const jump = mm(5.5) * l;
    const with_dto = (line.price * (line.dto > 0 ? line.dto : 100)) / 100;
    const line_total = (line.price - (line.dto > 0 ? with_dto : 0)) * line.amount;

    doc.text(line.amount, mm(27), mm(97) + jump);
    doc.text(line.label, mm(38), mm(97) + jump);
    doc.text(`${line.dto}%`, mm(139), mm(97) + jump);
    doc.text(`${line.price.toFixed(2)}€`, mm(150), mm(97) + jump);
    doc.text(`${line_total.toFixed(2)}€`, mm(168), mm(97) + jump);

    base += line_total;
  }

  const ret = 15;
  const iva = 21;

  const with_ret = base * ret / 100;
  const with_iva = base * iva / 100;
  const total = base - with_ret + with_iva;

  doc.text(`${base.toFixed(2)}€`, mm(63.5), mm(238));
  doc.text(`-${with_ret.toFixed(2)}€`, mm(96), mm(238));
  doc.text(`${with_iva.toFixed(2)}€`, mm(128), mm(238));
  doc.fillColor("#fff").text(`${total.toFixed(2)}€`, mm(154), mm(238));

  doc.end(); */
}