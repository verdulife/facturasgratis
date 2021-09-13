import { browser } from "$app/env";

export function roundWithTwoDecimals(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export let storageSpace = {
  /* total: 0, */
  usage: 0,
  /* percentage: 0, */
};

function totalStorage() {
  var countKey, countValue, itemLength;
  var occupied = 3;
  var i = 0;
  while (!error) {
    try {
      localStorage.setItem("testKey" + i, "11111111112222222222333333333344444444445555555555666661111111111222222222233333333334444444444555555555566666");
    } catch (e) {
      var error = e;
    }
    i++;
  }
  if (error) {
    for (var i = 0; i < localStorage.length; i++) {
      countKey = localStorage.key(i);
      countValue = localStorage.getItem(localStorage.key(i));
      itemLength = countKey.length + countValue.length;
      occupied = occupied + itemLength;
    }
    occupied = roundWithTwoDecimals((occupied * 16) / (8 * 1024));

    Object.keys(localStorage).forEach(function (key) {
      if (key.indexOf("testKey") !== -1) {
        localStorage.removeItem(key);
      }
    });
  }

  return occupied;
}

if (browser) {
  /* storageSpace.total = totalStorage(); */
  storageSpace.usage = roundWithTwoDecimals(new Blob(Object.values(localStorage)).size / 1024);
  /* storageSpace.percentage = roundWithTwoDecimals((storageSpace.usage / storageSpace.total) * 100); */
}
