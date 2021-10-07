<script>
  import { tools } from "../lib/utils";
  import { home } from "../lib/metadata";
  import { userData } from "../lib/stores";
  import { tips } from "../lib/tips";
  import { shuffleArray } from "../lib/functions";

  shuffleArray(tips);
</script>

<svelte:head>
  <title>{home.title}</title>
  <meta name="description" content={home.description} />
  <meta name="keywords" content={home.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={home.url} />
  <meta property="og:title" content={home.title} />
  <meta property="og:description" content={home.description} />
  <meta property="og:image:secure_url" content={home.image} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={home.url} />
  <meta name="twitter:title" content={home.title} />
  <meta name="twitter:description" content={home.description} />
  <meta name="twitter:image" content={home.image} />
</svelte:head>

<div class="scroll">
  <section class="header col fcenter xfill">
    <h1>Herramientas gratuitas para autónomos y pymes</h1>
    <p>
      La manera más sencilla y rápida de crear, modificar y gestionar tus facturas, presupuestos, albaranes, clientes,
      proveedores, productos y servicios. Si eres <b>autónomo</b> o tienes una
      <b>pequeña empresa</b> esta es tu herramienta. Empieza ahora, sin registrarte y gratis.
    </p>

    {#if process.browser && Object.keys($userData).length <= 0}
      <h2>Primeros pasos</h2>
      <p>
        Para empezar a trabajar con <b>facturasgratis</b>, el primer paso es rellenar tus datos.
      </p>
    {/if}

    <a href="/ajustes" class="btn succ semi">TUS DATOS</a>
  </section>

  <ul class="tools row jcenter xfill">
    {#each tools as tool}
      <li class="box round col acenter">
        <a class="fill" href={tool.slug}>
          <div class="icon">
            <img width="50" height="50" src={tool.icon} alt={tool.title} />
          </div>

          <h2 class="xfill">{tool.title}</h2>
          <p>{tool.desc}</p>

          {#if tool.soon}
            <div class="label-tag">PRONTO</div>
          {/if}
        </a>
      </li>
    {/each}
  </ul>

  <div class="tips col acenter xfikk">
    <h2>Consejos para hacer tus facturas</h2>
    <p>
      Aquí encontraras algunos de los consejos que te ayudaran a hacer mejores facturas, evitar problemas comúnes y
      organizar mejor tu contabilidad.
    </p>

    <div class="grid">
      {#each tips as tip}
        <div class="box round col">
          <h3>{tip.title}</h3>
          <p>{@html tip.description}</p>
        </div>
      {/each}
    </div>
  </div>
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
      font-size: 3vw;
      line-height: 1.2;
      margin-bottom: 40px;

      @media (max-width: $mobile) {
        font-size: 5vh;
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

    a.btn {
      min-width: 200px;
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
      position: relative;
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
        margin-bottom: 10px;
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

      .label-tag {
        position: absolute;
        top: 10px;
        right: -10px;
        background: $error;
        font-size: 10px;
        text-transform: uppercase;
        color: $white;
        border-radius: 5px;
        padding: 2px 5px;
      }
    }
  }

  .tips {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    padding-bottom: 100px;

    h2 {
      font-size: 2vw;
      text-align: center;
      margin-bottom: 10px;

      @media (max-width: $mobile) {
        font-size: 4vh;
      }
    }

    p {
      text-align: center;
      margin-bottom: 40px;
    }

    .grid {
      column-count: 3;
      column-gap: 20px;

      @media (max-width: $mobile) {
        column-count: 1;
      }

      .box {
        -webkit-column-break-inside: avoid;
        page-break-inside: avoid;
        break-inside: avoid;
        margin-bottom: 20px;
        padding-top: 30px;
        padding-bottom: 30px;

        h3 {
          margin-bottom: 10px;
        }

        p {
          text-align: left;
          margin: 0;
        }
      }
    }
  }
</style>
