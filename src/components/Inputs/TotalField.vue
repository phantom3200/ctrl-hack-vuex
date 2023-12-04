<template>
  <div>
    <input type="number" placeholder="Total" id="total" :value="total" @input="handleChange($event.target.value)" />
    <br />
    <label for="total">Сумма: {{total}}</label>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {mapActions, mapState} from "vuex";
import {debounce} from "lodash";

export default defineComponent({
  name: "PriceField",
  computed: {
    ...mapState(['total'])
  },
  methods: {
    ...mapActions(['updateTotal']),
    handleChange: debounce(function (value) {
      this.updateTotal(Number(value))
    }, 300)
  },
})
</script>

<style scoped>

</style>
