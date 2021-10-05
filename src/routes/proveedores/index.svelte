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
  <meta property="og:image" content={proveedores.image} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={proveedores.url} />
  <meta property="twitter:title" content={proveedores.title} />
  <meta property="twitter:description" content={proveedores.description} />
  <meta property="twitter:image" content={proveedores.image} />
</svelte:head>

<Comingsoon />

<style lang="scss">
</style>
