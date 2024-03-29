<script>
  import { userData, providers } from "../../lib/stores";
  import { tools } from "../../lib/utils";
  import { proveedores } from "../../lib/metadata";

  let providersData = [...$providers];
  let searchTerm = "";

  $: filteredProviders = providersData.filter((provider) => {
    const term = searchTerm.toLowerCase();
    const byName = provider.legal_name.toLowerCase();
    const byId = provider.legal_id.toLowerCase();

    return byName.indexOf(term) !== -1 || byId.indexOf(term) !== -1;
  });

  function clearFilters() {
    searchTerm = "";
  }
</script>

<svelte:head>
  <title>{proveedores.title}</title>
  <meta name="description" content={proveedores.description} />
  <meta name="keywords" content={proveedores.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={proveedores.url} />
  <meta property="og:title" content={proveedores.title} />
  <meta property="og:description" content={proveedores.description} />
  <meta property="og:image" content={proveedores.image} />
  <meta property="og:image:secure_url" content={proveedores.image} />
  <meta property="og:image:type" content="image/jpeg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={proveedores.url} />
  <meta name="twitter:title" content={proveedores.title} />
  <meta name="twitter:description" content={proveedores.description} />
  <meta name="twitter:image" content={proveedores.image} />
</svelte:head>

<div class="scroll">
  <article class="header col fcenter xfill">
    <img src="/proveedores.svg" alt="Proveedores" />
    <h1>{tools[6].title}</h1>
    <p>{tools[6].desc}</p>

    <a href="/" class="btn outwhite semi">VOLVER</a>
  </article>

  {#if $userData.legal_name !== undefined}
    <div class="list-filter col acenter xfill">
      {#if providersData.length <= 0}
        <a class="btn succ semi" href="/proveedores/nueva">CREA TU PRIMER PROVEEDOR</a>
      {:else}
        <a class="new-btn btn succ semi" href="/proveedores/nueva">NUEVO PROVEEDOR</a>

        <div class="filter-wrapper row xfill">
          <input type="text" class="out grow" bind:value={searchTerm} placeholder="Buscar por nombre o CIF/NIF" />
          <div class="clear-btn row fcenter" on:click={clearFilters}>🗑</div>
        </div>
      {/if}
    </div>

    <ul class="bill-list col acenter xfill">
      {#if filteredProviders.length <= 0 && providersData.length > 0}
        <p>No hay coincidencias</p>
      {/if}

      {#each filteredProviders as provider}
        <li class="box round col xfill">
          <a href="/proveedores/{provider._id}" class="col xfill">
            <div class="title row xfill">
              <div class="col grow">
                <h4>{provider.legal_name}</h4>
                <p>{provider.legal_id}</p>
              </div>
            </div>
          </a>

          <a class="btn xfill" href={(provider.contact.includes("@") ? "mailto:" : "tel:") + provider.contact}>
            <b>{provider.contact.includes("@") ? "✉" : "📞"} {provider.contact}</b>
          </a>
        </li>
      {/each}
      <div class="fix-bottom row xfill" />
    </ul>
  {:else}
    <div class="first col acenter xfill">
      <h2>Primeros pasos</h2>
      <p>Para poder empezar a generar proveedores, primero tienes que rellenar tus datos</p>
      <br />
      <a href="/ajustes" class="btn pri semi">RELLENAR DATOS</a>
    </div>
  {/if}
</div>

<style lang="scss">
  .header {
    background: linear-gradient(45deg, $pri 50%, $sec);
    text-align: center;
    color: $white;
    padding: 60px;

    @media (max-width: $mobile) {
      padding: 40px;
    }

    img {
      width: 100px;
      margin-bottom: 20px;
    }

    h1 {
      max-width: 900px;
      font-size: 5vh;
      line-height: 1;
      margin-bottom: 20px;

      @media (max-width: $mobile) {
        margin-bottom: 20px;
      }
    }

    p {
      max-width: 900px;
      font-size: 18px;
      color: $sec;
      margin-bottom: 40px;

      @media (max-width: $mobile) {
        font-size: 14px;
      }
    }
  }

  .new-btn {
    margin-bottom: 40px;
  }

  .list-filter,
  .bill-list {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    padding-bottom: 0px;

    @media (max-width: $mobile) {
      padding: 20px;
    }
  }

  .list-filter {
    .filter-wrapper {
      align-items: stretch;

      input {
        background: $white;
      }

      .clear-btn {
        cursor: pointer;
        width: 48px;
        background: $border;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        color: $base;
        border: 1px solid $border;
        user-select: none;
        -webkit-user-drag: none;
      }

      @media (max-width: $mobile) {
        input {
          width: calc(100% - 48px);
        }
      }
    }
  }

  .first {
    text-align: center;
    padding: 40px;

    a.btn.pri {
      color: $white !important;
    }
  }

  .bill-list {
    li {
      padding: 0;
      margin-bottom: 5px;
      transition: 200ms;
      overflow: hidden;

      &:nth-of-type(even) {
        background: $bg;
      }

      a {
        padding: 1em;

        &:hover {
          background: lighten($border, 10%);
        }
      }

      a.btn {
        text-decoration: none;
        border-top: 1px solid $border;

        &:hover {
          background: $success;
          transform: unset;
        }
      }
    }

    .fix-bottom {
      height: 40px;
      pointer-events: none;
      user-select: none;
    }
  }
</style>
