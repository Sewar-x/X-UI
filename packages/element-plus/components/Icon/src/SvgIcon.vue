<template>
  <svg :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed } from "vue";

const props = defineProps({
  prefix: { type: String, default: "icon" },
  name: { type: String, required: true },
  size: { type: [Number, String], default: 14 },
  style: { type: Object, default: {} },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);

const getStyle = computed(
  (): CSSProperties => {
    const { size } = props;
    let s = `${size}`;
    s = `${s.replace("px", "")}px`;
    return {
      width: s,
      height: s,
      ...props.style,
    };
  }
);
</script>

<style scoped lang="less"></style>
