import{C as a}from"./vendor-0999ec80.js";const e=a(JSON.parse(localStorage.getItem("userData"))||{}),s=a(JSON.parse(localStorage.getItem("bills"))||[]);e.subscribe((a=>localStorage.userData=JSON.stringify(a))),s.subscribe((a=>localStorage.bills=JSON.stringify(a)));export{s as b,e as u};
