import { writable } from "svelte/store";

export const lang = writable("es");

export const userData = writable((process.browser && JSON.parse(localStorage.getItem("userData"))) || {});
export const bills = writable((process.browser && JSON.parse(localStorage.getItem("bills"))) || []);
export const budgets = writable((process.browser && JSON.parse(localStorage.getItem("budgets"))) || []);
export const deliveries = writable((process.browser && JSON.parse(localStorage.getItem("deliveries"))) || []);
export const clients = writable((process.browser && JSON.parse(localStorage.getItem("clients"))) || []);
export const products = writable((process.browser && JSON.parse(localStorage.getItem("products"))) || []);
export const providers = writable((process.browser && JSON.parse(localStorage.getItem("providers"))) || []);

userData.subscribe((val) => process.browser && (localStorage.userData = JSON.stringify(val)));
bills.subscribe((val) => process.browser && (localStorage.bills = JSON.stringify(val)));
budgets.subscribe((val) => process.browser && (localStorage.budgets = JSON.stringify(val)));
deliveries.subscribe((val) => process.browser && (localStorage.deliveries = JSON.stringify(val)));
clients.subscribe((val) => process.browser && (localStorage.clients = JSON.stringify(val)));
products.subscribe((val) => process.browser && (localStorage.products = JSON.stringify(val)));
providers.subscribe((val) => process.browser && (localStorage.providers = JSON.stringify(val)));
