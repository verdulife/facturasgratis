<script>
  import { metro_cuadrado } from "../../lib/metadata";
  import Comingsoon from "../../components/Comingsoon.svelte";
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

<style lang="scss">
</style>
