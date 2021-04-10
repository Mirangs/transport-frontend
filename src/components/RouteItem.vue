<template>
  <el-card class="route-item">
    <el-row class="item-header" type="flex" align="center">
      <el-col :span="18">
        <h2 class="item-title">{{ originCity }} - {{ destinationCity }}</h2>
      </el-col>
      <el-col class="util-block" :span="6">
        <el-button class="util-button" icon="el-icon-edit"></el-button>
        <el-button class="util-button" type="danger" icon="el-icon-delete"></el-button>
      </el-col>
    </el-row>
    <p><b>Distance:</b> {{ distance }} km</p>
    <p><b>DepartmentDate:</b> {{ new Date(departmentDate).toLocaleString() }}</p>
    <p><b>Estimated Revenue:</b> {{ estimatedRevenue }}$</p>
    <p>
      <b>Needed Transport Type:</b> {{ neededTransportType ? neededTransportType.name : 'None' }}
    </p>
    <p><b>Transport:</b> {{ transport ? transport.model : 'None' }}</p>
    <p><b>Route Status:</b> {{ routeStatus }}</p>
    <p>
      <b>Fulfillment Date:</b>
      {{ fulfillmentDate ? new Date(fulfillmentDate).toLocaleString() : 'None' }}
    </p>
  </el-card>
</template>

<style lang="scss" scoped>
@import '../assets/scss/default-card.scss';
</style>

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
