<template>
  <div class="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import pp from '@paypay/mini-app-js-sdk'

@Component
export default class AppRoot extends Vue {
  mounted() {
    pp.init({
      clientId: 'm_ybQykxzcwM', //TO DO
      env: 'staging', //default: 'production'
      success() {
        console.log('init successful')
      },
      fail() {
        console.log('init failed')
      },
    })
  }
}
</script>
