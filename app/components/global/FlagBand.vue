<template>
  <div class="flag-band" aria-hidden="true">
    <svg
      v-for="index in 2"
      :key="index"
      class="flag-band__flag"
      viewBox="0 0 720 508.364"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <clipPath :id="`flag-clip-${index}`">
        <rect width="720" height="508.364" fill="white" />
      </clipPath>
      <g :clip-path="`url(#flag-clip-${index})`">
        <path d="M591.336 0H720V508.364H0V0L591.336 0Z" fill="#009C58" />
        <path d="M591.336 -0.0000181198L0 382.386V-0.0000181198H591.336Z" fill="#FAFF33" />
        <path d="M250.164 0C250.188 1.39268 250.212 2.78536 250.212 4.17804C250.212 143.05 138.432 255.773 -0.0122406 257.273V0H250.164Z" fill="#2B00F7" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.flag-band {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
  overflow: hidden;
}

.flag-band__flag {
  width: 100%;
  aspect-ratio: 720 / 508.364;
}

@media (max-width: 700px) {
  .flag-band {
    grid-template-columns: 1fr;
  }

  .flag-band__flag:last-child {
    display: none;
  }
}
</style>
