<script>
  import { roundWithTwoDecimals } from "../../lib/functions";
  import { lector_qr } from "../../lib/metadata";
  import { stores } from "@sapper/app";
  import { Ivon } from "../../lib/ivon";

  const { page } = stores();
  let data;

  if ($page.query) {
    data = $page.query.data;
  }

  const billData = data ? Ivon.decompress(data) : {};

  function calcLineTotal(item) {
    const amount_price = item.price * item.amount;
    const dto_price = amount_price - (amount_price * item.dto) / 100;
    return `${roundWithTwoDecimals(dto_price).toFixed(2)}${billData.emmiter.currency}`;
  }

  function loadPDF() {
    alert("La lectura de PDF's todavia no está disponible, pero puedes escanear el código QR con tu cámara.");
    /* const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.click();

    input.onchange = () => {
      let reader = new FileReader();

      reader.onload = (e) => {
        console.log(input.files[0]);
      };

      reader.readAsText(input.files[0]);
    }; */
  }
</script>

<svelte:head>
  <title>{lector_qr.title}</title>
  <meta name="description" content={lector_qr.description} />
  <meta name="keywords" content={lector_qr.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={lector_qr.url} />
  <meta property="og:title" content={lector_qr.title} />
  <meta property="og:description" content={lector_qr.description} />
  <meta property="og:image" content={lector_qr.image} />
  <meta property="og:image:secure_url" content={lector_qr.image} />
  <meta property="og:image:type" content="image/jpeg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={lector_qr.url} />
  <meta name="twitter:title" content={lector_qr.title} />
  <meta name="twitter:description" content={lector_qr.description} />
  <meta name="twitter:image" content={lector_qr.image} />
</svelte:head>

<div class="scroll">
  <section class="header col fcenter xfill">
    <img src="/facturas.svg" alt="Factura" />
    <h1>Lector de Facturas QR</h1>
    <p>
      Si te han enviado una factura que contiene un código QR, puedes escanearla con tu móbil o cargar el archivo PDF
      para añadirla a tus gastos.
    </p>

    <button class="succ semi" on:click={loadPDF}>CARGAR PDF</button>

    <a href="/" class="btn outwhite semi">VOLVER</a>
  </section>

  {#if billData.number}
    <form class="bill-data col acenter xfill">
      <div class="box round col xfill">
        <h2>Datos de la factura</h2>

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
              <input
                type="number"
                id="month"
                min="1"
                max="12"
                class="xfill"
                bind:value={billData.date.month}
                required
              />
            </div>
            <div class="input-wrapper date col">
              <label for="year">Año</label>
              <input type="number" id="year" class="xfill" bind:value={billData.date.year} required />
            </div>
          </div>
        </div>
      </div>

      <div class="box round col xfill">
        <h2>Datos del emisor</h2>

        <div class="input-wrapper col xfill">
          <label for="legal_name">NOMBRE FISCAL</label>
          <input type="text" id="leagal_name" bind:value={billData.emmiter.legal_name} class="xfill" required />
        </div>

        <div class="row xfill">
          <div class="input-wrapper col xhalf">
            <label for="legal_id">CIF/NIF</label>
            <input type="text" id="leagal_id" bind:value={billData.emmiter.legal_id} class="xfill" required />
          </div>

          <div class="input-wrapper col xhalf">
            <label for="contact">Conacto</label>
            <input type="text" id="contact" bind:value={billData.emmiter.contact} class="xfill" required />
          </div>
        </div>

        <div class="row xfill">
          <div class="input-wrapper col xhalf">
            <label for="street">DIRECCION FISCAL</label>
            <input type="text" id="street" bind:value={billData.emmiter.street} class="xfill" required />
          </div>

          <div class="col xhalf">
            <label for="cp">Código postal</label>
            <input type="text" id="cp" bind:value={billData.emmiter.cp} class="xfill" required />
          </div>
        </div>

        <div class="row xfill">
          <div class="input-wrapper col xhalf">
            <label for="city">POBLACIÓN</label>
            <input type="text" id="city" bind:value={billData.emmiter.city} class="xfill" required />
          </div>

          <div class="input-wrapper col xhalf">
            <label for="country">País</label>
            <input type="text" id="country" bind:value={billData.emmiter.country} class="xfill" required />
          </div>
        </div>
      </div>

      <div class="box round col xfill">
        <h2>Conceptos</h2>

        {#if billData.items.length > 0}
          <ul class="bill-items col acenter xfill">
            <li class="line row xfill">
              <span class="label row">CANT</span>
              <span class="label row grow">CONCEPTO</span>
              <span class="label row">DTO %</span>
              <span class="label row">PRECIO {billData.emmiter.currency}</span>
              <span class="label row">IMPORTE {billData.emmiter.currency}</span>
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
                  placeholder="PRECIO {billData.emmiter.currency}"
                />
                <input type="text" value={calcLineTotal(item)} class="out" disabled />
              </li>
            {/each}
          </ul>

          <h-div />

          <ul class="total-wrapper row jevenly xfill">
            <li class="col acenter">
              <p class="label">Base</p>
              <h3>{roundWithTwoDecimals(billData.totals.base).toFixed(2)}{billData.emmiter.currency}</h3>
            </li>

            <li class="col acenter">
              <p class="label">IVA</p>
              <h3>{roundWithTwoDecimals(billData.totals.iva).toFixed(2)}{billData.emmiter.currency}</h3>
            </li>

            {#if billData.emmiter.ret}
              <li class="col acenter">
                <p class="label">IRPF</p>
                <h3>-{roundWithTwoDecimals(billData.totals.ret).toFixed(2)}{billData.emmiter.currency}</h3>
              </li>
            {/if}

            <h-div />

            <li class="col acenter grow">
              <p class="label">Total</p>
              <h3>{roundWithTwoDecimals(billData.totals.total).toFixed(2)}{billData.emmiter.currency}</h3>
            </li>
          </ul>
        {/if}
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
          width: calc(100% / 3);
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
