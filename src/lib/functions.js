export function POST(body) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
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
