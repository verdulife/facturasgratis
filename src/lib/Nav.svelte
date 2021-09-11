<script>
  import { page } from "$app/stores";
  import { slide } from "svelte/transition";
  import { userData } from "../stores";

  const routes = [
    {
      slug: "/",
      title: "Inicio",
    },
    {
      slug: "/ajustes",
      title: $userData.legal_name || "Ajustes",
    },
  ];

  let mobileMenu = false;

  function togMenu() {
    mobileMenu = !mobileMenu;
  }
</script>

<nav class="row jbetween acenter xfill">
  <a href="/">
    <img class="logo" src="/logo.svg" alt="facturasgratis" />
  </a>

  <ul class="desktop-menu row yfill">
    {#each routes as route}
      <li class="row acenter yfill" class:active={$page.path === route.slug}>
        <a href={route.slug} class="row acenter yfill">
          {#if route.title === $userData.legal_name && $userData.logo}
            <img class="user-img" src={$userData.logo} alt={$userData.legal_name || "Logotipo"} />
          {/if}

          {route.title}
        </a>
      </li>
    {/each}
  </ul>

  <a class="mobile-menu row fcenter" href="/ajustes">
    {#if $userData.logo}
      <img class="user-img" src={$userData.logo} alt={$userData.legal_name || "Logotipo"} />
    {:else}
      <div class="icon row fcenter">
        <img class="fill" src="/options.svg" alt="Menú" />
      </div>
    {/if}
  </a>
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

  .user-img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    object-position: center;
    border: 1px solid $border;
    border-radius: 50%;
    margin-right: 10px;
    padding: 3px;
  }

  .active {
    border-top: 2px solid $pri;

    @media (max-width: $mobile) {
      border-bottom: none;
      font-weight: bold;
    }
  }

  .mobile-menu {
    display: none;
  }

  .icon {
    width: 25px;
    height: 25px;
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
