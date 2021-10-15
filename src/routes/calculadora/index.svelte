<script>
  import { userData } from "../../lib/stores";
  import { tools } from "../../lib/utils";
  import { calculadora } from "../../lib/metadata";
  import { roundWithTwoDecimals } from "../../lib/functions";

  let IVA = $userData.iva || 21;
  let IRPF = $userData.ret || 0;
  let user_value = 0;
  let output = 0;

  $: with_iva = () => (output * IVA) / 100;
  $: with_irpf = () => (output * IRPF) / 100;
  $: total = () => output + with_iva() - with_irpf();

  function clearCalc() {
    user_value = 0;
    output = user_value;
  }

  function deleteLastCharacter() {
    if (user_value.toString().length === 1 || user_value === "ERR") user_value = 0;
    else user_value = user_value.toString().slice(0, -1);
  }

  function add(c) {
    if (user_value === 0 || user_value === "0" || !user_value) user_value = c;
    else user_value += c;
  }

  function userPad(e) {
    const input_iva = document.getElementById("iva_value");
    const input_irpf = document.getElementById("irpf_value");

    console.log(input_iva === document.activeElement);

    if (input_iva !== document.activeElement && input_irpf !== document.activeElement) {
      const isNumber = /^\d+$/;
      if (isNumber.test(e.key) || e.key === "/" || e.key === "*" || e.key === "-" || e.key === "+" || e.key === "." || e.key === "," || e.key === "(" || e.key === ")" || e.keyCode === 46) {
        if (e.keyCode === 46 || e.key === ",") add(".");
        else add(e.key);
      }

      if (e.key === "Enter") calc();
      if (e.key === "Delete" || e.key === "Backspace") deleteLastCharacter();
      if (e.key === "Escape") clearCalc();
    }
  }

  function calc() {
    try {
      if (user_value) {
        user_value = new Function("return " + user_value)();
        output = user_value;
      }
    } catch (error) {
      console.log(error);
      user_value = "ERR";
    }
  }

  async function copyToClipboard(el) {
    const originalValue = el.target.children[1].textContent;
    await navigator.clipboard.writeText(originalValue);

    el.target.children[1].innerHTML = "<b style='font-size: 18px'>COPIADO</b>";
    setTimeout(() => {
      el.target.children[1].innerHTML = `<b style='font-size: 18px'>${originalValue}</b>`;
    }, 500);
  }
</script>

<svelte:head>
  <title>{calculadora.title}</title>
  <meta name="description" content={calculadora.description} />
  <meta name="keywords" content={calculadora.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={calculadora.url} />
  <meta property="og:title" content={calculadora.title} />
  <meta property="og:description" content={calculadora.description} />
  <meta property="og:image" content={calculadora.image} />
  <meta property="og:image:secure_url" content={calculadora.image} />
  <meta property="og:image:type" content="image/jpeg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={calculadora.url} />
  <meta name="twitter:title" content={calculadora.title} />
  <meta name="twitter:description" content={calculadora.description} />
  <meta name="twitter:image" content={calculadora.image} />
</svelte:head>

<svelte:window on:keydown={userPad} />

<div class="scroll">
  <article class="header col fcenter xfill">
    <img src="/calculadora.svg" alt="Calculadora de impuestos" />
    <h1>{tools[7].title}</h1>
    <p>{tools[7].desc}</p>

    <a href="/" class="btn outwhite semi">VOLVER</a>

    <h-div />

    <small>Toca un valor para copiarlo</small>

    <div class="output row xfill">
      <div class="box jbetween xhalf" on:click={(el) => copyToClipboard(el)}>
        <p>IVA</p>
        <p>
          <b>+{roundWithTwoDecimals(with_iva()).toFixed(2)}{$userData && $userData.currency ? $userData.currency : "€"}</b>
        </p>
      </div>

      <div class="box jbetween xhalf" on:click={(el) => copyToClipboard(el)}>
        <p>IRPF</p>
        <p>
          <b>-{roundWithTwoDecimals(with_irpf()).toFixed(2)}{$userData && $userData.currency ? $userData.currency : "€"}</b>
        </p>
      </div>

      <div class="box jbetween xfill" on:click={(el) => copyToClipboard(el)}>
        <p>TOTAL</p>
        <p>
          <b>{roundWithTwoDecimals(total()).toFixed(2)}{$userData && $userData.currency ? $userData.currency : "€"}</b>
        </p>
      </div>
    </div>
  </article>

  <section class="col xfill">
    <div class="row xfill">
      <div class="input-wrapper row acenter xhalf">
        <label class="row fcenter yfill" for="iva_value">IVA %</label>
        <input class="out yfill" id="iva_value" type="number" step="0.01" bind:value={IVA} placeholder="Ej. 21" />
      </div>

      <div class="input-wrapper row acenter xhalf">
        <label class="row fcenter yfill" for="irpf_value">IRPF %</label>
        <input class="out yfill" id="irpf_value" type="number" step="0.01" bind:value={IRPF} placeholder="Ej. 15" />
      </div>
    </div>

    <div class="display box row jend acenter xfill">
      <span class="row fcenter yfill">BASE {$userData && $userData.currency ? $userData.currency : "€"}</span>
      <p class="grow">{user_value}</p>
    </div>

    <div class="numpad row xfill">
      <div class="box" on:click={clearCalc}>C</div>
      <div class="box" on:click={deleteLastCharacter}>DEL</div>
      <div class="box" on:click={() => add("/")}>/</div>
      <div class="box" on:click={() => add("*")}>*</div>

      <div class="box" on:click={() => add("7")}>7</div>
      <div class="box" on:click={() => add("8")}>8</div>
      <div class="box" on:click={() => add("9")}>9</div>
      <div class="box" on:click={() => add("-")}>-</div>

      <div class="box" on:click={() => add("4")}>4</div>
      <div class="box" on:click={() => add("5")}>5</div>
      <div class="box" on:click={() => add("6")}>6</div>
      <div class="box" on:click={() => add("+")}>+</div>

      <div class="box" on:click={() => add("1")}>1</div>
      <div class="box" on:click={() => add("2")}>2</div>
      <div class="box" on:click={() => add("3")}>3</div>
      <div class="box vdbl" on:click={calc}>&nbsp;</div>

      <div class="box dbl" on:click={() => add("0")}>0</div>
      <div class="box" on:click={() => add(".")}>.</div>
      <div class="box vdbl" on:click={calc}>=</div>
    </div>
  </section>
</div>

<style lang="scss">
  .header {
    background: linear-gradient(45deg, $pri 50%, $sec);
    text-align: center;
    color: $white;
    padding: 40px;

    @media (max-width: $mobile) {
      padding: 20px;
    }

    img {
      width: 100px;
      margin-bottom: 20px;
    }

    h1 {
      max-width: 900px;
      font-size: 3vw;
      line-height: 1.2;
      margin-bottom: 10px;

      @media (max-width: $mobile) {
        font-size: 5vh;
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

    a.btn {
      margin-top: 20px;
    }

    h-div {
      max-width: 900px;
      margin: 30px 0;
    }

    small {
      margin-bottom: 5px;
      font-weight: lighter;
      color: $sec;
    }

    .output {
      max-width: 700px;

      .box {
        cursor: pointer;
        background: rgba($sec, 0.1);
        margin-bottom: -1px;
        padding: 7px;

        p {
          text-align: left;
          font-size: 10px;
          pointer-events: none;

          b {
            font-size: 18px;
          }
        }
      }
    }
  }

  section {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;

    @media (max-width: $mobile) {
      padding: 20px 10px;
    }

    .input-wrapper {
      height: 50px;

      label {
        width: 60px;
        font-size: 10px;
        border: 1px solid $border;
      }

      input {
        width: calc(100% - 60px);
      }
    }
  }

  .display {
    text-align: right;

    span {
      font-size: 10px;
      padding-right: 10px;
    }
  }

  .numpad {
    .box {
      cursor: pointer;
      width: 25%;
      text-align: center;
      transition: 100ms;

      &:active {
        background: $sec;
      }
    }

    .dbl {
      width: 50%;
    }

    .vdbl {
      background-color: $pri;
      color: $white;
      border-bottom-color: $pri;

      &:last-of-type {
        border-top-color: $pri;
      }

      &:active {
        background: $pri;
      }
    }
  }
</style>
