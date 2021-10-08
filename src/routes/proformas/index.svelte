<script>
  import { proformas } from "../../lib/metadata";
  import Comingsoon from "../../components/Comingsoon.svelte";
</script>

<svelte:head>
  <title>{proformas.title}</title>
  <meta name="description" content={proformas.description} />
  <meta name="keywords" content={proformas.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={proformas.url} />
  <meta property="og:title" content={proformas.title} />
  <meta property="og:description" content={proformas.description} />
  <meta property="og:image" content={proformas.image} />
  <meta property="og:image:secure_url" content={proformas.image} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={proformas.url} />
  <meta name="twitter:title" content={proformas.title} />
  <meta name="twitter:description" content={proformas.description} />
  <meta name="twitter:image" content={proformas.image} />
</svelte:head>

<Comingsoon />

<style lang="scss">
</style>
