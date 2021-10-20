<script>
  import { ui } from "../ui/home";
  import { tools } from "../lib/utils";
  import { home } from "../lib/metadata";
  import { userData } from "../lib/stores";
  import { tips } from "../lib/tips";
  import { shuffleArray } from "../lib/functions";

  const sortedTools = [...tools].sort((a, b) => {
    if (a.sort_index < b.sort_index) return -1;
    if (a.sort_index > b.sort_index) return 1;
    return 0;
  });

  sortedTools.map((s, i) => {
    s.sort_index = s.sort_index ? s.sort_index : i;
  });

  $userData.tools_sort = [];
  /*
  $userData.tools_sort = $userData.tools_sort ? $userData.tools_sort : [];
  sortedTools.forEach((t) => {
    const user_sort = {
      tool: t.slug,
      sort_index: t.sort_index,
    };

    $userData.tools_sort = [...$userData.tools_sort, user_sort];
  }); */

  const BASE_URL = "https://www.facturasgratis.ml";
  shuffleArray(tips);

  let fromSortIndex;
  function dragOver() {}

  function dragStart(tool) {
    fromSortIndex = {
      tool,
      index: tool.sort_index,
    };
  }

  function dragDrop(tool) {
    sortedTools[sortedTools.indexOf(fromSortIndex.tool)].sort_index = tool.sort_index;
    sortedTools[sortedTools.indexOf(tool)].sort_index = fromSortIndex.index;

    sortedTools.sort((a, b) => {
      if (a.sort_index < b.sort_index) return -1;
      if (a.sort_index > b.sort_index) return 1;
      return 0;
    });

    /* sortedTools.forEach((t) => {
      const user_sort = {
        tool: t.slug,
        sort_index: t.sort_index,
      };

      $userData.tools_sort = [...$userData.tools_sort, user_sort];
    }); */
  }
</script>

<svelte:head>
  <title>{home.title}</title>
  <meta name="description" content={home.description} />
  <meta name="keywords" content={home.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={home.url} />
  <meta property="og:title" content={home.title} />
  <meta property="og:description" content={home.description} />
  <meta property="og:image" content={home.image} />
  <meta property="og:image:secure_url" content={home.image} />
  <meta property="og:image:type" content="image/jpeg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={home.url} />
  <meta name="twitter:title" content={home.title} />
  <meta name="twitter:description" content={home.description} />
  <meta name="twitter:image" content={home.image} />
</svelte:head>

<div class="scroll">
  <article class="header col fcenter xfill">
    <h1>{ui.header.title}</h1>
    <p>{@html ui.header.description}</p>

    {#if process.browser && Object.keys($userData).length <= 0}
      <h2>{ui.header.first_steps.title}</h2>
      <p>{@html ui.header.first_steps.description}</p>
    {/if}

    <a href="/ajustes" class="btn succ semi">{ui.header.button}</a>
  </article>

  <article>
    <ul class="tools row jcenter xfill">
      {#each sortedTools as tool}
        <li class="box round col acenter">
          <a class="fill" href={tool.slug} draggable="true" on:dragstart={() => dragStart(tool)} on:dragover|preventDefault={dragOver} on:drop={() => dragDrop(tool)}>
            <div class="icon">
              <img width="50" height="50" src={tool.icon} alt={tool.title} title={tool.title} />
            </div>

            <h2 class="xfill">{tool.title}</h2>
            <p>{tool.desc}</p>

            {#if tool.soon}
              <div class="label-tag">{ui.tools.soon_label}</div>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </article>

  <article class="tips col acenter xfikk">
    <h2>{ui.tips.title}</h2>
    <p>{ui.tips.description}</p>

    <div class="grid">
      {#each tips as tip}
        <div class="box round col">
          <h3>{tip.title}</h3>
          <p>{@html tip.description}</p>
        </div>
      {/each}
    </div>
  </article>
</div>

<style lang="scss">
  .header {
    background: linear-gradient(45deg, $pri 50%, $sec);
    text-align: center;
    color: $white;
    padding: 60px 40px;

    @media (max-width: $mobile) {
      padding: 40px 20px;
    }

    h1 {
      max-width: 900px;
      font-size: 3vw;
      line-height: 1.2;
      margin-bottom: 40px;

      @media (max-width: $mobile) {
        font-size: 5vh;
        margin-bottom: 20px;
      }
    }

    p {
      max-width: 900px;
      font-size: 18px;
      color: $sec;
      margin-bottom: 20px;

      @media (max-width: $mobile) {
        font-size: 14px;
      }
    }

    a.btn {
      min-width: 200px;
    }
  }

  .tools {
    max-width: 1400px;
    margin: 0 auto;
    align-items: stretch;
    padding: 40px;
    padding-bottom: 100px;

    @media (max-width: $mobile) {
      padding: 40px 5px;
    }

    li {
      cursor: pointer;
      position: relative;
      width: 25%;
      min-width: 250px;
      margin: 3px;
      padding: 0;
      transition: 200ms;

      @media (max-width: $mobile) {
        width: calc(50% - 2px);
        min-width: 0;
        margin: 1px;
      }

      &:hover {
        background: lighten($border, 10%);
      }

      a {
        padding: 20px;
      }

      .icon {
        margin-bottom: 10px;
      }

      h2 {
        margin-bottom: 10px;
        line-height: 1;

        @media (max-width: $mobile) {
          font-size: 18px;
        }
      }

      p {
        @media (max-width: $mobile) {
          font-size: 12px;
        }
      }

      .label-tag {
        position: absolute;
        top: 10px;
        right: 10px;
        background: $error;
        font-size: 10px;
        text-transform: uppercase;
        color: $white;
        border-radius: 5px;
        padding: 2px 5px;
        z-index: 9;
      }
    }
  }

  .tips {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    padding-bottom: 100px;

    h2 {
      font-size: 2vw;
      text-align: center;
      margin-bottom: 10px;

      @media (max-width: $mobile) {
        font-size: 4vh;
      }
    }

    p {
      text-align: center;
      margin-bottom: 40px;
    }

    .grid {
      column-count: 3;
      column-gap: 20px;

      @media (max-width: $mobile) {
        column-count: 1;
      }

      .box {
        -webkit-column-break-inside: avoid;
        page-break-inside: avoid;
        break-inside: avoid;
        margin-bottom: 20px;
        padding-top: 30px;
        padding-bottom: 30px;

        h3 {
          margin-bottom: 10px;
        }

        p {
          text-align: left;
          margin: 0;
        }
      }
    }
  }
</style>
