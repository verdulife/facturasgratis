<script>
  import { stores, goto } from "@sapper/app";
  import { userData, proforma_bills, clients, products } from "../../lib/stores";
  import { autoNumeration, roundWithTwoDecimals } from "../../lib/functions";
  import { nueva_proforma } from "../../lib/metadata";
  import AutoComplete from "simple-svelte-autocomplete";

  const { page } = stores();
  let billData = {};
  let lineData = {};

  billData.number = autoNumeration($proforma_bills);
  billData.date = {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };
  billData.client = $page.query.client ? JSON.parse($page.query.client) : {};
  billData.items = [];
  billData.note = billData.note || $userData.proforma_note;

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

  function pushClient(client) {
    if (!$clients.some((c) => c.legal_id === client.legal_id)) {
      client._id = Date.now().toString();
      $clients = [...$clients, client];
    }
  }

  function pushProduct(items) {
    for (let i = 0; i < items.length; i++) {
      let product = { ...items[i] };

      if (!$products.some((p) => p._id === product._id)) {
        delete product.amount;
        delete product.dto;
        product._id = Date.now().toString();

        $products = [...$products, product];
      }
    }
  }

  function pushBill() {
    if (billData.items.length > 0) {
      billData._id = Date.now().toString();
      billData.totals = {
        base: base_total(),
        iva: iva_total(),
        ret: ret_total(),
        total: bill_total(),
      };

      $proforma_bills = [...$proforma_bills, billData];

      pushClient(billData.client);
      pushProduct(billData.items);

      $userData._updated = new Date();
      goto("/proformas");
    } else alert("⚠ No has añadido ningun concepto ⚠");
  }

  function maxLength(e) {
    const el = e.target;
    if (el.value.length > el.maxLength) el.value = el.value.slice(0, el.maxLength);
  }
</script>

<svelte:head>
  <title>{nueva_proforma.title}</title>
  <meta name="description" content={nueva_proforma.description} />
  <meta name="keywords" content={nueva_proforma.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={nueva_proforma.url} />
  <meta property="og:title" content={nueva_proforma.title} />
  <meta property="og:description" content={nueva_proforma.description} />
  <meta property="og:image" content={nueva_proforma.image} />
  <meta property="og:image:secure_url" content={nueva_proforma.image} />
  <meta property="og:image:type" content="image/jpeg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={nueva_proforma.url} />
  <meta name="twitter:title" content={nueva_proforma.title} />
  <meta name="twitter:description" content={nueva_proforma.description} />
  <meta name="twitter:image" content={nueva_proforma.image} />
</svelte:head>

<div class="scroll">
  <article class="header col fcenter xfill">
    <img src="/proformas.svg" alt="Proformas" />
    <h1>Nueva proforma</h1>
    <a href="/proformas" class="btn outwhite semi">VOLVER</a>
  </article>

  <form class="bill-data col acenter xfill" on:submit|preventDefault={pushBill}>
    <div class="box round col xfill">
      <h2>Datos de la proforma</h2>
      <p class="notice">La numeración y fecha de la proforma se rellenan automatiamente, pero puedes modificarlas.</p>

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

      {#if $clients.length > 0}
        <div class="input-wrapper col xfill">
          <label for="clients_list" style="margin-bottom: 10px">CARGAR DATOS</label>
          <AutoComplete
            items={$clients}
            bind:selectedItem={billData.client}
            labelFieldName="legal_name"
            placeholder="Buscar cliente"
            noResultsText="No hay coincidencias"
            hideArrow
          />
        </div>
      {/if}

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
              <input
                type="number"
                bind:value={item.price}
                step="0.01"
                class="out"
                placeholder="PRECIO {$userData.currency}"
              />
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
          <AutoComplete
            items={$products}
            bind:selectedItem={lineData}
            labelFieldName="label"
            placeholder="Buscar producto"
            noResultsText="😢 No hay coincidencias"
            hideArrow
          >
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
        <input
          type="number"
          id="price"
          bind:value={lineData.price}
          step="0.01"
          class="out"
          placeholder="PRECIO {$userData.currency}"
        />
      </div>

      <div class="line-btn pri xfill" on:click={pushLine}>AÑADIR A LA LISTA</div>
    </div>

    <div class="box round col xfill">
      <h2>Notas</h2>
      <p class="notice">Si tienes que añadir o modificar la nota, este es el lugar.</p>

      <div class="input-wrapper col xfill">
        <label class="row jbetween aceneter xfill" for="note">
          Notas
          <span>{billData.note ? billData.note.length : 0} / 350</span>
        </label>

        <textarea
          id="note"
          bind:value={billData.note}
          class="xfill"
          placeholder="Ej. Transporte no incluido"
          maxlength="350"
          on:keydown={(e) => maxLength(e)}
        />
      </div>
    </div>

    <div class="last-row row jcenter xfill">
      <button class="succ semi">GENERAR PROFORMA</button>
      <a href="/proformas" class="btn out semi">CANCELAR</a>
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

      @media (max-width: $mobile) {
        margin-bottom: 20px;
      }
    }

    a.btn {
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
        margin-top: -1px;
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
    margin-top: 10px;
  }

  button,
  a.btn {
    margin: 5px;

    @media (max-width: $mobile) {
      width: 70%;
      max-width: 210px;
      text-align: center;
    }
  }
</style>
