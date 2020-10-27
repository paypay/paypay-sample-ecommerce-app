<template>
  <div class="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppRoot extends Vue {}
</script>
