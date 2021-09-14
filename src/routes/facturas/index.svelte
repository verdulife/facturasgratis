<script>
  import { userData, bills } from "../../stores";
  import { tools, months } from "../../ui/utils";

  let billsData = [...$bills];
  let searchTerm = "";
  let filterMonth = "";
  let filterYear = "";

  $: filteredBills = billsData.filter((bill) => {
    const term = searchTerm.toLowerCase();
    const byName = bill.client.legal_name.toLowerCase();
    const byId = bill.client.legal_id.toLowerCase();

    return byName.indexOf(term) !== -1 || byId.indexOf(term) !== -1;
  });

  function sortByNumber(a, b) {
    if (a.number < b.number) {
      return -1;
    }
    if (a.number > b.number) {
      return 1;
    }
    return 0;
  }
  $bills.sort(sortByNumber);

  const currentYear = new Date().getFullYear();
  const years = () => {
    const lowestYear = $bills.reduce((acc, curr) => (curr.date.year < acc ? curr.date.year : acc), currentYear);
    let yearsList = [];

    for (let y = lowestYear; y <= currentYear; y++) {
      yearsList.push(y);
    }

    return yearsList;
  };
  filterYear = currentYear;
</script>

<svelte:head>
  <title>Tus facturas | Facturas gratis</title>
  <meta property="og:title" content="Tus facturas | Facturas gratis" />
  <meta property="og:site_name" content="Facturas gratis" />

  <meta
    name="description"
    content="Herramientas online y completamente gratuitas para generar, enviar, rectificar y listar facturas, presupuestos, albaranes,
  clientes, proveedores y productos/servicios. No se necesita instalación."
  />
  <meta
    property="og:description"
    content="Herramientas online y completamente gratuitas para generar, enviar, rectificar y listar facturas, presupuestos, albaranes,
  clientes, proveedores y productos/servicios. No se necesita instalación."
  />
</svelte:head>

<div class="scroll">
  <section class="header col fcenter xfill">
    <h1>{tools[0].title}</h1>
    <p>{tools[0].desc}</p>
  </section>

  {#if $userData.legal_name !== undefined}
    <div class="list-filter col acenter xfill">
      {#if billsData.length <= 0}
        <a class="btn succ semi" href="/facturas/nueva">CREA TU PRIMERA FACTURA</a>
      {:else}
        <a class="new-btn btn succ semi" href="/facturas/nueva">NUEVA FACTURA</a>

        <div class="row xfill">
          <input type="text" class="out grow" bind:value={searchTerm} placeholder="Buscar por nombre o CIF/NIF" />

          <select class="out" bind:value={filterMonth}>
            <option value="">Todos los meses</option>
            {#each months as month, i}
              <option value={i}>{month}</option>
            {/each}
          </select>

          <select class="out" bind:value={filterYear}>
            <option value="">Todos los años</option>
            {#each years() as year}
              <option value={year}>{year}</option>
            {/each}
          </select>
        </div>
      {/if}
    </div>

    <ul class="bill-list col acenter xfill">
      {#each filteredBills as bill}
        {#if filterMonth === "" ? true : filterMonth + 1 === bill.date.month}
          {#if filterYear === "" ? true : filterYear === bill.date.year}
            <a href="/facturas/{bill._id}" class="row xfill">
              <li class="box round row jbetween xfill">
                {bill.client.legal_name} <span>{bill.number}</span>
              </li>
            </a>
          {/if}
        {/if}
      {/each}
    </ul>
  {:else}
    <div class="first col acenter xfill">
      <h2>Primeros pasos</h2>
      <p>Para poder empezar a generar facturas, primero tienes que rellenar tus datos</p>
      <br />
      <a href="/ajustes" class="btn pri semi">RELLENAR DATOS</a>
    </div>
  {/if}
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

    h1 {
      max-width: 900px;
      font-size: 6vh;
      line-height: 1;
      margin-bottom: 20px;

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

  .new-btn {
    margin-bottom: 40px;
  }

  .list-filter,
  .bill-list {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    padding-bottom: 0px;

    @media (max-width: $mobile) {
      padding: 20px;
    }
  }

  .list-filter {
    select {
      @media (max-width: $mobile) {
        width: 50%;
      }
    }
  }

  .first {
    padding: 40px;

    a.btn.pri {
      color: $white !important;
    }
  }

  .bill-list {
    li {
      margin-bottom: 5px;
    }
  }
</style>
