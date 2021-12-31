<script>
  import { metro_cuadrado } from "../../lib/metadata";
  import Comingsoon from "../../components/Comingsoon.svelte";
  import { tools } from "../../lib/utils";
  import { userData, products } from "../../lib/stores";
  import { roundWithTwoDecimals } from "../../lib/functions";
</script>

<svelte:head>
  <title>{metro_cuadrado.title}</title>
  <meta name="description" content={metro_cuadrado.description} />
  <meta name="keywords" content={metro_cuadrado.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={metro_cuadrado.url} />
  <meta property="og:title" content={metro_cuadrado.title} />
  <meta property="og:description" content={metro_cuadrado.description} />
  <meta property="og:image" content={metro_cuadrado.image} />
  <meta property="og:image:secure_url" content={metro_cuadrado.image} />
  <meta property="og:image:type" content="image/jpeg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={metro_cuadrado.url} />
  <meta name="twitter:title" content={metro_cuadrado.title} />
  <meta name="twitter:description" content={metro_cuadrado.description} />
  <meta name="twitter:image" content={metro_cuadrado.image} />
</svelte:head>

<Comingsoon />

<!-- <div class="scroll">
  <article class="header col fcenter xfill">
    <img src="/metro.svg" alt="Calculadora metro cuadrado" />
    <h1>{tools[9].title}</h1>
    <p>{tools[9].desc}</p>

    <a href="/" class="btn outwhite semi">VOLVER</a>
  </article>

  <div class="content col acenter xfill">
    <div class="box round xfill">
      {#if $products}
        <select class="out semi xfill">
          {#each $products as product}
            <option value={product._id}>
              {product.label} - {roundWithTwoDecimals(product.price).toFixed(2)}{$userData && $userData.currency
                ? $userData.currency
                : "€"}
            </option>
          {/each}
        </select>
      {/if}
    </div>
  </div>
</div> -->

<style lang="scss">
  /* .header {
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

  .content {
    max-width: 900px;
    margin: 40px auto 0 auto;
    padding-bottom: 60px;

    @media (max-width: $mobile) {
      padding: 0 10px 40px 10px;
    }

    .box {
      padding: 40px;

      @media (max-width: $mobile) {
        padding: 20px;
      }
    }
  } */
</style>
