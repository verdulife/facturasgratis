<div class="col fcenter fill">
  <div class="video-wrapper">
    <video src="/working.mp4" playsinline muted autoplay loop />
    <div class="video-overlay" />
  </div>

  <div class="message col fcenter">
    <h1>Página en construcción</h1>
    <p>Estamos perfilando algunas cosas. Vuelve pronto y estara todo listo</p>
    <a href="/" class="btn succ semi">VOLVER AL INICIO</a>
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
      background: $pri url("/overlay.png");
      filter: invert(1);
      opacity: 0.4;
    }
  }

  .message {
    z-index: 2;
    text-align: center;
    color: $white;
    padding: 20px;

    h1 {
      line-height: 1;
      margin-bottom: 20px;
    }

    a.btn {
      color: $white;
      text-transform: uppercase;
      font-size: 12px;
      margin: 3em 0;
    }
  }
</style>
