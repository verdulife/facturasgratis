<script>
  import { calculadora } from "../../lib/metadata";
  import { userData } from "../../lib/stores";
  import Comingsoon from "../../components/Comingsoon.svelte";

  const IVA = $userData.iva || 21;
  const IRPF = $userData.ret || 0;
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
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={calculadora.url} />
  <meta name="twitter:title" content={calculadora.title} />
  <meta name="twitter:description" content={calculadora.description} />
  <meta name="twitter:image" content={calculadora.image} />
</svelte:head>

<Comingsoon />
<!-- <div class="col fill">
  <article class="header col fcenter xfill">
    <h1>Calculadora de impuestos</h1>
    <p>Una calculadora diseñada para calcular de forma automática los impuestos.</p>
  </article>

  <div class="display box col aend">
    <span class="col xfill">
      <small class="label xfill nowrap">IVA</small>
      <p class="label xfill nowrap">0.00€</p>
    </span>

    {#if IRPF}
      <span class="col xfill">
        <small class="label xfill nowrap">IRPF</small>
        <p class="label xfill nowrap">0.00€</p>
      </span>
    {/if}
    <span class="col xfill">
      <small class="label xfill nowrap">TOTAL</small>
      <p class="label xfill nowrap">0.00€</p>
    </span>
  </div>
</div> -->

<style lang="scss">
  .header {
    background: linear-gradient(45deg, $pri 50%, $sec);
    text-align: center;
    color: $white;
    padding: 60px 40px;

    @media (max-width: $mobile) {
      padding: 20px;
    }

    h1 {
      max-width: 900px;
      font-size: 3vw;
      line-height: 1.2;
      margin-bottom: 40px;

      @media (max-width: $mobile) {
        font-size: 5vh;
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
</style>
