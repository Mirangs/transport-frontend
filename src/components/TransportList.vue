<template>
  <ul class="transport-list">
    <li class="transport-list-item" v-for="transportItem in transportList" :key="transportItem.id">
      <TransportItem
        :id="transportItem.id"
        :model="transportItem.model"
        :licensePlate="transportItem.licensePlate"
        :purchaseDate="transportItem.purchaseDate"
        :mileage="transportItem.mileage"
        :status="transportItem.status"
        :transportType="transportItem.transportType"
        @onTransportDelete="onTransportDelete"
        @onTransportUpdate="onTransportUpdate"
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
  justify-content: space-between;

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

  @Prop() readonly confirmDelete!: (transport: any) => void

  onTransportDelete(transport: any) {
    this.$emit('onTransportDelete', transport)
  }

  onTransportUpdate(transport: any) {
    this.$emit('onTransportUpdate', transport)
  }
}
</script>
