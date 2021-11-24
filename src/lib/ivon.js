import LZString from "lz-string";

export const Ivon = {
  compress: (json) => {
    try {
      const arr = [
        json.number, // [0] number
        json.date.day, // [1] day
        json.date.month, // [2] month
        json.date.year, // [3] year
        json.legal_name, // [4] emmiter legal name
        json.legal_id, // [5] emmiter legal id
        json.street, // [6] emmiter street
        json.city, // [7] emmiter city
        json.cp, // [8] emmiter cp
        json.country, // [9] emmiter country
        json.email, // [10] emmiter contact
        json.currency, // [11] currency
        [], // [12] list of items
        json.totals.base, // [13] base
        json.totals.iva, // [14] iva
        json.totals.ret, // [15] ret
        json.totals.total, // [16] total
      ];

      //generate list of items
      json.items.forEach((item) => {
        arr[12].push([
          item.amount, // [0] item amount
          item.label, // [1] item label
          item.dto, // [2] item dto
          item.price, // [3] item price
        ]);
      });

      return LZString.compressToEncodedURIComponent(JSON.stringify(arr));

    } catch (error) {
      return {
        error: true,
        message: error.message,
      }
    }
  },

  decompress: (encoded) => {
    const d = JSON.parse(LZString.decompressFromEncodedURIComponent(encoded));
    const json = {
      number: d[0],
      date: { day: d[1], month: d[2], year: d[3] },
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
        return { amount: item[0], label: item[1], dto: item[2], price: item[3] };
      }),
      totals: { base: d[13], iva: d[14], ret: d[15], total: d[16] },
    };

    return json;
  }
}