<template>
  <ul class="route-list">
    <li v-for="routeItem in routeList" :key="routeItem">
      <RouteItem
        :originCity="routeItem.originCity"
        :destinationCity="routeItem.destinationCity"
        :distance="routeItem.distance"
        :departmentDate="routeItem.departmentDate"
        :neededTransportType="routeItem.neededTransportType"
        :estimatedRevenue="routeItem.estimatedRevenue"
        :transport="routeItem.transport"
        :routeStatus="routeItem.routeStatus.name"
        :fulfillmentDate="routeItem.fulfillmentDate"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import RouteItem from './RouteItem.vue'

@Component({
  components: {
    RouteItem,
  },
})
export default class RouteList extends Vue {
  @Prop({ default: [] }) readonly routeList!: any[]
}
</script>
