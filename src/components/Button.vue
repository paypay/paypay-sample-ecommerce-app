<template>
  <button :disabled="disabled" class="pp-btn" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  name = `pp-button`;

  @Prop({ default: false })
  disabled!: boolean;

  @Emit("click")
  handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.pp-btn {
  background-color: $primary;
  border-radius: $border-radius-lg;
  color: $white;
  position: relative;
  display: inline-block;
  font-size: $btn-font-size-lg;
  font-weight: $btn-font-weight;
  line-height: $btn-line-height;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  background-image: none;
  border: $btn-border-width solid transparent;
  padding: $btn-padding-y-lg $btn-padding-x-lg;
  box-shadow: $btn-box-shadow;
  cursor: pointer;
  transition: $btn-transition;
  width: 100%;
  &.disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: $btn-disabled-opacity;
    box-shadow: none;
    > * {
      pointer-events: none;
    }
  }
  &:focus,
  &.focus {
    outline: 0;
  }
}
</style>
