<script>
  import { page } from "$app/stores";
  import { slide } from "svelte/transition";

  const routes = [
    {
      slug: "/",
      title: "Inicio",
    },
    {
      slug: "/ajustes",
      title: "Ajustes",
    },
  ];

  let mobileMenu = false;

  function togMenu() {
    mobileMenu = !mobileMenu;
  }
</script>

<nav class="row jbetween acenter xfill">
  <img class="logo" src="logo.svg" alt="facturasgratis" />

  <ul class="desktop-menu row yfill">
    {#each routes as route}
      <li class="row acenter yfill" class:active={$page.path === route.slug}><a href={route.slug}>{route.title}</a></li>
    {/each}
  </ul>

  <div class="icon row fcenter" on:click={togMenu}>
    <img class="fill" src="menu.svg" alt="Menú" />
  </div>

  {#if mobileMenu}
    <ul class="mobile-menu col fill" transition:slide>
      {#each routes as route}
        <li class="row acenter xfill" class:active={$page.path === route.slug}><a href={route.slug}>{route.title}</a></li>
      {/each}
    </ul>
  {/if}
</nav>

<style lang="scss">
  nav {
    height: 65px;
    border-bottom: 1px solid $border;
    padding: 0 40px;

    @media (max-width: $mobile) {
      padding: 0 20px;
    }
  }

  .logo {
    width: 200px;
  }

  li {
    padding: 0 20px;
  }

  .active {
    border-bottom: 2px solid $pri;

    @media (max-width: $mobile) {
      border-bottom: none;
      font-weight: bold;
    }
  }

  .icon {
    width: 25px;
    height: 25px;
  }

  .mobile-menu {
    display: none;

    position: fixed;
    top: 65px;
    left: 0;
    background: $white;
    transition: 500ms;
    z-index: 999;

    li {
      padding: 15px 20px;
      border-bottom: 1px solid $border;
    }
  }

  @media (max-width: $mobile) {
    .desktop-menu {
      display: none;
    }

    .mobile-menu {
      display: inherit;
    }
  }
</style>
