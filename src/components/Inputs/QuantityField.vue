<template>
  <div>
    <input type="number" placeholder="Quantity" id="quantity" :value="quantity" @input="handleChange($event.target.value)" />
    <br />
    <label for="quantity">Количество: {{quantity}}</label>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {mapActions, mapState} from "vuex";
import {debounce} from "lodash";

export default defineComponent({
  name: "QuantityField",
  computed: {
    ...mapState(['quantity'])
  },
  methods: {
    ...mapActions(['updateQuantity']),
    handleChange: debounce(function (value) {
      this.updateQuantity(Number(value))
    }, 300)
  }
})
</script>

<style scoped>

</style>
