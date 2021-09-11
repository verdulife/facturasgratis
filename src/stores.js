import { writable } from "svelte/store";
import { browser } from "$app/env";

export const lang = writable("es");
export const userData = writable((browser && JSON.parse(localStorage.getItem("userData"))) || {});

export const bills = writable((browser && JSON.parse(localStorage.getItem("bills"))) || []);
export const budgets = writable([]);
export const deliveries = writable([]);

export const clients = writable([]);
export const products = writable([]);
export const providers = writable([]);

userData.subscribe((val) => browser && (localStorage.userData = JSON.stringify(val)));
bills.subscribe((val) => browser && (localStorage.bills = JSON.stringify(val)));
