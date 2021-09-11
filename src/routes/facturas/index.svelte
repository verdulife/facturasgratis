<script>
  import { userData, bills } from "../../stores";
  import { tools, months } from "../../ui/utils";

  let searchTerm, filterMonth, filterYear;
  const currentYear = new Date().getFullYear();

  const years = () => {
    const lowestYear = $bills.reduce((acc, curr) => (curr.date.year < acc ? curr.date.year : acc), currentYear);
    let yearsList = [];

    for (let y = lowestYear; y <= currentYear; y++) {
      yearsList.push(y);
    }

    return yearsList;
  };

  filterYear = years().indexOf(currentYear);
</script>

<svelte:head>
  <title>Facturas gratis | Facturas</title>
</svelte:head>

<div class="scroll">
  <section class="header col fcenter xfill">
    <h1>{tools[0].title}</h1>
    <p>{tools[0].desc}</p>
  </section>

  {#if $userData.legal_name !== undefined}
    <div class="list-filter col acenter xfill">
      {#if $bills.length <= 0}
        <a class="btn succ semi" href="/facturas/nueva">CREA TU PRIMERA FACTURA</a>
      {:else}
        <a class="new-btn btn succ semi" href="/facturas/nueva">NUEVA FACTURA</a>

        <div class="row xfill">
          <input type="text" class="out grow" bind:value={searchTerm} placeholder="Buscar factura" />

          <select class="out" bind:value={filterMonth}>
            <option value="">Todos los meses</option>
            {#each months as month, i}
              <option value={i}>{month}</option>
            {/each}
          </select>

          <select class="out" bind:value={filterYear}>
            <option value="">Todos los años</option>
            {#each years() as year, i}
              <option value={i}>{year}</option>
            {/each}
          </select>
        </div>
      {/if}
    </div>

    <ul class="bill-list col acenter xfill">
      {#each $bills as bill}
        <li class="box round row jbetween xfill">{bill.client.legal_name} <span>{bill.number}</span></li>
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
</style>
