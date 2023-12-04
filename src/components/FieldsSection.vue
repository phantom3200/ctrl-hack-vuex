<template>
  <div class="wrapper">
    <PriceField />
    <QuantityField />
    <TotalField />
    <ActionButton />
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {ActionButton, TotalField, QuantityField, PriceField} from './Inputs'
import {mapActions} from "vuex";

export default defineComponent({
  name: "FieldsSection",
  components: {PriceField, TotalField, QuantityField, ActionButton},
  methods: {
    ...mapActions(['updateEvents'])
  },
  created() {
    this.$store.subscribe((mutation) => {
      this.updateEvents(mutation)
    })
  }
})
</script>

<style scoped>
 .wrapper {
   display: flex;
   gap: 16px;
 }
</style>
