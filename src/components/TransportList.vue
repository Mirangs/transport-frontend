<template>
  <ul class="transport-list">
    <li v-for="transportItem in transportList" :key="transportItem">
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
