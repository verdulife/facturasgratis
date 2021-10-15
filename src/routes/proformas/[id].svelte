<script>
  import { fade } from "svelte/transition";
  import { stores, goto } from "@sapper/app";
  import { proforma_bills, userData, products, budgets, bills } from "../../lib/stores";
  import { POST, roundWithTwoDecimals, numerationFormat, autoNumeration } from "../../lib/functions";
  import AutoComplete from "simple-svelte-autocomplete";

  const { page } = stores();
  let billData = $proforma_bills.filter((bill) => bill._id === $page.params.id)[0];
  let lineData = {};
  let loading = false;
  let action = "";

  async function downloadBill() {
    loading = true;

    try {
      const data = { ...billData };
      data.user = $userData;

      const req = await fetch("/print", POST(data));
      if (!req.ok) throw await req.text();

      const res = await req.blob();
      const blob = URL.createObjectURL(res);

      /* const frame = document.createElement("iframe");
      frame.src = blob;
      frame.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `;
      document.body.appendChild(frame); */

      const link = document.createElement("a");
      link.href = blob;
      link.download = `Proforma_${numerationFormat(data.number, data.date.year)}_${data.client.legal_name}.pdf`;
      link.click();

      setTimeout(() => {
        loading = false;
      }, 1000);
    } catch (error) {
      loading = false;

      console.log(error);
      alert("Algo ha salido mal. Vuelve a intentarlo");
      alert(error);
    }
  }

  function generateBill() {
    const check = confirm("¿Quieres crear una factura a partir de esta proforma?");

    if (!check) return;

    const number = autoNumeration($bills);
    const bill = { ...billData };
    const billExists = $bills.some((b) => b._id === bill._id);

    if (billExists) {
      const check = confirm("Ya se ha creado una factura a partir de esta proforma\n\n¿Quieres abrirla?");

      if (!check) return;

      return goto(`/facturas/${bill._id}`);
    }

    bill.number = number;

    $bills = [...$bills, bill];
    $userData._updated = new Date();
    action = "";

    goto(`/facturas/${bill._id}`);
  }

  function generateBudget() {
    const check = confirm("¿Quieres crear un presupuesto a partir de esta proforma?");

    if (!check) return;

    const number = autoNumeration($budgets);
    const budget = { ...billData };
    const budgetExists = $budgets.some((b) => b._id === budget._id);

    if (budgetExists) {
      const check = confirm("Ya se ha creado un presupuesto a partir de esta proforma\n\n¿Quieres abrirlo?");

      if (!check) return;

      return goto(`/presupuestos/${budget._id}`);
    }

    budget.number = number;

    $budgets = [...$budgets, budget];
    $userData._updated = new Date();
    action = "";

    goto(`/presupuestos/${budget._id}`);
  }

  function duplicateBill() {
    alert("🤝 Proximamente");
    action = "";
  }

  function deleteBill() {
    const check = confirm("La numeracion de las otras facturas no se modificara. Recuerda usar la numeracion de esta factura en otra.\n\n¿Borrar definitivamente?");

    if (check) {
      $proforma_bills.splice($proforma_bills.indexOf(billData), 1);
      $proforma_bills = $proforma_bills;
      $userData._updated = new Date();
      goto("/facturas");
    }

    action = "";
  }

  function evalAction() {
    if (!action) return;
    if (action === "bill") generateBill();
    if (action === "budget") generateBudget();
    if (action === "duplicate") duplicateBill();
    if (action === "delete") deleteBill();
  }

  function calcLineTotal(item) {
    const amount_price = item.price * item.amount;
    const dto_price = amount_price - (amount_price * item.dto) / 100;
    return `${roundWithTwoDecimals(dto_price).toFixed(2)}${$userData.currency}`;
  }

  function pushLine() {
    if (lineData.label === undefined) {
      alert("No hay un concepto definido para añadir la linea");
      return;
    }
    if (lineData.price === undefined) {
      alert("No hay un precio unitario definido para añadir la linea");
      return;
    }

    lineData.amount = lineData.amount || 1;
    lineData.dto = lineData.dto || 0;

    if (billData.items.some((item) => item.label === lineData.label)) {
      const check = confirm("Ya has añadido este producto/servicio.\n\n¿Quieres actualizarlo?");
      if (!check) {
        lineData = {};
        return;
      }

      billData.items = billData.items.map((item) => {
        if (item._id === lineData._id) return (item = lineData);
        else return item;
      });
    } else {
      billData.items = [...billData.items, lineData];
    }

    lineData = {};
  }

  function removeLine(i) {
    billData.items.splice(i, 1);
    billData.items = billData.items;
  }

  $: base_total = () => {
    const result = billData.items.reduce((acc, curr) => {
      const amount_price = curr.price * curr.amount;

      if (curr.dto > 0) {
        const dto_price = amount_price - (amount_price * curr.dto) / 100;
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

      $proforma_bills = $proforma_bills.map((bill) => {
        if (bill._id === billData._id) return (bill = billData);
        else return bill;
      });

      $userData._updated = new Date();
      alert("✔ Datos guardados correctamente");
    } else alert("⚠ No has añadido ningun concepto ⚠");
  }
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
  <title>Editar proforma | Facturasgratis</title>
</svelte:head>

<div class="scroll">
  {#if billData}
    <section class="header col fcenter xfill">
      <img src="/proformas.svg" alt="Proformas" />
      <h1>Proforma {numerationFormat(billData.number, billData.date.year)}</h1>
      <p>
        Con fecha {billData.date.day}/{billData.date.month}/{billData.date.year}
      </p>

      <div class="io-wrapper row jcenter xfill">
        <button class="succ semi" on:click={downloadBill}>DESCARGAR</button>

        <select class="out semi" bind:value={action} on:change={evalAction}>
          <option value="">OTRAS ACCIONES</option>
          <option value="bill">CREAR FACTURA</option>
          <option value="budget">CREAR PRESUPUESTO</option>
          <option value="duplicate">DUPLICAR</option>
          <option value="delete">BORRAR</option>
        </select>
      </div>

      <a href="/proformas" class="btn outwhite semi">VOLVER</a>

      {#if loading}
        <div class="outer-loader col fcenter fill" transition:fade={{ duration: 100 }}>
          <img src="/loader.svg" alt="Generando PDF" />
          <h3>Genarando PDF</h3>
        </div>
      {/if}
    </section>

    <form class="bill-data col acenter xfill" on:submit|preventDefault={pushBill}>
      <div class="box round col xfill">
        <h2>Datos de la proforma</h2>
        <p class="notice">Recuerda que cambiar la numeracion manualmente provocara que no sea correlativa.</p>

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
        <p class="notice">Los cambios que realices aqui, no se guardaran en la ficha del cliente</p>

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
        <p class="notice">Los cambios que realices aqui, no se guardaran en la ficha del producto/servicio</p>

        {#if billData.items.length > 0}
          <ul class="bill-items col acenter xfill">
            <li class="line row xfill">
              <span class="label row">CANT</span>
              <span class="label row grow">CONCEPTO</span>
              <span class="label row">DTO %</span>
              <span class="label row">PRECIO {$userData.currency}</span>
              <span class="label row">IMPORTE {$userData.currency}</span>
              <span class="label row">&nbsp;</span>
            </li>

            {#each billData.items as item, i}
              <li class="line row xfill">
                <input type="number" bind:value={item.amount} min="1" class="out" placeholder="CANT" />
                <input type="text" bind:value={item.label} class="out grow" placeholder="CONCEPTO" />
                <input type="number" bind:value={item.dto} min="0" max="100" class="out" placeholder="DTO %" />
                <input type="number" bind:value={item.price} step="0.01" class="out" placeholder="PRECIO {$userData.currency}" />
                <input type="text" value={calcLineTotal(item)} class="out" disabled />
                <input type="text" value="🗑" class="out" on:click={() => removeLine(i)} />
              </li>
            {/each}
          </ul>

          <h-div />

          <ul class="total-wrapper row jevenly xfill">
            <li class="col acenter">
              <p class="label">Base</p>
              <h3>{roundWithTwoDecimals(base_total()).toFixed(2)}{$userData.currency}</h3>
            </li>

            <li class="col acenter">
              <p class="label">IVA {$userData.iva}%</p>
              <h3>{roundWithTwoDecimals(iva_total()).toFixed(2)}{$userData.currency}</h3>
            </li>

            {#if $userData.ret}
              <li class="col acenter">
                <p class="label">IRPF {$userData.ret}%</p>
                <h3>-{roundWithTwoDecimals(ret_total()).toFixed(2)}{$userData.currency}</h3>
              </li>
            {/if}

            <h-div />

            <li class="col acenter grow">
              <p class="label">Total</p>
              <h3>{roundWithTwoDecimals(bill_total()).toFixed(2)}{$userData.currency}</h3>
            </li>
          </ul>

          <h-div />
        {/if}

        {#if $products.length > 0}
          <div class="input-wrapper col xfill">
            <label for="products_list" style="margin-bottom: 10px">CARGAR DATOS</label>
            <AutoComplete items={$products} bind:selectedItem={lineData} labelFieldName="label" placeholder="Buscar producto" noResultsText="No hay coincidencias" hideArrow>
              <div slot="item" let:item>
                <div class="row aend xfill">
                  <p class="nowrap grow" style="padding-right: 10px;">{item.label}</p>
                  <small><b>{roundWithTwoDecimals(item.price).toFixed(2)}€</b></small>
                </div>
              </div>
            </AutoComplete>
          </div>
        {/if}

        <div class="new-line row xfill">
          <input type="number" id="amount" bind:value={lineData.amount} min="1" class="out" placeholder="CANT" />
          <input type="text" id="label" bind:value={lineData.label} class="out grow" placeholder="CONCEPTO" />
          <input type="number" id="dto" bind:value={lineData.dto} min="0" max="100" class="out" placeholder="DTO %" />
          <input type="number" id="price" bind:value={lineData.price} step="0.01" class="out" placeholder="PRECIO {$userData.currency}" />
        </div>

        <div class="line-btn pri xfill" on:click={pushLine}>AÑADIR A LA LISTA</div>
      </div>

      <div class="box round col xfill">
        <h2>Notas</h2>
        <p class="notice">Si tienes que añadir o modificar la nota, este es el lugar.</p>

        <div class="input-wrapper col xfill">
          <label for="note">Notas</label>
          <textarea id="note" bind:value={billData.note} class="xfill" placeholder="Ej. Transporte no incluido" />
        </div>
      </div>

      <div class="last-row row jcenter xfill">
        <button class="succ semi">GUARDAR CAMBIOS</button>
        <a href="/proformas" class="btn out semi">ATRAS</a>
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
      margin-bottom: 20px;

      select {
        background: $white;
        text-align-last: center;
        border-width: 2px;
      }
    }

    a.btn {
      font-size: 12px;
    }

    .outer-loader {
      position: fixed;
      top: 0;
      left: 0;
      background: rgba($black, 0.7);
      backdrop-filter: blur(10px);
      pointer-events: none;

      img {
        width: 100px;
        margin-bottom: 20px;
      }
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
    textarea {
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

    textarea {
      border: 1px solid $border;
      resize: none;
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
      @media (max-width: $mobile) {
        margin-bottom: 10px;
      }

      &:nth-of-type(even) {
        background: $bg;
      }

      span.label {
        font-size: 12px;
        padding-left: 15px;
        margin-bottom: 5px;

        @media (max-width: $mobile) {
          display: none;
        }
      }

      span.label:nth-of-type(1),
      span.label:nth-of-type(3),
      span.label:nth-of-type(4),
      span.label:nth-of-type(5) {
        width: 15%;

        @media (max-width: $mobile) {
          width: 25%;
        }
      }

      span:nth-of-type(6) {
        width: 55px;
      }

      input:nth-of-type(1),
      input:nth-of-type(3),
      input:nth-of-type(4),
      input:nth-of-type(5) {
        width: 15%;

        @media (max-width: $mobile) {
          width: 25%;
        }
      }

      input:nth-of-type(6) {
        cursor: pointer;
        width: 55px;
        background: $border;
        text-align: center;
        font-weight: bold;
        color: $base;
        border: 1px solid $border;
        user-select: none;
        -webkit-user-drag: none;
      }

      input:nth-of-type(3),
      input:nth-of-type(4),
      input:nth-of-type(5),
      input:nth-of-type(6) {
        @media (max-width: $mobile) {
          width: 25%;
        }
      }
    }

    h-div {
      margin: 20px 0;
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
      background: $pri;
      color: $white;
      text-align: center;
      font-size: 12px;
      padding: 1.3em;
    }
  }

  .total-wrapper {
    li {
      margin: 10px;
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
