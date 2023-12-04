<template>
  <div class="actions">
    <button @click="handleClick">Отправить</button>
    <br />
    <div>{{localStorageState}}</div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {mapActions, mapState} from "vuex";

export default defineComponent({
  name: "ActionButton",
  computed: {
    ...mapState(['localStorageState'])
  },
  methods: {
    ...mapActions(['saveToLocal']),
    handleClick () {
      this.saveToLocal()
    }
  }
})
</script>

<style scoped>
  .actions {
    width: 450px;
  }
</style>
