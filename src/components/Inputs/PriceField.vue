<template>
  <div>
    <input type="number" placeholder="Price" id="price" :value="price" @input="handleChange($event.target.value)" />
    <br />
    <label for="price">Цена: {{price}}</label>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {mapActions, mapState} from "vuex";
import {debounce} from 'lodash'
export default defineComponent({
  name: "PriceField",
  computed: {
    ...mapState(['price'])
  },
  methods: {
    ...mapActions(['updatePrice']),
    handleChange: debounce(function (value) {
      this.updatePrice(Number(value))
    }, 300)
  }
})
</script>

<style scoped>

</style>
