<script>
  import { page } from "$app/stores";

  const routes = [
    {
      slug: "/",
      title: "Inicio",
    },
    {
      slug: "/about",
      title: "Sobre",
    },
  ];
</script>

<nav class="row jbetween acenter xfill">
  <img class="logo" src="logo.svg" alt="facturasgratis" />

  <ul class="row yfill">
    {#each routes as route}
      <li class="row acenter yfill" class:active={$page.path === route.slug}><a href={route.slug}>{route.title}</a></li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  nav {
    height: 65px;
    padding: 0 40px;
  }

  .logo {
    width: 200px;
  }

  li {
    padding: 0 20px;
  }

  .active {
    border-bottom: 2px solid $pri;
  }
</style>
