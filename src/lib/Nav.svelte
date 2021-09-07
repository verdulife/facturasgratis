<script>
  import { page } from "$app/stores";
</script>

<nav class="row jbetween xfill">
  <img class="logo" src="logo-s.svg" alt="facturasgratis" />

  <ul class="row">
    <li class:active={$page.path === "/"}><a sveltekit:prefetch href="/">Home</a></li>
    <li class:active={$page.path === "/about"}><a sveltekit:prefetch href="/about">About</a></li>
    <li class:active={$page.path === "/todos"}><a sveltekit:prefetch href="/todos">Todos</a></li>
  </ul>
</nav>

<style lang="scss">
  nav {
    border-bottom: 1px solid $border;
    padding: 20px 40px;
  }

  .logo {
    width: 200px;
  }

  .active {
    border-bottom: 2px solid $pri;
  }
</style>
