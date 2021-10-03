<script>
  import { stores, goto } from "@sapper/app";
  import { clients, userData } from "../../lib/stores";

  const { page } = stores();
  let clientData = $clients.filter((client) => client._id === $page.params.id)[0];
  let action = "";

  function generateBill() {
    action = "";
    goto(`/facturas/nueva?client=${encodeURIComponent(JSON.stringify(clientData))}`);
  }

  function generateBudget() {
    action = "";
    goto(`/presupuestos/nueva?client=${encodeURIComponent(JSON.stringify(clientData))}`);
  }

  function deleteClient() {
    const check = confirm("¿Borrar definitivamente?");

    if (!check) return;

    $clients.splice($clients.indexOf(clientData), 1);
    $clients = $clients;
    $userData._updated = new Date();
    action = "";

    goto("/clients");
  }

  function evalAction() {
    if (!action) return;
    if (action === "bill") generateBill();
    if (action === "budget") generateBudget();
    if (action === "delete") deleteClient();
  }

  function pushClient() {
    $clients = $clients.map((client) => {
      if (client._id === clientData._id) return (client = clientData);
      else return client;
    });

    $userData._updated = new Date();
    alert("✔ Datos guardados correctamente");
  }
</script>

<svelte:head>
  <title>Editar cliente | Facturas gratis</title>
  <meta property="og:title" content="Editar cliente | Facturas gratis" />
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
  {#if clientData}
    <section class="header col fcenter xfill">
      <img src="/clientes.svg" alt="Clientes" />
      <h1>{clientData.legal_name}</h1>
      <p>
        {clientData.legal_id}
      </p>

      <div class="io-wrapper row jcenter xfill">
        <select class="out semi" bind:value={action} on:change={evalAction}>
          <option value="">ACCIONES</option>
          <option value="bill">CREAR FACTURA</option>
          <option value="budget">CREAT PRESUPUESTO</option>
          <option value="delete">BORRAR</option>
        </select>
      </div>

      <a href="/clientes" class="btn outwhite semi">VOLVER</a>
    </section>

    <form class="client-data col acenter xfill" on:submit|preventDefault={pushClient}>
      <div class="box round col xfill">
        <h2>Datos del cliente</h2>
        <p class="notice">Genera clientes para cargar sus datos rapidamente en tus facturas, preuspuestos y albaranes.</p>

        <div class="input-wrapper col xfill">
          <label for="legal_name">NOMBRE FISCAL</label>
          <input type="text" id="leagal_name" bind:value={clientData.legal_name} class="xfill" required />
        </div>

        <div class="row xfill">
          <div class="input-wrapper col xhalf">
            <label for="legal_id">CIF/NIF</label>
            <input type="text" id="leagal_id" bind:value={clientData.legal_id} class="xfill" required />
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

      <div class="last-row row jcenter xfill">
        <button class="succ semi">GUARDAR CAMBIOS</button>
        <a href="/clientes" class="btn out semi">ATRAS</a>
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
