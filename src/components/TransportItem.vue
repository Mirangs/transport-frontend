<template>
  <el-card class="transport-item">
    <el-row class="item-header" type="flex" align="center">
      <el-col :span="18">
        <h2 class="item-title">{{ model }}</h2>
      </el-col>
      <el-col class="util-block" :span="6">
        <el-button class="util-button" icon="el-icon-edit"></el-button>
        <el-button class="util-button" type="danger" icon="el-icon-delete"></el-button>
      </el-col>
    </el-row>
    <p><b>License Plate:</b> {{ licensePlate }}</p>
    <p><b>Transport Type:</b> {{ transportType }}</p>
    <p><b>Status:</b> {{ status }}</p>
    <p><b>Purchase date:</b> {{ new Date(purchaseDate).toLocaleString() }}</p>
    <p><b>Mileage:</b> {{ mileage }} km</p>
  </el-card>
</template>

<style lang="scss" scoped>
@import '../assets/scss/default-card.scss';
</style>

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
