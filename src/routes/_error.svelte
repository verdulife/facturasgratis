<script>
  export let status, error;
  const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
  <title>{status} | Facturasgratis</title>
</svelte:head>

<div class="col fcenter fill">
  <div class="video-wrapper">
    <video src="/no-bills.mp4" playsinline muted autoplay loop />
    <div class="video-overlay" />
  </div>

  <div class="message col fcenter">
    <h1>Ups, esto no son facturas...</h1>
    <p>Posiblemente la página que estas buscando no exista o se haya modificado</p>
    <a href="/" class="btn succ semi">VOLVER AL INICIO</a>

    {#if dev && error.stack}
      <pre class="xfill">{error.stack}</pre>
    {/if}
  </div>
</div>

<style lang="scss">
  .video-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .video-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $white url("/overlay.png");
      opacity: 0.4;
    }
  }

  .message {
    z-index: 2;
    padding: 20px;

    h1 {
      text-align: center;
      line-height: 1;
      margin-bottom: 20px;
    }

    p {
      text-align: center;
    }

    a.btn {
      text-transform: uppercase;
      font-size: 12px;
      margin: 3em 0;
    }
  }
</style>
