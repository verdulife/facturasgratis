<script>
  import { userData } from "../../stores";

  let files;
  $: logo = $userData.logo;

  $: if (files) {
    let imageFile = files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
      $userData.logo = e.target.result;
    };

    reader.readAsDataURL(imageFile);
  }

  function removeLogo() {
    delete $userData.logo;
    $userData = $userData;
  }
</script>

<svelte:head>
  <title>Facturas gratis | Ajustes</title>
</svelte:head>

<div class="scroll">
  <section class="header col fcenter xfill">
    <h1>Tus datos de facturación</h1>
    <p>
      En <b>facturagratis</b>, no nos gusta guardar ningún dato, y menos unos tan sensibles como pueden ser los
      requeridos para hacer facturas. Así pues todos los datos introducidos aquí, solo se guardaran en este navegador.
    </p>
  </section>

  {#if $userData}
    <div class="info col acenter xfill">
      <div class="box round col xfill">
        <h2>Logotipo</h2>
        <p class="notice">Si usas logotipo en tus facturas, presupuestos o albaranes, aqui es el sitio.</p>

        <div class="row xfill">
          <label for="logo" class="file-btn">SUBIR IMÁGEN</label>

          {#if logo}
            <div class="file-btn remove-btn" on:click={removeLogo}>BORRAR IMÁGEN</div>
          {/if}
        </div>

        <input type="file" id="logo" accept="image/png, image/jpeg" bind:files class="xfill" />

        {#if logo}
          <div class="logo-wrapper row fcenter xfill">
            <img src={logo} alt={$userData.legal_name || "Logotipo"} />
          </div>
        {/if}
      </div>

      <div class="box round col xfill">
        <h2>Datos legales</h2>
        <p class="notice">Los campos marcados con un 👈 son obliquos.</p>

        <div class="input-wrapper col xfill">
          <label for="legal_name">Nombre fiscal 👈</label>
          <input
            type="text"
            id="legal_name"
            bind:value={$userData.legal_name}
            class="xfill"
            placeholder="Ej. Factura Gratis S.L."
            required
          />
        </div>

        <div class="input-wrapper col xfill">
          <label for="legal_id">CIF/NIF 👈</label>
          <input
            type="text"
            id="legal_id"
            bind:value={$userData.legal_id}
            class="xfill"
            placeholder="Ej. B00011100"
            required
          />
        </div>
      </div>

      <div class="box round col xfill">
        <h2>Dirección fiscal</h2>
        <p class="notice">Los campos marcados con un 👈 son obliquos.</p>

        <div class="input-wrapper col xfill">
          <label for="street_kind">Tipo de via 👈</label>
          <input
            type="text"
            id="street_kind"
            bind:value={$userData.street_kind}
            class="xfill"
            placeholder="Ej. Calle"
            required
          />
        </div>

        <div class="input-wrapper col xfill">
          <label for="street_name">Nombre de la via 👈</label>
          <input
            type="text"
            id="street_name"
            bind:value={$userData.street_name}
            class="xfill"
            placeholder="Ej. Mayor"
            required
          />
        </div>

        <div class="input-wrapper col xfill">
          <label for="street_number">Número 👈</label>
          <input
            type="text"
            id="street_number"
            bind:value={$userData.street_number}
            class="xfill"
            placeholder="Ej. 16"
            required
          />
        </div>

        <div class="input-wrapper col xfill">
          <label for="cp">Código postal 👈</label>
          <input type="text" id="cp" bind:value={$userData.cp} class="xfill" placeholder="Ej. 08818" required />
        </div>

        <div class="input-wrapper col xfill">
          <label for="city">Población 👈</label>
          <input type="text" id="city" bind:value={$userData.city} class="xfill" placeholder="Ej. Barcelona" required />
        </div>

        <div class="input-wrapper col xfill">
          <label for="country">País 👈</label>
          <input
            type="text"
            id="country"
            bind:value={$userData.country}
            class="xfill"
            placeholder="Ej. España"
            required
          />
        </div>
      </div>

      <div class="box round col xfill">
        <h2>Contacto</h2>
        <p class="notice">Puedes rellenar ambos campos, pero con uno es suficiente</p>

        <div class="input-wrapper col xfill">
          <label for="phone">Teléfono</label>
          <input
            type="text"
            id="phone"
            bind:value={$userData.phone}
            class="xfill"
            placeholder="Ej. 600 600 600"
            required
          />
        </div>

        <div class="input-wrapper col xfill">
          <label for="email">Correo electrónico</label>
          <input
            type="text"
            id="email"
            bind:value={$userData.email}
            class="xfill"
            placeholder="Ej. hola@facturagratis.com"
            required
          />
        </div>
      </div>

      <div class="box round col xfill">
        <h2>Impuestos</h2>
        <p class="notice">
          Selecciona el tipo de IVA y retención. Si no rellenas el campo de la retención, no la aplicaremos.
        </p>

        <div class="input-wrapper col xfill">
          <label for="iva">IVA</label>
          <select id="iva" bind:value={$userData.iva} class="xfill" required>
            <option value="21">21%</option>
            <option value="10">10%</option>
            <option value="4">4%</option>
          </select>
        </div>

        <div class="input-wrapper col xfill">
          <label for="ret">Retención (%)</label>
          <input type="number" id="ret" bind:value={$userData.ret} class="xfill" placeholder="Ej. 15" required />
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .header {
    background: linear-gradient(45deg, $pri 50%, $sec);
    text-align: center;
    color: $white;
    padding: 80px;

    @media (max-width: $mobile) {
      padding: 40px;
    }

    h1 {
      max-width: 900px;
      font-size: 5vh;
      line-height: 1;
      margin-bottom: 40px;

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

  .info {
    padding: 60px;

    @media (max-width: $mobile) {
      padding: 20px 10px;
    }
  }

  .box {
    max-width: 900px;
    margin-bottom: 40px;
    padding: 20px;

    @media (max-width: $mobile) {
      margin-bottom: 10px;
    }

    .notice {
      font-size: 14px;
      margin-bottom: 40px;

      @media (max-width: $mobile) {
        font-size: 12px;
        margin-bottom: 30px;
      }
    }

    .input-wrapper {
      margin-bottom: 30px;

      @media (max-width: $mobile) {
        margin-bottom: 20px;
      }
    }

    label {
      text-transform: uppercase;
      color: $pri;
      font-size: 12px;
      padding: 0 15px;
    }

    input,
    select {
      font-size: 16px;
      border-bottom: 1px solid $sec;
      border-radius: 0;

      &:focus {
        border-color: $pri;
      }

      @media (max-width: $mobile) {
        font-size: 14px;
      }
    }

    input[type="file"] {
      display: none;
    }

    .logo-wrapper {
      background: $sec;
      border-radius: 0.5em;

      img {
        max-width: 100%;
        height: 250px;
        object-fit: contain;
        object-position: center;
      }
    }

    .file-btn {
      cursor: pointer;
      display: block;
      background-color: $pri;
      font-size: 12px;
      font-weight: bold;
      color: $white;
      border: 2px solid transparent;
      border-radius: 0.4em;
      padding: 0.9em 2em;
      margin: 0 10px 10px 0;
      user-select: none;
      -webkit-user-drag: none;
      transition: 200ms;

      &:hover {
        transform: scale(0.95);
      }
    }

    .remove-btn {
      background: transparent;
      color: $pri;
      border-color: $pri;
    }
  }
</style>
