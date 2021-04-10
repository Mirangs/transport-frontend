<template>
  <section class="transport-item">
    <h2>{{ model }}</h2>
    <p>License Plate: {{ licensePlate }}</p>
    <p>Transport Type: {{ transportType }}</p>
    <p>Status: {{ status }}</p>
    <p>Purchase date: {{ new Date(purchaseDate).toLocaleString() }}</p>
    <p>Mileage: {{ mileage }} km</p>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class TransportItem extends Vue {
  @Prop({ default: '' }) readonly licensePlate!: string

  @Prop({ default: '' }) readonly model!: string

  @Prop({ default: new Date() }) readonly purchaseDate!: string

  @Prop({ default: 0 }) readonly mileage!: number

  @Prop({ default: '' }) readonly status!: string

  @Prop({ default: '' }) readonly transportType!: string
}
</script>
