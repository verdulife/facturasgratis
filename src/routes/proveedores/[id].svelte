<script>
  import { stores, goto } from "@sapper/app";
  import { providers, userData } from "../../lib/stores";

  const { page } = stores();
  let providerData = $providers.filter((provider) => provider._id === $page.params.id)[0];
  let action = "";

  function deleteProvider() {
    const check = confirm("¿Borrar definitivamente?");

    if (!check) return;

    $providers.splice($providers.indexOf(providerData), 1);
    $providers = $providers;
    $userData._updated = new Date();
    action = "";

    goto("/proveedores");
  }

  function evalAction() {
    if (!action) return;
    if (action === "delete") deleteProvider();
  }

  function pushProvider() {
    $providers = $providers.map((provider) => {
      if (provider._id === providerData._id) return (provider = providerData);
      else return provider;
    });

    $userData._updated = new Date();
    alert("✔ Datos guardados correctamente");
  }
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
  <title>Editar proveedor | Facturasgratis</title>
</svelte:head>

<div class="scroll">
  {#if providerData}
    <section class="header col fcenter xfill">
      <img src="/proveedores.svg" alt="Proveedores" />
      <h1>{providerData.legal_name}</h1>
      <p>
        {providerData.legal_id}
      </p>

      <div class="io-wrapper row jcenter xfill">
        <select class="out semi" bind:value={action} on:change={evalAction}>
          <option value="">ACCIONES</option>
          <option value="delete">BORRAR</option>
        </select>
      </div>

      <a href="/proveedores" class="btn outwhite semi">VOLVER</a>
    </section>

    <form class="provider-data col acenter xfill" on:submit|preventDefault={pushProvider}>
      <div class="box round col xfill">
        <h2>Datos del proveedor</h2>
        <p class="notice">Genera proveedores para tener sus datos a mano cuando los necesites.</p>

        <div class="input-wrapper col xfill">
          <label for="legal_name">NOMBRE FISCAL</label>
          <input type="text" id="legal_name" bind:value={providerData.legal_name} class="xfill" required />
        </div>

        <div class="row xfill">
          <div class="input-wrapper col xhalf">
            <label for="legal_id">CIF/NIF</label>
            <input type="text" id="legal_id" bind:value={providerData.legal_id} class="xfill" required />
          </div>

          <div class="input-wrapper col xhalf">
            <label for="contact">Conacto</label>
            <input type="text" id="contact" bind:value={providerData.contact} class="xfill" required />
          </div>
        </div>

        <div class="row xfill">
          <div class="input-wrapper col xhalf">
            <label for="address">DIRECCION FISCAL</label>
            <input type="text" id="address" bind:value={providerData.address} class="xfill" required />
          </div>

          <div class="col xhalf">
            <label for="cp">Código postal</label>
            <input type="text" id="cp" bind:value={providerData.cp} class="xfill" required />
          </div>
        </div>

        <div class="row xfill">
          <div class="input-wrapper col xhalf">
            <label for="city">POBLACIÓN</label>
            <input type="text" id="city" bind:value={providerData.city} class="xfill" required />
          </div>

          <div class="input-wrapper col xhalf">
            <label for="country">País</label>
            <input type="text" id="country" bind:value={providerData.country} class="xfill" required />
          </div>
        </div>
      </div>

      <div class="last-row row jcenter xfill">
        <button class="succ semi">GUARDAR CAMBIOS</button>
        <a href="/proveedores" class="btn out semi">ATRAS</a>
      </div>
    </form>
  {/if}
</div>

<style lang="scss">
  .header {
    background: linear-gradient(45deg, $pri 50%, $sec);
    text-align: center;
    color: $white;
    padding: 60px;

    @media (max-width: $mobile) {
      padding: 40px 20px;
    }

    img {
      width: 100px;
      margin-bottom: 20px;
    }

    h1 {
      max-width: 900px;
      font-size: 4vh;
      line-height: 1;
      margin-bottom: 10px;
    }

    p {
      max-width: 900px;
      font-size: 18px;
      color: $sec;
      margin-bottom: 40px;

      @media (max-width: $mobile) {
        font-size: 14px;
      }
    }

    .io-wrapper {
      font-size: 12px;

      select {
        background: $white;
        text-align-last: center;
        border-width: 2px;
      }
    }

    a.btn {
      font-size: 12px;
    }
  }

  .provider-data {
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

  .last-row {
    margin-top: 20px;
  }

  button,
  a.btn,
  select {
    margin: 5px;

    @media (max-width: $mobile) {
      width: 70%;
      max-width: 210px;
      text-align: center;
    }
  }
</style>
