<script setup></script>

<template>
  <footer :class="s.footer">
    <div :class="s.topBorder"></div>
    <div :class="s.footerInner">
      <span :class="s.copyright">&copy; Timothy Harding 2024</span>
      <nav :class="s.nav">
        <ul :class="s.list">
          <li>
            <a :class="s.link" href="mailto:tim@timharding.co">
              <svg
                :class="s.icon"
                viewBox="0 -960 960 960"
                height="24px"
                width="24px"
              >
                <path
                  d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"
                />
              </svg>
            </a>
          </li>

          <li>
            <a :class="s.link" href="tel:+12068524199">
              <svg
                :class="s.icon"
                viewBox="0 -960 960 960"
                height="24px"
                width="24px"
              >
                <path
                  d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"
                />
              </svg>
            </a>
          </li>

          <li>
            <a :class="s.link" href="https://www.github.com/tim-harding">
              <svg
                :class="s.icon"
                viewBox="0 0 98 96"
                width="24px"
                height="24px"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              :class="s.link"
              href="https://www.linkedin.com/in/timothy-j-harding"
            >
              <svg
                :class="s.icon"
                viewBox="0 0 30 30"
                width="24px"
                height="24px"
              >
                <path
                  d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<style module="s">
.footer {
  display: grid;
  grid-template-columns:
    1fr var(--page-margin) minmax(0rem, var(--content-width))
    var(--page-margin)
    1fr;
  grid-template-rows: 4rem;
  margin-top: 3rem;
}

.topBorder {
  width: var(--content-width);
  max-width: 100%;
  grid-column-start: 2;
  grid-column-end: -2;
  justify-self: center;
  grid-row: 1;
  height: 2px;
  background-color: var(--surface-0);
}

.footerInner {
  grid-column: 3;
  grid-row: 1;
  display: grid;
  grid-template-columns: 1fr max-content;
  align-content: center;
}

.copyright {
  color: var(--overlay-2);
}

.nav {
  display: grid;
  grid-auto-flow: column;
  gap: 0.5rem;
  align-content: center;
}

.list {
  display: contents;
}

.link {
  display: grid;
  place-content: center;

  &:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
    border-radius: 0.1px;
  }

  &:hover > .icon {
    fill: var(--blue);
  }

  &:active > .icon {
    fill: var(--sky);
  }
}

.icon {
  fill: var(--overlay-0);
  transition: 125ms fill;
}
</style>
