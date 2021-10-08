<script>
  import { convertidor } from "../../lib/metadata";
  import Comingsoon from "../../components/Comingsoon.svelte";
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

<Comingsoon />

<style lang="scss">
</style>
