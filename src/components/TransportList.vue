<template>
  <ul class="transport-list">
    <li class="transport-list-item" v-for="transportItem in transportList" :key="transportItem.id">
      <TransportItem
        :model="transportItem.model"
        :licensePlate="transportItem.licensePlate"
        :purchaseDate="transportItem.purchaseDate"
        :mileage="transportItem.mileage"
        :status="transportItem.status.name"
        :transportType="transportItem.transportType.name"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '../assets/scss/mixins.scss';
.transport-list {
  @include reset-list();
  display: flex;
  flex-wrap: wrap;

  .transport-list-item {
    flex-basis: 100%;
    margin-bottom: 25px;

    &:nth-of-type(2n) {
      margin-left: 2%;
    }
  }

  @media screen and (min-width: 992px) {
    .transport-list-item {
      flex-basis: 48%;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TransportItem from './TransportItem.vue'

@Component({
  components: {
    TransportItem,
  },
})
export default class TransportList extends Vue {
  @Prop({ default: [] }) readonly transportList!: any[]
}
</script>
