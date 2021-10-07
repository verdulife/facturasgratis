<script>
  import { proveedores } from "../../lib/metadata";
  import Comingsoon from "../../components/Comingsoon.svelte";
</script>

<svelte:head>
  <title>{proveedores.title}</title>
  <meta name="description" content={proveedores.description} />
  <meta name="keywords" content={proveedores.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={proveedores.url} />
  <meta property="og:title" content={proveedores.title} />
  <meta property="og:description" content={proveedores.description} />
  <meta property="og:image:secure_url" content={proveedores.image} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={proveedores.url} />
  <meta name="twitter:title" content={proveedores.title} />
  <meta name="twitter:description" content={proveedores.description} />
  <meta name="twitter:image" content="https://www.facturasgratis.ml/mobile.png" />
</svelte:head>

<Comingsoon />

<style lang="scss">
</style>
