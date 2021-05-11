<template>
  <div>
    {{ $t('language') }}
    <select v-model="$i18n.locale">
      <option
        v-for="lang in langs"
        :key="lang"
        :value="lang"
        :selected="lang === 'ja'"
      >
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SwitchLocale',
  data() {
    return { langs: ['ja', 'en'] }
  },
}
</script>

<style>
select {
  font-size: 16px;
  outline: 0;
  margin-top: 1.6em;
}
</style>
