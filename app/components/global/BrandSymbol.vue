<template>
  <NuxtLink class="brand-symbol" to="/" aria-label="André Oliveira">
    <svg width="48" height="72" viewBox="0 0 48 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.2423 66.5217L13.2423 58.2443L7.14251e-07 63.7225L3.52492e-07 72L13.2423 66.5217Z" fill="#2B00F7"/>
    <path d="M9.53674e-07 24L5.91915e-07 32.2775L13.2423 37.7557L13.2423 29.4783L9.53674e-07 24Z" fill="#2B00F7"/>
    <path d="M16.8818 65.0149L19.8591 63.7809L28.1324 60.3565L48 52.137L48 43.8637L28.1365 35.6442L19.8632 32.2197L13.2421 29.4785L13.2421 66.5221L16.886 65.0149L16.8818 65.0149ZM28.1365 43.9175L37.9999 48.0003L28.1365 52.0832L21.5154 54.8202L21.5154 41.1804L28.1365 43.9175Z" fill="#2E2E2E"/>
    <rect x="38" width="10" height="48" fill="#2E2E2E"/>
    </svg>
  </NuxtLink>
</template>

<style scoped>
.brand-symbol {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 60;
  display: block;
  width: 48px;
  height: 72px;
}

.brand-symbol__svg {
  width: 48px;
  height: 72px;
  overflow: visible;
}

.brand-symbol__shape {
  fill: rgb(var(--color-accent));
}

.brand-symbol__bar {
  fill: rgb(var(--color-ink));
}
</style>
