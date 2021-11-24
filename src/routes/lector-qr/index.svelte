<script>
  import { lector_qr } from "../../lib/metadata";
  import Comingsoon from "../../components/Comingsoon.svelte";
  import { stores } from "@sapper/app";
  import { Ivon } from "../../lib/functions";

  const { page } = stores();
  const { data } = $page.query;

  console.log(Ivon.decompress(data));
</script>

<svelte:head>
  <title>{lector_qr.title}</title>
  <meta name="description" content={lector_qr.description} />
  <meta name="keywords" content={lector_qr.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={lector_qr.url} />
  <meta property="og:title" content={lector_qr.title} />
  <meta property="og:description" content={lector_qr.description} />
  <meta property="og:image" content={lector_qr.image} />
  <meta property="og:image:secure_url" content={lector_qr.image} />
  <meta property="og:image:type" content="image/jpeg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={lector_qr.url} />
  <meta name="twitter:title" content={lector_qr.title} />
  <meta name="twitter:description" content={lector_qr.description} />
  <meta name="twitter:image" content={lector_qr.image} />
</svelte:head>

<Comingsoon />

<style lang="scss">
</style>
