<script>
  import { goto } from "@sapper/app";
  import { clients, userData } from "../../lib/stores";
  import { nueva_cliente } from "../../lib/metadata";

  let clientData = {};

  function pushClient() {
    clientData._id = Date.now().toString();
    $clients = [...$clients, clientData];

    $userData._updated = new Date();
    goto("/clientes");
  }
</script>

<svelte:head>
  <title>{nueva_cliente.title}</title>
  <meta name="description" content={nueva_cliente.description} />
  <meta name="keywords" content={nueva_cliente.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={nueva_cliente.url} />
  <meta property="og:title" content={nueva_cliente.title} />
  <meta property="og:description" content={nueva_cliente.description} />
  <meta property="og:image" content={nueva_cliente.image} />
  <meta property="og:image:secure_url" content={nueva_cliente.image} />
  <meta property="og:image:type" content="image/jpeg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={nueva_cliente.url} />
  <meta name="twitter:title" content={nueva_cliente.title} />
  <meta name="twitter:description" content={nueva_cliente.description} />
  <meta name="twitter:image" content={nueva_cliente.image} />
</svelte:head>

<div class="scroll">
  <article class="header col fcenter xfill">
    <img src="/clientes.svg" alt="Clientes" />
    <h1>Nuevo cliente</h1>
    <a href="/clientes" class="btn outwhite semi">VOLVER A CLIENTES</a>
  </article>

  <form class="client-data col acenter xfill" on:submit|preventDefault={pushClient}>
    <div class="box round col xfill">
      <h2>Datos del cliente</h2>
      <p class="notice">Genera clientes para cargar sus datos rapidamente en tus facturas, preuspuestos y albaranes.</p>

      <div class="input-wrapper col xfill">
        <label for="legal_name">NOMBRE FISCAL</label>
        <input type="text" id="legal_name" bind:value={clientData.legal_name} class="xfill" required />
      </div>

      <div class="row xfill">
        <div class="input-wrapper col xhalf">
          <label for="legal_id">CIF/NIF</label>
          <input type="text" id="legal_id" bind:value={clientData.legal_id} class="xfill" required />
        </div>

        <div class="input-wrapper col xhalf">
          <label for="contact">Conacto</label>
          <input type="text" id="contact" bind:value={clientData.contact} class="xfill" required />
        </div>
      </div>

      <div class="row xfill">
        <div class="input-wrapper col xhalf">
          <label for="address">DIRECCION FISCAL</label>
          <input type="text" id="address" bind:value={clientData.address} class="xfill" required />
        </div>

        <div class="col xhalf">
          <label for="cp">Código postal</label>
          <input type="text" id="cp" bind:value={clientData.cp} class="xfill" required />
        </div>
      </div>

      <div class="row xfill">
        <div class="input-wrapper col xhalf">
          <label for="city">POBLACIÓN</label>
          <input type="text" id="city" bind:value={clientData.city} class="xfill" required />
        </div>

        <div class="input-wrapper col xhalf">
          <label for="country">País</label>
          <input type="text" id="country" bind:value={clientData.country} class="xfill" required />
        </div>
      </div>
    </div>

    <div class="row jcenter xfill">
      <button class="succ semi">GENERAR CLIENTE</button>
      <a href="/clientes" class="btn out semi">CANCELAR</a>
    </div>
  </form>
</div>

<style lang="scss">
  .header {
    background: linear-gradient(45deg, $pri 50%, $sec);
    text-align: center;
    color: $white;
    padding: 60px;

    @media (max-width: $mobile) {
      padding: 40px;
    }

    img {
      width: 100px;
      margin-bottom: 20px;
    }

    h1 {
      max-width: 900px;
      font-size: 5vh;
      line-height: 1;
      margin-bottom: 20px;
    }

    a.btn {
      font-size: 12px;
    }
  }

  .client-data {
    padding: 60px;

    @media (max-width: $mobile) {
      padding: 20px 10px;
    }
  }

  .box {
    max-width: 900px;
    margin-bottom: 40px;
    padding: 20px;

    @media (max-width: $mobile) {
      margin-bottom: 10px;
    }

    .notice {
      font-size: 14px;
      margin-bottom: 40px;

      @media (max-width: $mobile) {
        font-size: 12px;
        margin-bottom: 30px;
      }
    }

    .input-wrapper {
      margin-bottom: 30px;

      @media (max-width: $mobile) {
        margin-bottom: 20px;
      }
    }

    label {
      text-transform: uppercase;
      color: $pri;
      font-size: 12px;
      padding: 0 15px;
    }

    input {
      font-size: 16px;
      border-bottom: 1px solid $sec;
      border-radius: 0;

      &:focus {
        border-color: $pri;
      }

      @media (max-width: $mobile) {
        font-size: 14px;
      }
    }
  }

  button {
    margin-right: 10px;

    @media (max-width: $mobile) {
      width: 70%;
      margin-right: 0;
      margin-bottom: 10px;
    }
  }

  a.btn {
    @media (max-width: $mobile) {
      width: 70%;
      text-align: center;
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
</style>
