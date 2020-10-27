<template>
  <div class="card">
    <div class="card__header">
      <slot name="header"></slot>
    </div>
    <div class="card__body">
      <slot></slot>
    </div>
    <div class="card__actions">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Card extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.card {
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem;
  height: 100%;
  background: $white;
  padding: 0.2rem;
}
</style>
