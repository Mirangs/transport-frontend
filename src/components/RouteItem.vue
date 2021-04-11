<template>
  <el-card class="route-item">
    <el-row class="item-header" type="flex" align="center">
      <el-col :span="18">
        <h2 class="item-title">{{ originCity }} - {{ destinationCity }}</h2>
      </el-col>
      <el-col class="util-block" :span="6">
        <el-button class="util-button" icon="el-icon-edit" @click="updateRoute"></el-button>
        <el-button
          class="util-button"
          type="danger"
          icon="el-icon-delete"
          @click="deleteConfirm"
        ></el-button>
      </el-col>
    </el-row>
    <p><b>Distance:</b> {{ distance }} km</p>
    <p><b>DepartmentDate:</b> {{ new Date(departmentDate).toLocaleString() }}</p>
    <p><b>Estimated Revenue:</b> {{ estimatedRevenue }}$</p>
    <p>
      <b>Needed Transport Type:</b> {{ neededTransportType ? neededTransportType.name : 'None' }}
    </p>
    <p><b>Transport:</b> {{ transport ? transport.model : 'None' }}</p>
    <p><b>Route Status:</b> {{ routeStatus.name }}</p>
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
  @Prop() id!: number

  @Prop({ default: '' }) originCity!: string

  @Prop({ default: '' }) destinationCity!: string

  @Prop({ default: 0 }) distance!: number

  @Prop({ default: new Date() }) departmentDate!: Date

  @Prop({ default: {} }) neededTransportType!: Record<string, unknown>

  @Prop({ default: 0 }) estimatedRevenue!: number

  @Prop({ default: {} }) transport!: Record<string, unknown>

  @Prop({ default: {} }) routeStatus!: Record<string, unknown>

  @Prop({ default: new Date() }) fulfillmentDate!: Date

  @Prop({ default: [] }) transportTypes!: any[]

  deleteConfirm() {
    this.$emit('onRouteDelete', {
      id: this.id,
      name: `${this.originCity} - ${this.destinationCity}`,
    })
  }

  updateRoute() {
    this.$emit('onRouteUpdate', {
      id: this.id,
      originCity: this.originCity,
      destinationCity: this.destinationCity,
      distance: this.distance,
      departmentDate: this.departmentDate,
      neededTransportTypeId: this.neededTransportType?.id,
      estimatedRevenue: this.estimatedRevenue,
      transportId: this.transport?.id,
      routeStatusId: this.routeStatus.id,
      fulfillmentDate: this.fulfillmentDate,
    })
  }
}
</script>
