<script>
  import { transition_out } from "svelte/internal";

  const tools = [
    {
      slug: "/facturas",
      title: "Facturas",
    },
    {
      slug: "/presupuestos",
      title: "Presupuetos",
    },
    {
      slug: "/albaranes",
      title: "Albaranes",
    },
    {
      slug: "/clientes",
      title: "Clientes",
    },
    {
      slug: "/proveedores",
      title: "Proveedores",
    },
    {
      slug: "/productos-servicios",
      title: "Productos/Servicios",
    },
  ];
</script>

<svelte:head>
  <title>Facturas gratis | Inicio</title>
</svelte:head>

<section class="header row fcenter xfill">
  <h1>Herramientas online para facturación y presupuestos</h1>
  <p>Herramientas online y completamente gratuitas para generar, enviar, rectificar y enlistar facturas, presupuestos, albaranes, clientes, proveedores y productos/servicios. No se necesita instalación.</p>
</section>

<ul class="tools row jcenter xfill">
  {#each tools as tool}
    <li class="box round col fcenter">
      <a href={tool.slug}>
        <h2>{tool.title}</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  .header {
    background: linear-gradient(45deg, $pri 50%, $sec);
    text-align: center;
    color: $white;
    padding: 80px;

    h1 {
      max-width: 900px;
      font-size: 3vw;
      line-height: 1;
      margin-bottom: 40px;
    }

    p {
      max-width: 900px;
      font-size: 18px;
      color: $sec;
    }
  }

  .tools {
    padding: 40px;

    li {
      cursor: pointer;
      width: 25%;
      min-width: 250px;
      margin: 5px;
      transition: 200ms;

      &:hover {
        background: $border;
      }

      h2 {
        margin-bottom: 10px;
      }
    }
  }
</style>
