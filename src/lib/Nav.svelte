<script>
  import { page } from "$app/stores";
  import { slide } from "svelte/transition";
  import { userData } from "../stores";

  let mobileMenu = false;

  function togMenu() {
    mobileMenu = !mobileMenu;
  }
</script>

<nav class="row jbetween acenter xfill">
  <a href="/" class="row acenter">
    <img class="logo" src="/logo.svg" alt="facturasgratis" />
  </a>

  <ul class="desktop-menu row yfill">
    <li class="row acenter yfill" class:active={$page.path === "/"}>
      <a href="/" class="row acenter yfill">Herramientas</a>
    </li>

    <li class="row acenter yfill" class:active={$page.path === "/facturas" || $page.path === "/presupuestos" || $page.path === "/albaranes"}>
      <p>Crear</p>
      <ul class="expand-menu col">
        <li class="xfill"><a href="/facturas" class="row acenter fill">Facturas</a></li>
        <li class="xfill"><a href="/presupuestos" class="row acenter fill">Presupuestos</a></li>
        <li class="xfill"><a href="/albaranes" class="row acenter fill">Albaranes</a></li>
      </ul>
    </li>

    <li class="row acenter yfill" class:active={$page.path === "/clientes" || $page.path === "/productos-servicios" || $page.path === "/proveedores"}>
      <p>Listas</p>
      <ul class="expand-menu col">
        <li class="xfill"><a href="/clientes" class="row acenter fill">Clientes</a></li>
        <li class="xfill"><a href="/productos-servicios" class="row acenter fill">Productos/servicios</a></li>
        <li class="xfill"><a href="/proveedores" class="row acenter fill">Proveedores</a></li>
      </ul>
    </li>

    <li class="row acenter yfill" class:active={$page.path === "/ajustes"}>
      <a href="/ajustes" class="row acenter yfill">
        {#if $userData.logo}
          <img class="user-img" src={$userData.logo} alt={$userData.legal_name || "Logotipo"} />
        {/if}
        {$userData.legal_name || "Ajustes"}
      </a>
    </li>
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
    cursor: pointer;
    position: relative;
    padding: 0 20px;

    .expand-menu {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: $white;
      opacity: 0;
      pointer-events: none;
      z-index: 999;
      transition: 200ms;

      li {
        height: 50px;
        border-bottom: 1px solid $border;
        padding: 0.5em 1em;
        transition: 200ms;

        &:hover {
          background: $border;
        }

        &:last-of-type {
          border-bottom: none;
        }
      }
    }

    &:hover {
      background: $border;

      .expand-menu {
        opacity: 1;
        pointer-events: all;
      }
    }
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
    background: $border;

    @media (max-width: $mobile) {
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
