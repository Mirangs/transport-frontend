<template>
  <ul class="route-list">
    <li class="route-list-item" v-for="routeItem in routeList" :key="routeItem.id">
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

<style lang="scss" scoped>
@import '../assets/scss/mixins.scss';
.route-list {
  @include reset-list();
  display: flex;
  flex-wrap: wrap;

  .route-list-item {
    flex-basis: 100%;
    margin-bottom: 25px;
    &:nth-of-type(2n) {
      margin-left: 2%;
    }
  }

  @media screen and (min-width: 992px) {
    .route-list-item {
      flex-basis: 48%;
    }
  }
}
</style>

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
