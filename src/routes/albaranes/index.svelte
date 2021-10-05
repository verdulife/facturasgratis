<script>
  import { albaranes } from "../../lib/metadata";
  import Comingsoon from "../../components/Comingsoon.svelte";
</script>

<svelte:head>
  <title>{home.title}</title>
  <meta name="description" content={albaranes.description} />
  <meta name="keywords" content={albaranes.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={albaranes.url} />
  <meta property="og:title" content={albaranes.title} />
  <meta property="og:description" content={albaranes.description} />
  <meta property="og:image" content={albaranes.image} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={albaranes.url} />
  <meta property="twitter:title" content={albaranes.title} />
  <meta property="twitter:description" content={albaranes.description} />
  <meta property="twitter:image" content={albaranes.image} />
</svelte:head>

<Comingsoon />

<style lang="scss">
</style>
