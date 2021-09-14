<script>
  import { tools } from "../ui/utils";
</script>

<svelte:head>
  <title>Herramientas online | Facturas gratis</title>
  <meta property="og:title" content="Herramientas online | Facturas gratis" />
  <meta property="og:site_name" content="Facturas gratis" />

  <meta
    name="description"
    content="Herramientas online y completamente gratuitas para generar, enviar, rectificar y listar facturas, presupuestos, albaranes,
  clientes, proveedores y productos/servicios."
  />
  <meta
    property="og:description"
    content="Herramientas online y completamente gratuitas para generar, enviar, rectificar y listar facturas, presupuestos, albaranes,
  clientes, proveedores y productos/servicios."
  />
</svelte:head>

<div class="scroll">
  <section class="header col fcenter xfill">
    <h1>Herramientas online para gestionar tu negocio</h1>
    <p>
      Herramientas online y completamente gratuitas para generar, enviar, rectificar y listar facturas, presupuestos,
      albaranes, clientes, proveedores y productos/servicios. No se necesita instalación.
    </p>
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
      font-size: 6vh;
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
    align-items: stretch;
    padding: 40px;

    @media (max-width: $mobile) {
      padding: 10px;
    }

    li {
      cursor: pointer;
      width: 25%;
      min-width: 250px;
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
