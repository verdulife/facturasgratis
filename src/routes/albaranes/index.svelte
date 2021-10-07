<script>
  import { albaranes } from "../../lib/metadata";
  import Comingsoon from "../../components/Comingsoon.svelte";
</script>

<svelte:head>
  <title>{albaranes.title}</title>
  <meta name="description" content={albaranes.description} />
  <meta name="keywords" content={albaranes.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={albaranes.url} />
  <meta property="og:title" content={albaranes.title} />
  <meta property="og:description" content={albaranes.description} />
  <meta property="og:image:secure_url" content={albaranes.image} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={albaranes.url} />
  <meta name="twitter:title" content={albaranes.title} />
  <meta name="twitter:description" content={albaranes.description} />
  <meta name="twitter:image" content={albaranes.image} />
</svelte:head>

<Comingsoon />

<style lang="scss">
</style>
