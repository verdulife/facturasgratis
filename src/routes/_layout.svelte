<script context="module">
  export async function preload(page, session) {
    const { locale } = session;
    const def = "en";

    if (locale !== "es") return { locale: def };
    else return { locale: "es" };
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import { l } from "../lib/stores";
  import Nav from "../components/Nav.svelte";
  import Cookies from "../components/Cookies.svelte";

  export let segment, locale;
  $l = locale;
</script>

<svelte:head>
  <html lang={$l} />
</svelte:head>

<main>
  <Nav {segment} />

  <div class="view fill">
    <slot />
  </div>

  <footer class="row fcenter xfill">
    <p>
      Made with ♥ by verdu on 2021 &nbsp;|&nbsp;&nbsp;
      <a href="/privacidad">Politica de privacidad</a>
      <span class="not-mobile">
        &nbsp;&nbsp;|&nbsp;
        <a href="mailto:facturasgratis.app@gmail.com">¿Tienes alguna sugerencia?</a>
      </span>
    </p>
  </footer>

  <Cookies />
</main>

<style lang="scss" global>
  @import "../reset";
  @import "../../node_modules/verdu/verdu";

  .view {
    height: calc(100% - 95px);
  }

  footer {
    height: 30px;
    background: $pri;
    color: $white;
    font-size: 12px;
    margin-top: auto;

    a {
      color: $sec;
    }

    @media (max-width: $mobile) {
      span {
        display: none;
      }
    }
  }

  .box {
    background: $white;
  }

  .autocomplete {
    width: 100% !important;
    height: auto !important;
  }

  .autocomplete-input {
    width: 100% !important;
    background: transparent !important;
    color: $base !important;
    font-size: 16px !important;
    border: 1px solid $border !important;
    padding: 0.9em 1em !important;
    transition: 200ms !important;
  }

  .autocomplete-list {
    top: unset !important;
    width: 100% !important;
  }

  .autocomplete-list-item {
    width: 100% !important;
  }
</style>
