<script>
  import { tools } from "../lib/utils";
  import { userData } from "../lib/stores";
</script>

<svelte:head>
  <title>Herramientas online | Facturas gratis</title>
  <meta property="og:title" content="Herramientas online | Facturas gratis" />
  <meta property="og:site_name" content="Facturas gratis" />

  <meta
    name="description"
    content="Herramientas online gratuitas para generar, enviar, rectificar y listar facturas, presupuestos, albaranes,
  clientes, proveedores y productos/servicios."
  />
  <meta
    property="og:description"
    content="Herramientas online gratuitas para generar, enviar, rectificar y listar facturas, presupuestos, albaranes,
  clientes, proveedores y productos/servicios."
  />
</svelte:head>

<div class="scroll">
  <section class="header col fcenter xfill">
    <h1>Herramientas online para gestionar tu negocio</h1>
    <p>
      Herramientas online gratuitas para generar, enviar, rectificar y listar
      facturas, presupuestos, albaranes, clientes, proveedores y
      productos/servicios. No se necesita instalación.
    </p>

    {#if process.browser && Object.keys($userData).length <= 0}
      <h3>Primeros pasos</h3>
      <p>
        Para empezar a trabajar con <b>facturasgratis</b>, el primer paso es
        rellenar tus datos.
      </p>
      <a href="/ajustes" class="btn succ semi">RELLENAR DATOS</a>
    {/if}
  </section>

  <ul class="tools row jcenter xfill">
    {#each tools as tool}
      <li class="box round col acenter">
        <a class="fill" href={tool.slug}>
          <div class="icon">
            <img src={tool.icon} alt={tool.title} />
          </div>

          <h2 class="xfill">{tool.title}</h2>
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
    padding: 60px 40px;

    @media (max-width: $mobile) {
      padding: 40px 20px;
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
      margin-bottom: 20px;

      @media (max-width: $mobile) {
        font-size: 14px;
      }
    }
  }

  .tools {
    max-width: 1400px;
    margin: 0 auto;
    align-items: stretch;
    padding: 40px;
    padding-bottom: 100px;

    @media (max-width: $mobile) {
      padding: 40px 10px;
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
        background: lighten($border, 10%);
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
