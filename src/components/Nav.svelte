<script>
  import { ui } from "../ui/nav";
  import { userData } from "../lib/stores";
  import { tools } from "../lib/utils";
  import { slide } from "svelte/transition";

  export let segment;

  let mobileMenu = false;
  function togMenu() {
    mobileMenu = !mobileMenu;
  }
</script>

<nav class="row jbetween acenter xfill">
  <a href="/" class="row acenter">
    <img
      width="190"
      height="32"
      class="logo"
      src="/logo.svg"
      alt="facturasgratis"
    />
  </a>

  <ul class="desktop-menu row yfill">
    <li class="row acenter yfill">
      <a href="/" class="row acenter yfill">{ui.home_link}</a>

      <ul class="expand-menu col">
        {#each tools as { slug, title, icon }}
          <li class="xfill" class:active={segment === slug}>
            <a href={slug} class="row nowrap acenter fill">
              <img
                loading="lazy"
                width="20"
                height="20"
                src={icon}
                alt={title}
              />
              <p>{title}</p>
            </a>
          </li>
        {/each}
      </ul>
    </li>

    <li class="row acenter yfill">
      <a href="/ajustes" class="row acenter yfill">
        {#if $userData.logo}
          <img
            class="user-img"
            src={$userData.logo}
            alt={$userData.legal_name || "Logotipo"}
          />
        {/if}
        {$userData.legal_name || ui.user_link}
      </a>
    </li>
  </ul>

  <div class="mobile-menu row yfill">
    <div class="icon" on:click={togMenu}>
      <img class="fill" src="menu.svg" alt="Menú" />
    </div>
    {#if mobileMenu}
      <ul class="scroll" transition:slide>
        <li class="row acenter xfill" on:click={togMenu}>
          <a href="/" class="row acenter yfill">{ui.home_link}</a>
        </li>

        {#each tools as { slug, title, icon }}
          <li class="xfill" class:active={segment === slug} on:click={togMenu}>
            <a href={slug} class="row nowrap acenter fill">
              <img loading="lazy" src={icon} alt={title} />
              <p>{title}</p>
            </a>
          </li>
        {/each}

        <li class="row acenter xfill" on:click={togMenu}>
          <a href="/ajustes" class="row acenter yfill">
            {#if $userData.logo}
              <img
                class="user-img"
                src={$userData.logo}
                alt={$userData.legal_name || "Logotipo"}
              />
            {/if}
            {$userData.legal_name || ui.user_link}
          </a>
        </li>
      </ul>
    {/if}
  </div>
</nav>

<style lang="scss">
  nav {
    height: 65px;
    background: $white;
    border-bottom: 1px solid $border;
    padding: 0 40px;

    @media (max-width: $mobile) {
      padding: 0 20px;
    }
  }

  li {
    cursor: pointer;
    position: relative;
    padding: 0 20px;

    .expand-menu {
      position: absolute;
      top: 100%;
      left: 0;
      background: $white;
      opacity: 0;
      pointer-events: none;
      z-index: 999;
      transition: 200ms;

      li {
        height: 40px;
        border-bottom: 1px solid $border;
        padding: 0.5em 1em;
        transition: 200ms;

        &:hover {
          background: lighten($border, 10%);
        }

        &:last-of-type {
          border-bottom: none;
        }

        img {
          object-fit: cover;
          margin-right: 10px;
        }
      }
    }

    &:hover {
      background: lighten($border, 10%);

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
    border: 1px solid $border;
    border-radius: 50%;
    margin-right: 10px;
    padding: 3px;
  }

  .active {
    border-left: 4px solid $pri;

    @media (max-width: $mobile) {
      font-weight: bold;
    }
  }

  .mobile-menu {
    display: none;

    .icon {
      width: 65px;
      height: 65px;

      img {
        object-fit: contain;
        padding: 20px;
        padding-right: 0;
      }
    }

    ul {
      position: fixed;
      top: 65px;
      right: 0;
      height: calc(100% - 65px);
      background: $white;
      z-index: 999;

      li {
        border-bottom: 1px solid $border;
        padding: 20px 20px;

        &:first-of-type {
          justify-content: center;
        }

        &:last-of-type {
          position: sticky;
          bottom: 0;
          left: 0;
          background: $white;
          border-top: 1px solid $border;
          border-bottom: none;
          justify-content: center;
          margin-top: -1px;
        }

        img {
          width: 30px;
          height: 30px;
          object-fit: contain;
          margin-right: 10px;
        }
      }
    }
  }

  @media (max-width: $mobile) {
    .desktop-menu {
      display: none;
    }

    .mobile-menu {
      display: flex;
    }
  }
</style>
