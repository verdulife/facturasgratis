<script>
  import { calculadora } from "../../lib/metadata";
  import Comingsoon from "../../components/Comingsoon.svelte";
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

<style lang="scss">
</style>
