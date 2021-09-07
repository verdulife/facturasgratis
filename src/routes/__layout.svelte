<script>
  import Nav from "$lib/Nav.svelte";
  import "../fonts/circular.css";
  import "../fonts/operator.css";
</script>

<main>
  <Nav />

  <div class="scroll">
    <slot />
  </div>
</main>

<footer>
  <p>Made with ♥ by verdu on 2021-2022.</p>
</footer>

<style lang="scss" global>
  @import "./src/_reset.scss";
  @import "../node_modules/verdu/verdu.scss";
</style>
