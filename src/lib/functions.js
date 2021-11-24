export function POST(body) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export function resizeImage(base64Str, maxWidth = 400, maxHeight = 350) {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL());
    };
  });
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export function sortByNumber(a, b) {
  if (a.number > b.number) {
    return -1;
  }
  if (a.number < b.number) {
    return 1;
  }
  return 0;
}

export function roundWithTwoDecimals(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function numerationFormat(num, year) {
  const length = `${num}`.length;
  const prefix = year.toString().slice(-2);

  if (length === 1) return `${prefix}-0000${num}`;
  if (length === 2) return `${prefix}-000${num}`;
  if (length === 3) return `${prefix}-00${num}`;
  if (length === 4) return `${prefix}-0${num}`;
  return `${prefix}-${num}`;
}

export function autoNumeration(arr) {
  if (arr.length <= 0) return 1;

  const currYear = new Date().getFullYear();
  let currYearsArr = [];

  for (let a = 0; a < arr.length; ++a) {
    if (arr[a].date.year === currYear) currYearsArr = [...currYearsArr, arr[a]];
  }

  return currYearsArr.length <= 0 ? 1 : Math.max(...currYearsArr.map((n) => n.number)) + 1;
}

export let storageSpace = {
  usage: 0,
};

if (process.browser) {
  storageSpace.usage = roundWithTwoDecimals(new Blob(Object.values(localStorage)).size / 1024);
}

import LZString from "lz-string";
export const Ivon = {
  compress: (json) => {
    const arr = [
      json["number"], // [0] number
      json["date"]["day"], // [1] day
      json["date"]["month"], // [2] month
      json["date"]["year"], // [3] year
      json["legal_name"], // [4] emmiter legal name
      json["legal_id"], // [5] emmiter legal id
      json["street"], // [6] emmiter street
      json["city"], // [7] emmiter city
      json["cp"], // [8] emmiter cp
      json["country"], // [9] emmiter country
      json["email"], // [10] emmiter contact
      json["currency"], // [11] currency
      [], // [12] list of items
      json["totals"]["base"], // [13] base
      json["totals"]["iva"], // [14] iva
      json["totals"]["ret"], // [15] ret
      json["totals"]["total"], // [16] total
    ];

    //generate list of items
    json["items"].forEach((item) => {
      arr[12].push([
        item["amount"], // [0] item amount
        item["label"], // [1] item label
        item["dto"], // [2] item dto
        item["price"], // [3] item price
      ]);
    });

    const data = JSON.stringify(arr);
    const encoded = LZString.compressToEncodedURIComponent(data);
    return encoded;
  },
  decompress: (encoded) => {
    const d = JSON.parse(LZString.decompressFromEncodedURIComponent(encoded));
    const copy = {
      number: d[0],
      date: {
        day: d[1],
        month: d[2],
        year: d[3],
      },
      emmiter: {
        legal_name: d[4],
        legal_id: d[5],
        street: d[6],
        city: d[7],
        cp: d[8],
        country: d[9],
        contact: d[10],
        currency: d[11],
      },
      items: d[12].map((item) => {
        return {
          amount: item[0],
          label: item[1],
          dto: item[2],
          price: item[3],
        };
      }),
      totals: {
        base: d[13],
        iva: d[14],
        ret: d[15],
        total: d[16],
      },
    };

    return copy;
  }
}
