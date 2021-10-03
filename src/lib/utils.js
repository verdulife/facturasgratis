export const iOS = process.browser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

export const tools = [
  {
    slug: "/facturas",
    title: "Facturas",
    desc: "Genera y/o modifica facturas. Envíalas por correo electrónico y/o guárdalas en PDF.",
    icon: "facturas.svg",
  },
  {
    slug: "/presupuestos",
    title: "Presupuestos",
    desc: "Genera y/o modifica presupuestos. Envíalos por correo electrónico y/o guárdalos en PDF.",
    icon: "presupuestos.svg",
  },
  {
    slug: "/albaranes",
    title: "Albaranes",
    desc: "Genera y/o modifica albaranes. Envíalos por correo electrónico y/o guárdalos en PDF.",
    icon: "albaranes.svg",
  },
  {
    slug: "/clientes",
    title: "Clientes",
    desc: "Crea una lista de clientes. Después podrás usarlos en tus facturas, presupuestos y/o albaranes.",
    icon: "clientes.svg",
  },
  {
    slug: "/productos-servicios",
    title: "Productos y servicios",
    desc: "Crea una lista de productos/servicios. Podrás usarlos en tus facturas, presupuestos y/o albaranes.",
    icon: "productos-servicios.svg",
  },
  {
    slug: "/proveedores",
    title: "Proveedores",
    desc: "Crea una lista de proveedores. Así los tendrás su información de contacto siempre a mano.",
    icon: "proveedores.svg",
  },
];

export const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
