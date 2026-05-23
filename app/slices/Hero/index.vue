<template>
  <section class="slice-hero">
    <div class="slice-hero__inner">
      <p v-if="eyebrow" class="slice-hero__eyebrow">
        {{ eyebrow }}
      </p>
      <PrismicRichText
        v-if="slice.primary.heading"
        class="slice-hero__heading"
        :field="slice.primary.heading"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { getSliceComponentProps } from '@prismicio/vue'

const props = defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))
const eyebrow = computed(() => props.slice.primary?.eyebrow)
</script>

<style scoped>
.slice-hero {
  padding: 96px var(--space-page);
}

.slice-hero__inner {
  max-width: 1600px;
  margin-inline: auto;
}

.slice-hero__eyebrow {
  margin-bottom: 24px;
  color: rgb(var(--color-muted));
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.slice-hero__heading {
  max-width: 1024px;
  font-size: 48px;
  font-weight: 500;
  line-height: 1;
}

@media (min-width: 640px) {
  .slice-hero__heading {
    font-size: 72px;
  }
}
</style>
