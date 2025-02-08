<template>
  <div :class="s.scout">
    <p :class="s.text">
      Want to become a better programmer?
      <a
        :class="s.link"
        href="https://www.recurse.com/scout/click?t=a21df08a3f568a8f8bf05c4351482d42"
        >Join the Recurse Center
        <svg width="14" height="14" viewBox="0 0 12 15" :class="s.logo">
          <rect x="0" y="0" width="12" height="10" fill="#000"></rect>
          <rect x="1" y="1" width="10" height="8" fill="#fff"></rect>
          <rect x="2" y="2" width="8" height="6" fill="#000"></rect>
          <rect x="2" y="3" width="1" height="1" fill="#3dc06c"></rect>
          <rect x="4" y="3" width="1" height="1" fill="#3dc06c"></rect>
          <rect x="6" y="3" width="1" height="1" fill="#3dc06c"></rect>
          <rect x="3" y="5" width="2" height="1" fill="#3dc06c"></rect>
          <rect x="6" y="5" width="2" height="1" fill="#3dc06c"></rect>
          <rect x="4" y="9" width="4" height="3" fill="#000"></rect>
          <rect x="1" y="11" width="10" height="4" fill="#000"></rect>
          <rect x="0" y="12" width="12" height="3" fill="#000"></rect>
          <rect x="2" y="13" width="1" height="1" fill="#fff"></rect>
          <rect x="3" y="12" width="1" height="1" fill="#fff"></rect>
          <rect x="4" y="13" width="1" height="1" fill="#fff"></rect>
          <rect x="5" y="12" width="1" height="1" fill="#fff"></rect>
          <rect x="6" y="13" width="1" height="1" fill="#fff"></rect>
          <rect x="7" y="12" width="1" height="1" fill="#fff"></rect>
          <rect x="8" y="13" width="1" height="1" fill="#fff"></rect>
          <rect x="9" y="12" width="1" height="1" fill="#fff"></rect>
        </svg>
      </a>
    </p>
  </div>
</template>

<style module="s">
.scout {
  display: block;
  padding: 0;
  border: 0;
  margin: 0;
}

.text {
  display: block;
  padding: 0;
  border: 0;
  margin: 0;
  height: 100%;
  font-size: 100%;
}

.logo {
  display: inline-block;
  width: 0.85rem;
  height: 0.85rem;
  margin-left: 0.125rem;
}
</style>
