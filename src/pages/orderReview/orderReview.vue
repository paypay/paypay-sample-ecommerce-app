<template>
  <div id="app">
    <HelloWorld :msg="$t('helloWorld')" />
    <button @click="openDetail()">{{ $t("openDetail") }}</button>
    <SwitchLanguage />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HelloWorld from "../../components/HelloWorld.vue";
import SwitchLanguage from "../../components/SwitchLanguage.vue";

@Component({
  name: "Detail",
  components: {
    HelloWorld,
    SwitchLanguage,
  },
})
export default class Index extends Vue {
  openDetail() {
    pp.navigateTo({
      url: "pages/detail/detail?key=test_value",
    });
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 160px;
}
body {
  font-family: sans-serif;
}
</style>
