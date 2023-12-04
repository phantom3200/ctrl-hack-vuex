<template>
  <div id="app">
   <FieldsSection />
    <InfoBlock />
  </div>
</template>

<script>
import {FieldsSection, InfoBlock} from './components'

export default {
  name: 'App',
  components: {
    InfoBlock,
   FieldsSection
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
