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

    if (byName.indexOf(term) !== -1 || byId.indexOf(term) !== -1) {
      if (filterMonth === "" ? true : filterMonth + 1 === bill.date.month) {
        if (filterYear === "" ? true : filterYear === bill.date.year) {
          return true;
        }
      }
    }

    return false;
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

  const years = () => {
    let yearsList = [];

    for (let y = 0; y < billsData.length; y++) {
      if (!yearsList.includes(billsData[y].date.year)) yearsList.push(billsData[y].date.year);
    }

    return yearsList;
  };
  filterYear = Math.max(years());
  
  function clearFilters() {
    searchTerm = "";
    filterMonth = "";
    filterYear = Math.max(years());
  }
</script>

<svelte:head>
  <title>Tus facturas | Facturas gratis</title>
  <meta property="og:title" content="Tus facturas | Facturas gratis" />
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
    <h1>{tools[0].title}</h1>
    <p>{tools[0].desc}</p>
  </section>

  {#if $userData.legal_name !== undefined}
    <div class="list-filter col acenter xfill">
      {#if billsData.length <= 0}
        <a class="btn succ semi" href="/facturas/nueva">CREA TU PRIMERA FACTURA</a>
      {:else}
        <a class="new-btn btn succ semi" href="/facturas/nueva">NUEVA FACTURA</a>

        <div class="filter-wrapper row xfill">
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

          <div class="clear-btn row acenter" on:click={clearFilters}>LIMPIAR FILTROS</div>
        </div>
      {/if}
    </div>

    <ul class="bill-list col acenter xfill">
      {#if filteredBills.length <= 0}
        <p>No hay coincidencias</p>
      {/if}

      {#each filteredBills as bill}
        <li class="box round col xfill">
          <a href="/facturas/{bill._id}" class="col xfill">
            <div class="title row xfill">
              <div class="col grow">
                <h4>{bill.client.legal_name}</h4>
                <p>{bill.client.legal_id}</p>
              </div>

              <h3>{bill.totals.total.toFixed(2)}€</h3>
            </div>

            <div class="info row jbetween xfill">
              <p>
                Nº de factura: <b>{bill.number}</b> | Fecha: <b>{bill.date.day}/{bill.date.month}/{bill.date.year}</b>
              </p>
              <p><b>{bill.items.length}</b> conceptos</p>
            </div>
          </a>
        </li>
      {/each}
      <div class="fix-bottom row xfill" />
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
    .filter-wrapper {
      align-items: stretch;

      select {
        @media (max-width: $mobile) {
          width: 50%;
        }
      }
    }

    .clear-btn {
      cursor: pointer;
      background: $border;
      font-size: 12px;
      font-weight: bold;
      color: $base;
      border: 1px solid $border;
      padding: 1em 2em;
      user-select: none;
      -webkit-user-drag: none;
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
      padding: 0;
      margin-bottom: 5px;
      transition: 200ms;

      &:nth-of-type(even) {
        background: lighten($border, 5%);
      }

      &:hover {
        background: $border;
      }

      a {
        padding: 1em;

        .title {
          margin-bottom: 20px;
        }

        .info {
          border-top: 1px solid $border;
          padding-top: 10px;
        }
      }
    }

    .fix-bottom {
      height: 40px;
      pointer-events: none;
      user-select: none;
    }
  }
</style>
