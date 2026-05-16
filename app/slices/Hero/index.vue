<template>
  <section class="px-[var(--space-page)] py-24">
    <div class="mx-auto max-w-[1600px]">
      <p v-if="eyebrow" class="mb-6 text-sm uppercase tracking-[0.16em] text-muted">
        {{ eyebrow }}
      </p>
      <PrismicRichText
        v-if="slice.primary.heading"
        class="max-w-5xl text-5xl font-medium leading-none sm:text-7xl"
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
