<script>
  import { control_gastos } from "../../lib/metadata";
  import { expenses } from "../../lib/stores";
  import Comingsoon from "../../components/Comingsoon.svelte";

  console.log($expenses);
</script>

<svelte:head>
  <title>{control_gastos.title}</title>
  <meta name="description" content={control_gastos.description} />
  <meta name="keywords" content={control_gastos.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={control_gastos.url} />
  <meta property="og:title" content={control_gastos.title} />
  <meta property="og:description" content={control_gastos.description} />
  <meta property="og:image" content={control_gastos.image} />
  <meta property="og:image:secure_url" content={control_gastos.image} />
  <meta property="og:image:type" content="image/jpeg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={control_gastos.url} />
  <meta name="twitter:title" content={control_gastos.title} />
  <meta name="twitter:description" content={control_gastos.description} />
  <meta name="twitter:image" content={control_gastos.image} />
</svelte:head>

<Comingsoon />

<style lang="scss">
</style>
