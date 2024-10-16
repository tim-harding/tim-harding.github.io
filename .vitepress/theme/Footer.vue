<script setup></script>

<template>
  <footer :class="s.footer">
    <div :class="s.footerInner">
      <span :class="s.copyright">&copy; Timothy Harding 2024</span>
      <nav :class="s.nav">
        <ul :class="s.ul">
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
        </ul>
      </nav>
    </div>
  </footer>
</template>

<style lang="scss" module="s">
.footer {
  display: grid;
  grid-template-columns: 1fr minmax(0rem, calc(var(--page-width) + 2rem)) 1fr;
  grid-template-areas: ". center .";
}

.footerInner {
  grid-area: center;
  display: grid;
  grid-template-columns: 1fr max-content;
  border-top: 2px solid var(--surface-0);
  align-content: center;
  height: 4rem;
}

.copyright {
  color: var(--overlay-2);
}

ul {
  display: contents;
}

nav {
  display: grid;
  grid-auto-flow: column;
  gap: 0.5rem;
  align-content: center;
}

a {
  display: grid;
  place-content: center;

  &:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
    border-radius: 0.1px;
  }

  &:hover > svg {
    fill: var(--blue);
  }

  &:active > svg {
    fill: var(--sky);
  }
}

svg {
  fill: var(--overlay-0);
  transition: 125ms fill;
}
</style>
