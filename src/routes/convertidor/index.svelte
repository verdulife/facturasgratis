<script>
  import { convertidor } from "../../lib/metadata";
  import { userData } from "../../lib/stores";
  import { tools } from "../../lib/utils";
  import { roundWithTwoDecimals } from "../../lib/functions";

  let IVA = $userData.iva || 21;
  let IRPF = $userData.ret || 0;
  let without_value = 0;
  let with_value = 0;
  let iva_value = 0;
  let irpf_value = 0;

  function selectAll(el) {
    el.target.select();
  }

  function calcTaxes() {
    iva_value = (without_value * IVA) / 100;
    irpf_value = IRPF > 0 ? (without_value * IRPF) / 100 : 0;

    with_value = roundWithTwoDecimals(without_value + iva_value - irpf_value);
  }

  function substractTaxes() {
    const inverted = 1 + IVA / 100 - IRPF / 100;

    without_value = roundWithTwoDecimals(with_value / inverted);
    iva_value = (without_value * IVA) / 100;
    irpf_value = IRPF > 0 ? (without_value * IRPF) / 100 : 0;
  }
</script>

<svelte:head>
  <title>{convertidor.title}</title>
  <meta name="description" content={convertidor.description} />
  <meta name="keywords" content={convertidor.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={convertidor.url} />
  <meta property="og:title" content={convertidor.title} />
  <meta property="og:description" content={convertidor.description} />
  <meta property="og:image" content={convertidor.image} />
  <meta property="og:image:secure_url" content={convertidor.image} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={convertidor.url} />
  <meta name="twitter:title" content={convertidor.title} />
  <meta name="twitter:description" content={convertidor.description} />
  <meta name="twitter:image" content={convertidor.image} />
</svelte:head>

<div class="scroll">
  <article class="header col fcenter xfill">
    <img src="/albaranes.svg" alt="Convertidor de impuestos" />
    <h1>{tools[8].title}</h1>
    <p>{tools[8].desc}</p>
  </article>

  <div class="type xfill">
    <div class="box round">
      <h2>Valor a convertir</h2>
      <p class="notice">Elije tus impuestos, rellena el campo que conozcas, y el otro se calculara automatiamente</p>

      <div class="row xfill">
        <div class="input-wrapper col xhalf">
          <label for="type">TIPO DE IVA %</label>
          <input class="out xfill" type="number" bind:value={IVA} on:keyup={calcTaxes} />
        </div>

        <div class="input-wrapper col xhalf">
          <label for="type">TIPO DE IRPF %</label>
          <input class="out xfill" type="number" bind:value={IRPF} on:keyup={calcTaxes} />
        </div>
      </div>

      <div class="row xfill">
        <div class="input-wrapper col xhalf">
          <label for="type">SIN IMPUESTOS {$userData && $userData.currency ? $userData.currency : "€"}</label>
          <input class="out xfill" type="number" bind:value={without_value} step="0.01" on:keyup={calcTaxes} on:focus={(el) => selectAll(el)} />
        </div>

        <div class="input-wrapper col xhalf">
          <label for="type">CON IMPUESTOS {$userData && $userData.currency ? $userData.currency : "€"}</label>
          <input class="out xfill" type="number" bind:value={with_value} step="0.01" on:keyup={substractTaxes} on:focus={(el) => selectAll(el)} />
        </div>
      </div>

      <div class="row xfill">
        <div class="col acenter xhalf">
          <small class="label">IVA</small>
          <p>+{roundWithTwoDecimals(iva_value).toFixed(2)}{$userData && $userData.currency ? $userData.currency : "€"}</p>
        </div>

        <div class="col acenter xhalf">
          <small class="label">IRPF</small>
          <p>-{roundWithTwoDecimals(irpf_value).toFixed(2)}{$userData && $userData.currency ? $userData.currency : "€"}</p>
        </div>
      </div>
    </div>
  </div>
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

  .type {
    padding-bottom: 60px;

    @media (max-width: $mobile) {
      padding: 0 10px 40px 10px;
    }

    .box {
      max-width: 900px;
      margin: 40px auto 0 auto;
      padding: 40px;

      @media (max-width: $mobile) {
        padding: 20px;
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

      label,
      small {
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
  }
</style>
