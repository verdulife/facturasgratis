<script>
  import { userData, budgets } from "../../lib/stores";
  import { tools, months } from "../../lib/utils";
  import { sortByNumber, roundWithTwoDecimals, numerationFormat } from "../../lib/functions";

  let budgetsData = [...$budgets];
  let searchTerm = "";
  let filterMonth = "";
  let filterYear = "";

  $: filteredBudgets = budgetsData.filter((budget) => {
    const term = searchTerm.toLowerCase();
    const byName = budget.client.legal_name.toLowerCase();
    const byId = budget.client.legal_id.toLowerCase();

    if (byName.indexOf(term) !== -1 || byId.indexOf(term) !== -1) {
      if (filterMonth === "" ? true : filterMonth + 1 === budget.date.month) {
        if (filterYear === "" ? true : filterYear === budget.date.year) {
          return true;
        }
      }
    }

    return false;
  });

  budgetsData.sort(sortByNumber);

  const years = () => {
    let yearsList = [];

    for (let y = 0; y < budgetsData.length; y++) {
      if (!yearsList.includes(budgetsData[y].date.year)) yearsList.push(budgetsData[y].date.year);
    }

    return yearsList;
  };

  function clearFilters() {
    searchTerm = "";
    filterMonth = "";
    filterYear = Math.max(...years());
  }
</script>

<svelte:head>
  <title>Presupuestos | Facturas gratis</title>
  <meta property="og:title" content="Presupuestos | Facturas gratis" />
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
    <img src="/presupuestos.svg" alt="Presupuestos" />
    <h1>{tools[1].title}</h1>
    <p>{tools[1].desc}</p>
  </section>

  {#if $userData.legal_name !== undefined}
    <div class="list-filter col acenter xfill">
      {#if budgetsData.length <= 0}
        <a class="btn succ semi" href="/presupuestos/nueva">CREA TU PRIMER PRESUPUESTO</a>
      {:else}
        <a class="new-btn btn succ semi" href="/presupuestos/nueva">NUEVO PRESUPUESTO</a>

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

          <div class="clear-btn row fcenter" on:click={clearFilters}>🗑</div>
        </div>
      {/if}
    </div>

    <ul class="budget-list col acenter xfill">
      {#if filteredBudgets.length <= 0 && budgetsData.length > 0}
        <p>No hay coincidencias</p>
      {/if}

      {#each filteredBudgets as budget}
        <li class="box round col xfill">
          <a href="/presupuestos/{budget._id}" class="col xfill">
            <div class="title row xfill">
              <div class="col grow">
                <h4>{budget.client.legal_name}</h4>
                <p>{budget.client.legal_id}</p>
              </div>

              <h3>{roundWithTwoDecimals(budget.totals.total).toFixed(2)}{$userData.currency}</h3>
            </div>

            <div class="info row xfill">
              <p>
                <b>{numerationFormat(budget.number, budget.date.year)}</b> | Fecha: <b>{budget.date.day}/{budget.date.month}/{budget.date.year}</b>
              </p>
            </div>
          </a>
        </li>
      {/each}
      <div class="fix-bottom row xfill" />
    </ul>
  {:else}
    <div class="first col acenter xfill">
      <h2>Primeros pasos</h2>
      <p>Para poder empezar a generar presupuestos, primero tienes que rellenar tus datos</p>
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

    img {
      width: 100px;
      margin-bottom: 20px;
    }

    h1 {
      max-width: 900px;
      font-size: 5vh;
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
  .budget-list {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    padding-bottom: 0px;

    @media (max-width: $mobile) {
      padding: 20px;
    }
  }

  .filter-wrapper {
    align-items: stretch;

    input,
    select {
      background: $white;
    }

    select {
      @media (max-width: $mobile) {
        width: 50%;
      }
    }

    .clear-btn {
      cursor: pointer;
      width: 48px;
      background: $border;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      color: $base;
      border: 1px solid $border;
      user-select: none;
      -webkit-user-drag: none;
    }

    @media (max-width: $mobile) {
      input {
        width: 100%;
      }

      select {
        width: calc(50% - 24px);
      }
    }
  }

  .first {
    text-align: center;
    padding: 40px;

    a.btn.pri {
      color: $white !important;
    }
  }

  .budget-list {
    li {
      padding: 0;
      margin-bottom: 5px;
      transition: 200ms;

      &:nth-of-type(even) {
        background: $bg;
      }

      &:hover {
        background: lighten($border, 10%);
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
