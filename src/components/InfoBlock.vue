<template>
  <div class="info-block">
    <div class="info-item" v-for="event in events" :key="event.id">
      {{event.value}}
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {mapState} from "vuex";

export default defineComponent({
  name: "InfoBlock",
  computed: {
    ...mapState(['events'])
  },
})
</script>

<style scoped>
  .info-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
  }
</style>
