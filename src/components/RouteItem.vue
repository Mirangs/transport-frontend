<template>
  <section class="route-item">
    <p>Origin city: {{ originCity }}</p>
    <p>Destination city: {{ destinationCity }}</p>
    <p>Distance: {{ distance }} km</p>
    <p>DepartmentDate: {{ new Date(departmentDate).toLocaleString() }}</p>
    <p v-if="neededTransportType">Needed Transport Type: {{ neededTransportType }}</p>
    <p>Estimated Revenue: {{ estimatedRevenue }}$</p>
    <p v-if="transport">Transport: {{ transport.model }}</p>
    <p>Route Status: {{ routeStatus }}</p>
    <p v-if="fulfillmentDate">Fulfillment Date: {{ new Date(fulfillmentDate).toLocaleString() }}</p>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class RouteItem extends Vue {
  @Prop({ default: '' }) originCity!: string

  @Prop({ default: '' }) destinationCity!: string

  @Prop({ default: 0 }) distance!: number

  @Prop({ default: new Date() }) departmentDate!: Date

  @Prop({ default: '' }) neededTransportType!: string

  @Prop({ default: 0 }) estimatedRevenue!: number

  @Prop({ default: {} }) transport!: Record<string, string>

  @Prop({ default: '' }) routeStatus!: string

  @Prop({ default: new Date() }) fulfillmentDate!: Date
}
</script>
