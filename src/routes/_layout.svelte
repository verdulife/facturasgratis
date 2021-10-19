<script>
  import { ui } from "../ui/layout";
  import { detectAnyAdblocker } from "just-detect-adblock";
  import Nav from "../components/Nav.svelte";
  import Cookies from "../components/Cookies.svelte";
  import { onMount } from "svelte";

  export let segment;

  onMount(async () => {
    const detected = await detectAnyAdblocker();
    if (detected) {
      console.log("Adblock detected");

      const label = document.createElement("div");
      label.classList.add("box");
      label.classList.add("round");
      label.innerHTML = `
        <h3 style="font-size: 26px"><b style="font-size: 40px">${ui.adblock.title}</h3>
        <h-div style="margin: 15px 0"></h-div>
        <p>${ui.adblock.description}</p>
      `;

      window.addEventListener("mousemove", (e) => {
        label.style.cssText = `
          position: fixed;
          top: ${e.clientY}px;
          left: ${e.clientX}px;
          width: 350px;
          z-index: 999;
        `;
      });

      document.body.appendChild(label);
    }
  });
</script>

<main>
  <Nav {segment} />

  <div class="view fill">
    <slot />
  </div>

  <footer class="row fcenter xfill">
    <p>
      {ui.footer.author} &nbsp;|&nbsp;&nbsp;
      <a href="/privacidad">{ui.footer.privacy_link}</a>
      <span class="not-mobile">
        &nbsp;&nbsp;|&nbsp;
        <a href="mailto:facturasgratis.app@gmail.com">{ui.footer.email}</a>
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
