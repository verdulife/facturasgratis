<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { bills, userData } from "../../stores";

  let billData = $bills.filter((bill) => bill._id === $page.params.id)[0];
  let lineData = {};

  async function downloadBill() {
    try {
      const req = await fetch("/print", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(billData),
      });

      if (!req.ok) throw await req.text();

      const res = await req.blob();
      const file = window.URL.createObjectURL(res);
      const link = document.createElement("a");

      link.href = file;
      link.download = `Factura_${billData.number}_${billData.client.legal_id}.pdf`;
      link.click();
    } catch (error) {
      console.log(error);
      alert("Algo ha salido mal. Vuelve a intentarlo");
    }
  }

  function generateDelivery() {
    console.log("Generating...");
  }

  function deleteBill() {
    const check = confirm("La numeracion de las otras facturas no se modificara. Recuerda usar la numeracion de esta factura en otra.\n\n¿Borrar definitivamente?");

    if (check) {
      $bills.splice($bills.indexOf(billData), 1);
      $bills = $bills;
      goto("/facturas");
    }
  }

  function pushLine() {
    if (Object.keys(lineData).length === 4) {
      billData.items = [...billData.items, lineData];
      lineData = {};
    }
  }

  function removeLine(i) {
    billData.items.splice(i, 1);
    billData.items = billData.items;
  }

  $: base_total = () => {
    const result = billData.items.reduce((acc, curr) => {
      const amount_price = curr.price * curr.amount;

      if (curr.dto > 0) {
        let dto_price = amount_price - (amount_price * curr.dto) / 100;
        return acc + dto_price;
      }

      return acc + amount_price;
    }, 0);

    return result;
  };

  $: iva_total = () => {
    const result = (base_total() * $userData.iva) / 100;
    return result;
  };

  $: ret_total = () => {
    if (!$userData.ret) return 0;

    const result = (base_total() * $userData.ret) / 100;
    return result;
  };

  $: bill_total = () => {
    const result = base_total() + iva_total() - ret_total();
    return result;
  };

  function pushBill() {
    if (billData.items.length > 0) {
      billData.totals = {
        base: base_total(),
        iva: iva_total(),
        ret: ret_total(),
        total: bill_total(),
      };

      $bills = $bills.map((bill) => {
        if (bill._id === billData._id) return (bill = billData);
        else return bill;
      });

      goto("/facturas");
    } else alert("⚠ No has añadido ningun concepto ⚠");
  }
</script>

<svelte:head>
  <title>Editar factura | Facturas gratis</title>
  <meta property="og:title" content="Editar factura | Facturas gratis" />
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
  {#if billData}
    <section class="header col fcenter xfill">
      <h1>Factura nº {billData.number}</h1>
      <p>
        Con fecha {billData.date.day}/{billData.date.month}/{billData.date.year}
      </p>

      <div class="io-wrapper row jcenter xfill">
        <button class="succ semi" on:click={downloadBill}>DESCARGAR FACTURA</button>
        <button class="link semi" on:click={generateDelivery}>GENERAR ALBARÁN</button>
        <button class="err semi" on:click={deleteBill}>ELIMINAR FACTURA</button>
      </div>
    </section>

    <form class="bill-data col acenter xfill" on:submit|preventDefault={pushBill}>
      <div class="box round col xfill">
        <h2>Datos de la factura</h2>
        <p class="notice">La numeración y fecha de la factura se rellenan automatiamente, pero puedes modificarlas.</p>

        <div class="row xfill">
          <div class="input-wrapper col grow">
            <label for="legal_name">Número</label>
            <input type="number" id="legal_name" class="xfill" bind:value={billData.number} required />
          </div>

          <div class="date-row row xhalf">
            <div class="input-wrapper date col">
              <label for="day">Día</label>
              <input type="number" id="day" min="1" max="31" class="xfill" bind:value={billData.date.day} required />
            </div>
            <div class="input-wrapper date col">
              <label for="month">Mes</label>
              <input type="number" id="month" min="1" max="12" class="xfill" bind:value={billData.date.month} required />
            </div>
            <div class="input-wrapper date col">
              <label for="year">Año</label>
              <input type="number" id="year" class="xfill" bind:value={billData.date.year} required />
            </div>
          </div>
        </div>
      </div>

      <div class="box round col xfill">
        <h2>Datos del cliente</h2>
        <p class="notice">Cada vez que añadas un cliente nuevo, este se guardara automatiamente.</p>

        <div class="input-wrapper col xfill">
          <label for="legal_name">NOMBRE FISCAL</label>
          <input type="text" id="leagal_name" bind:value={billData.client.legal_name} class="xfill" required />
        </div>

        <div class="row xfill">
          <div class="input-wrapper col xhalf">
            <label for="legal_id">CIF/NIF</label>
            <input type="text" id="leagal_id" bind:value={billData.client.legal_id} class="xfill" required />
          </div>

          <div class="input-wrapper col xhalf">
            <label for="contact">Conacto</label>
            <input type="text" id="contact" bind:value={billData.client.contact} class="xfill" required />
          </div>
        </div>

        <div class="row xfill">
          <div class="input-wrapper col xhalf">
            <label for="address">DIRECCION FISCAL</label>
            <input type="text" id="address" bind:value={billData.client.address} class="xfill" required />
          </div>

          <div class="col xhalf">
            <label for="cp">Código postal</label>
            <input type="text" id="cp" bind:value={billData.client.cp} class="xfill" required />
          </div>
        </div>

        <div class="row xfill">
          <div class="input-wrapper col xhalf">
            <label for="city">POBLACIÓN</label>
            <input type="text" id="city" bind:value={billData.client.city} class="xfill" required />
          </div>

          <div class="input-wrapper col xhalf">
            <label for="country">País</label>
            <input type="text" id="country" bind:value={billData.client.country} class="xfill" required />
          </div>
        </div>
      </div>

      <div class="box round col xfill">
        <h2>Conceptos</h2>
        <p class="notice">Cada vez que añadas un producto/servicio nuevo, este se guardara automatiamente.</p>

        {#if billData.items.length > 0}
          <ul class="bill-items col acenter xfill">
            {#each billData.items as item, i}
              <li class="line row xfill">
                <input type="number" id="amount" bind:value={item.amount} min="1" class="out" placeholder="CANT" />
                <input type="text" id="label" bind:value={item.label} class="out grow" placeholder="CONCEPTO" />
                <input type="number" id="dto" bind:value={item.dto} min="0" max="100" class="out" placeholder="DTO %" />
                <input type="number" id="price" bind:value={item.price} step="0.01" class="out" placeholder="UNIDAD €" />
                <input type="text" value="x" class="out" on:click={() => removeLine(i)} />
              </li>
            {/each}
          </ul>

          <h-div />

          <ul class="total-wrapper row jaround xfill">
            <li class="col acenter">
              <p class="label">Base imponible</p>
              <h3>{base_total().toFixed(2)}€</h3>
            </li>

            <li class="col acenter">
              <p class="label">IVA {$userData.iva}%</p>
              <h3>{iva_total().toFixed(2)}€</h3>
            </li>

            {#if $userData.ret}
              <li class="col acenter">
                <p class="label">IRPF {$userData.ret}%</p>
                <h3>-{ret_total().toFixed(2)}€</h3>
              </li>
            {/if}

            <li class="col acenter">
              <p class="label">Total</p>
              <h3>{bill_total().toFixed(2)}€</h3>
            </li>
          </ul>

          <h-div />
        {/if}

        <div class="new-line row xfill">
          <input type="number" id="amount" bind:value={lineData.amount} min="1" class="out" placeholder="CANT" />
          <input type="text" id="label" bind:value={lineData.label} class="out grow" placeholder="CONCEPTO" />
          <input type="number" id="dto" bind:value={lineData.dto} min="0" max="100" class="out" placeholder="DTO %" />
          <input type="number" id="price" bind:value={lineData.price} step="0.01" class="out" placeholder="UNIDAD €" />
        </div>

        <div class="line-btn pri xfill" on:click={pushLine}>AÑADIR PRODUCTO/SERVICIO</div>
      </div>

      <div class="row jcenter xfill">
        <button class="succ semi">GUARDAR CAMBIOS</button>
        <a href="/facturas" class="btn out semi">CANCELAR</a>
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
      padding: 40px;
    }

    h1 {
      max-width: 900px;
      font-size: 6vh;
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
    }
  }

  .bill-data {
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

    input,
    select {
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

    .date {
      width: calc(100% / 3);
    }

    .date-row {
      @media (max-width: $mobile) {
        width: 100%;
      }
    }

    .line {
      &:nth-of-type(even) {
        background: lighten($border, 5%);
        border-top: 5px solid $white;
        border-bottom: 5px solid $white;
      }

      input:nth-of-type(1),
      input:nth-of-type(3),
      input:nth-of-type(4) {
        width: 15%;

        @media (max-width: $mobile) {
          width: 25%;
        }
      }

      input:nth-of-type(5) {
        cursor: pointer;
        width: 50px;
        background: $sec;
        text-align: center;
        color: $pri;
        font-weight: bold;

        &:hover {
          background: $pri;
          color: $sec;
        }
      }

      input:nth-of-type(3),
      input:nth-of-type(4),
      input:nth-of-type(5) {
        @media (max-width: $mobile) {
          width: calc(100% / 3);
        }
      }
    }

    h-div {
      margin: 40px 0;
    }

    .new-line {
      input:nth-of-type(1),
      input:nth-of-type(3),
      input:nth-of-type(4) {
        width: 15%;

        @media (max-width: $mobile) {
          width: 25%;
        }
      }

      input:nth-of-type(3),
      input:nth-of-type(4) {
        @media (max-width: $mobile) {
          width: calc(100% / 2);
        }
      }
    }

    .line-btn {
      cursor: pointer;
      background: $sec;
      text-align: center;
      font-size: 12px;
      padding: 1.3em;
      transition: 200ms;

      &:hover {
        background: $pri;
        color: $white;
      }
    }
  }

  .total-wrapper {
    li {
      margin: 10px;
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
