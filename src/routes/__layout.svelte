<script>
  import Nav from "$lib/Nav.svelte";
  import "../fonts/circular.css";
  import "../fonts/operator.css";
</script>

<main>
  <Nav />

  <div class="view fill">
    <slot />
  </div>

  <footer class="row fcenter xfill">
    <p>Made with ♥ by verdu on 2021</p>
  </footer>
</main>

<style lang="scss">
  :global {
    @import "./src/_reset.scss";
    @import "../node_modules/verdu/verdu.scss";
  }

  .view {
    height: calc(100% - 90px);
  }

  footer {
    height: 25px;
    background: $pri;
    color: $white;
    font-size: 12px;
  }
</style>
