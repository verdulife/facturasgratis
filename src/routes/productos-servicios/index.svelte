<script>
  import { fade, slide } from "svelte/transition";
  import { userData, products } from "../../lib/stores";
  import { roundWithTwoDecimals } from "../../lib/functions";
  import { tools } from "../../lib/utils";

  let productsData = [...$products];
  let productData = {};
  let modal = false;
  let searchTerm = "";

  function togModal() {
    modal = !modal;
  }

  $: filteredProducts = productsData.filter((product) => {
    const term = searchTerm.toLowerCase();
    const byName = product.label.toLowerCase();
    const byId = `${product.price}`.toLowerCase();

    return byName.indexOf(term) !== -1 || byId.indexOf(term) !== -1;
  });

  function clearFilters() {
    searchTerm = "";
  }

  function deleteProduct(product) {
    const check = confirm("Este producto/servicio se borrara de la lista pero no de los documentos que lo contengan.\n\n¿Borrar definitivamente?");

    if (check) {
      $products.splice($products.indexOf(product), 1);
      $userData._updated = new Date();
      $products = $products;
      productsData = [...$products];
    }
  }

  function pushProduct() {
    if (!$products.some((p) => p.label === productData.label && p.price === productData.price)) {
      productData._id = Date.now().toString();

      $userData._updated = new Date();
      $products = [...$products, productData];
      productsData = [...$products];
      productData = {};

      togModal();
    } else {
      alert("⚠ Este producto/servicio ya existe");
    }
  }
</script>

<svelte:head>
  <title>Productos y servicios | Facturas gratis</title>
  <meta property="og:title" content="Productos y servicios | Facturas gratis" />
  <meta property="og:site_name" content="Facturas gratis" />

  <meta
    name="description"
    content="Herramientas online gratuitas para generar, enviar, rectificar y listar facturas, presupuestos, albaranes,
  clientes, proveedores y productos/servicios."
  />
  <meta
    property="og:description"
    content="Herramientas online gratuitas para generar, enviar, rectificar y listar facturas, presupuestos, albaranes,
  clientes, proveedores y productos/servicios."
  />
</svelte:head>

<div class="scroll">
  <section class="header col fcenter xfill">
    <img src="/productos-servicios.svg" alt="Productos y servicios" />
    <h1>{tools[4].title}</h1>
    <p>{tools[4].desc}</p>
  </section>

  {#if $userData.legal_name !== undefined}
    <div class="list-filter col acenter xfill">
      {#if productsData.length <= 0}
        <button class="succ semi" on:click={togModal}>CREA TU PRIMER PRODUCTO</button>
      {:else}
        <button class="new-btn succ semi" on:click={togModal}>NUEVO PRODUCTO</button>

        <div class="filter-wrapper row xfill">
          <input type="text" class="out grow" bind:value={searchTerm} placeholder="Buscar por nombre o precio" />
          <div class="clear-btn row fcenter" on:click={clearFilters}>🗑</div>
        </div>
      {/if}
    </div>

    <ul class="bill-list col acenter xfill">
      {#if filteredProducts.length <= 0 && productsData.length > 0}
        <p>No hay coincidencias</p>
      {/if}

      {#each filteredProducts as product}
        <li class="box round row acenter xfill nowrap">
          <div class="row aend grow nowrap">
            <h4 class="grow nowrap">{product.label}</h4>
            <p>{roundWithTwoDecimals(product.price).toFixed(2)}{$userData.currency}</p>
          </div>

          <div class="icon row fcenter" on:click={() => deleteProduct(product)}>🗑</div>
        </li>
      {/each}
      <div class="fix-bottom row xfill" />
    </ul>

    {#if modal}
      <div class="outer" on:click={togModal} transition:fade />
      <div class="modal box round" transition:slide>
        <form class="col" on:submit|preventDefault={pushProduct}>
          <div class="col xfill">
            <label for="productLabel">NOMBRE</label>
            <input class="xfill" id="productLabel" type="text" bind:value={productData.label} placeholder="Ej. Hora de trabajo" required />
          </div>

          <div class="col xfill">
            <label for="productPrice">PRECIO € (sin impuestos)</label>
            <input class="xfill" type="number" step="0.01" bind:value={productData.price} placeholder="Ej. 25€" required />
          </div>

          <div class="row fcenter xfill">
            <button class="succ semi">CREAR</button>
            <button class="out semi" on:click={togModal}>CANCELAR</button>
          </div>
        </form>
      </div>
    {/if}
  {:else}
    <div class="first col acenter xfill">
      <h2>Primeros pasos</h2>
      <p>Para poder empezar a generar productos, primero tienes que rellenar tus datos</p>
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

      &:nth-of-type(even) {
        background: $bg;
      }

      &:hover {
        background: lighten($border, 10%);
      }

      .row {
        padding: 1em;
      }

      .icon {
        cursor: pointer;
        width: 59px;
        min-width: 59px;
        height: 59px;
      }
    }

    .fix-bottom {
      height: 40px;
      pointer-events: none;
      user-select: none;
    }
  }

  .outer,
  .modal {
    position: absolute;
    bottom: 0;
    left: 0;
    transition: 200ms;
    z-index: 9;
  }

  .outer {
    cursor: zoom-out;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(2px);
  }

  .modal {
    bottom: 50%;
    right: 0;
    transform: translateY(50%);
    margin: 0 auto;
    width: 100%;
    max-width: 400px;
    background: $white;
    padding: 40px 30px;

    @media (max-width: $mobile) {
      bottom: 0;
      transform: unset;
    }

    label {
      font-size: 12px;
      margin-bottom: 5px;
    }

    input {
      border-bottom: 1px solid $border;
      margin-bottom: 30px;

      &:focus {
        border-color: $pri;
      }
    }

    button {
      font-size: 14px;
      margin: 0 5px;
    }
  }
</style>
