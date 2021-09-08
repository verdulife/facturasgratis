<script>
  const tools = [
    {
      slug: "/facturas",
      title: "Facturas",
      desc: "Genera y/o modifica facturas. Envíalas por correo electrónico y/o guárdalas en PDF.",
      icon: "facturas.svg",
    },
    {
      slug: "/presupuestos",
      title: "Presupuetos",
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
      title: "Productos/Servicios",
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
</script>

<svelte:head>
  <title>Facturas gratis | Inicio</title>
</svelte:head>

<div class="scroll">
  <section class="header row fcenter xfill">
    <h1>Herramientas online para facturación y presupuestos</h1>
    <p>Herramientas online y completamente gratuitas para generar, enviar, rectificar y enlistar facturas, presupuestos, albaranes, clientes, proveedores y productos/servicios. No se necesita instalación.</p>
  </section>

  <ul class="tools row jcenter xfill">
    {#each tools as tool}
      <li class="box round col acenter">
        <a class="fill" href={tool.slug}>
          <div class="icon">
            <img src={tool.icon} alt={tool.title} />
          </div>

          <h2 class="nowrap xfill">{tool.title}</h2>
          <p>{tool.desc}</p>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .header {
    background: linear-gradient(45deg, $pri 50%, $sec);
    text-align: center;
    color: $white;
    padding: 80px;

    @media (max-width: $mobile) {
      padding: 40px;
    }

    h1 {
      max-width: 900px;
      font-size: 5vh;
      line-height: 1;
      margin-bottom: 40px;

      @media (max-width: $mobile) {
        margin-bottom: 20px;
      }
    }

    p {
      max-width: 900px;
      font-size: 18px;
      color: $sec;

      @media (max-width: $mobile) {
        font-size: 14px;
      }
    }
  }

  .tools {
    padding: 40px;

    @media (max-width: $mobile) {
      padding: 10px;
    }

    li {
      cursor: pointer;
      width: 25%;
      min-width: 250px;
      height: 210px;
      margin: 5px;
      padding: 20px;
      transition: 200ms;

      @media (max-width: $mobile) {
        width: calc(50% - 10px);
        min-width: 0;
      }

      &:hover {
        background: $border;
      }

      .icon {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;

        @media (max-width: $mobile) {
          width: 30px;
          height: 30px;
        }
      }

      h2 {
        margin-bottom: 10px;

        @media (max-width: $mobile) {
          font-size: 18px;
        }
      }

      p {
        @media (max-width: $mobile) {
          font-size: 12px;
        }
      }
    }
  }
</style>
