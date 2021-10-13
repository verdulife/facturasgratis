export const iOS = process.browser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

export const tools = [
  {
    slug: "/facturas",
    title: "Facturas",
    desc: "Genera y/o modifica facturas. Envíalas por correo electrónico y/o guárdalas en PDF.",
    icon: "/facturas.svg",
    soon: false,
  },
  {
    slug: "/presupuestos",
    title: "Presupuestos",
    desc: "Genera y/o modifica presupuestos. Envíalos por correo electrónico y/o guárdalos en PDF.",
    icon: "/presupuestos.svg",
    soon: false,
  },
  {
    slug: "/albaranes",
    title: "Albaranes",
    desc: "Genera y/o modifica albaranes. Envíalos por correo electrónico y/o guárdalos en PDF.",
    icon: "/albaranes.svg",
    soon: true,
  },
  {
    slug: "/proformas",
    title: "Proformas",
    desc: "Genera y/o modifica proformas. Envíalas por correo electrónico y/o guárdalas en PDF.",
    icon: "/facturas.svg",
    soon: false,
  },
  {
    slug: "/clientes",
    title: "Clientes",
    desc: "Crea una lista de clientes. Después podrás usarlos en tus facturas, presupuestos y/o albaranes.",
    icon: "/clientes.svg",
    soon: false,
  },
  {
    slug: "/productos-servicios",
    title: "Productos y servicios",
    desc: "Crea una lista de productos/servicios. Podrás usarlos en tus facturas, presupuestos y/o albaranes.",
    icon: "/productos-servicios.svg",
    soon: false,
  },
  {
    slug: "/proveedores",
    title: "Proveedores",
    desc: "Crea una lista de proveedores. Así tendrás su información de contacto siempre a mano.",
    icon: "/proveedores.svg",
    soon: true,
  },
  {
    slug: "/calculadora",
    title: "Calculadora de impuestos",
    desc: "Una calculadora diseñada para calcular de forma automática los impuestos.",
    icon: "/presupuestos.svg",
    soon: false,
  },
  {
    slug: "/convertidor",
    title: "Convertidor de impuestos",
    desc: "Convierte precios con impuestos a sin impuestos y viceversa.",
    icon: "/albaranes.svg",
    soon: false,
  },
];

export const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
