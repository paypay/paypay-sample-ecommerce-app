<template>
  <transition-group v-if="group === 'group'" :tag="tag" name="fade">
    <slot></slot>
  </transition-group>
  <transition v-else name="fade">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FadeTransition extends Vue {
  @Prop({ default: "single" })
  group!: "group" | "single";
  @Prop({
    default: "div",
  })
  tag!: string;
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
