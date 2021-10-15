<script>
  import { userData, proforma_bills } from "../../lib/stores";
  import { tools, months } from "../../lib/utils";
  import { sortByNumber, roundWithTwoDecimals, numerationFormat } from "../../lib/functions";
  import { proformas } from "../../lib/metadata";

  let billsData = [...$proforma_bills];
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

  billsData.sort(sortByNumber);

  const years = () => {
    let yearsList = [];

    for (let y = 0; y < billsData.length; y++) {
      if (!yearsList.includes(billsData[y].date.year)) yearsList.push(billsData[y].date.year);
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
  <title>{proformas.title}</title>
  <meta name="description" content={proformas.description} />
  <meta name="keywords" content={proformas.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={proformas.url} />
  <meta property="og:title" content={proformas.title} />
  <meta property="og:description" content={proformas.description} />
  <meta property="og:image" content={proformas.image} />
  <meta property="og:image:secure_url" content={proformas.image} />
  <meta property="og:image:type" content="image/jpeg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={proformas.url} />
  <meta name="twitter:title" content={proformas.title} />
  <meta name="twitter:description" content={proformas.description} />
  <meta name="twitter:image" content={proformas.image} />
</svelte:head>

<div class="scroll">
  <article class="header col fcenter xfill">
    <img src="/proformas.svg" alt="Proformas" />
    <h1>{tools[3].title}</h1>
    <p>{tools[3].desc}</p>

    <a href="/" class="btn outwhite semi">VOLVER</a>
  </article>

  {#if $userData.legal_name !== undefined}
    <div class="list-filter col acenter xfill">
      {#if billsData.length <= 0}
        <a class="btn succ semi" href="/proformas/nueva">CREA TU PRIMERA PROFORMA</a>
      {:else}
        <a class="new-btn btn succ semi" href="/proformas/nueva">NUEVA PROFORMA</a>

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

    <ul class="bill-list col acenter xfill">
      {#if filteredBills.length <= 0 && billsData.length > 0}
        <p>No hay coincidencias</p>
      {/if}

      {#each filteredBills as bill}
        <li class="box round col xfill">
          <a href="/proformas/{bill._id}" class="col xfill">
            <div class="title row xfill">
              <div class="col grow">
                <h4>{bill.client.legal_name}</h4>
                <p>{bill.client.legal_id}</p>
              </div>

              <h3>{roundWithTwoDecimals(bill.totals.total).toFixed(2)}{$userData.currency}</h3>
            </div>

            <div class="info row xfill">
              <p>
                <b>{numerationFormat(bill.number, bill.date.year)}</b> | Fecha:
                <b>{bill.date.day}/{bill.date.month}/{bill.date.year}</b>
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
      <p>Para poder empezar a generar proformas, primero tienes que rellenar tus datos</p>
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
      margin-bottom: 40px;

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
  }

  .first {
    text-align: center;
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
