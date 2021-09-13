import { writable } from "svelte/store";
import { browser } from "$app/env";

export const lang = writable("es");

export const userData = writable((browser && JSON.parse(localStorage.getItem("userData"))) || {});

export const bills = writable((browser && JSON.parse(localStorage.getItem("bills"))) || []);
export const budgets = writable((browser && JSON.parse(localStorage.getItem("budgets"))) || []);
export const deliveries = writable((browser && JSON.parse(localStorage.getItem("deliveries"))) || []);

export const clients = writable((browser && JSON.parse(localStorage.getItem("clients"))) || []);
export const products = writable((browser && JSON.parse(localStorage.getItem("products"))) || []);
export const providers = writable((browser && JSON.parse(localStorage.getItem("providers"))) || []);

userData.subscribe((val) => browser && (localStorage.userData = JSON.stringify(val)));

bills.subscribe((val) => browser && (localStorage.bills = JSON.stringify(val)));
budgets.subscribe((val) => browser && (localStorage.budgets = JSON.stringify(val)));
deliveries.subscribe((val) => browser && (localStorage.deliveries = JSON.stringify(val)));

clients.subscribe((val) => browser && (localStorage.clients = JSON.stringify(val)));
products.subscribe((val) => browser && (localStorage.products = JSON.stringify(val)));
providers.subscribe((val) => browser && (localStorage.providers = JSON.stringify(val)));
