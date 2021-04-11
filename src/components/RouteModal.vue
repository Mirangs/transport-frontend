<template>
  <el-dialog :title="title" :visible.sync="isVisible">
    <el-form ref="routeForm" :rules="rules" :model="form">
      <el-form-item label="Origin city" prop="originCity" required>
        <el-input v-model="form.originCity"></el-input>
      </el-form-item>

      <el-form-item label="Destination city" prop="destinationCity" required>
        <el-input v-model="form.destinationCity"></el-input>
      </el-form-item>

      <el-form-item label="Distance, km" prop="distance" required>
        <el-input-number v-model="form.distance" :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="Department Date" prop="departmentDate" required>
        <el-date-picker
          v-model="form.departmentDate"
          type="datetime"
          placeholder="Select date and time"
          >>
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Estimated revenue, $" prop="estimatedRevenue" required>
        <el-input-number v-model="form.estimatedRevenue" :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="Needed transport type">
        <el-select placeholder="Needed Transport Type:" v-model="form.neededTransportTypeId">
          <el-option
            v-for="transportType in transportTypes"
            :key="transportType.id"
            :label="transportType.name"
            :value="transportType.id"
          >
          </el-option>
          <el-option :label="'None'" :value="undefined"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Transport">
        <el-select v-model="form.transportId">
          <el-option
            v-for="transport in transports"
            :key="transport.id"
            :label="transport.model"
            :value="transport.id"
          >
          </el-option>
          <el-option :label="'None'" :value="undefined"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Route status" prop="routeStatusId" required>
        <el-select v-model="form.routeStatusId" placeholder="Select route status">
          <el-option
            v-for="routeStatus in routeStatuses"
            :key="routeStatus.id"
            :label="routeStatus.name"
            :value="routeStatus.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Fulfillment date">
        <el-date-picker
          v-model="form.fulfillmentDate"
          type="datetime"
          placeholder="Select date and time"
          >></el-date-picker
        >
      </el-form-item>

      <el-form-item>
        <el-button @click="closeRouteModal">Cancel</el-button>
        <el-button type="primary" @click="onFormSubmit">Confirm</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import axios from 'axios'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class RouteModal extends Vue {
  @Prop({ default: false }) isVisible!: boolean

  @Prop({ default: {} }) route!: Record<string, unknown>

  @Prop() closeRouteModal!: () => void

  @Prop({ default: [] }) transportTypes!: any[]

  @Prop({ default: [] }) routeStatuses!: any[]

  @Prop({ default: [] }) transports!: any[]

  @Prop() updateRoute!: (form: any) => void

  @Prop() createRoute!: (form: any) => void

  isUpdating = !!this.route && !!Object.keys(this.route).length

  title = this.isUpdating
    ? `Update route ${this.route.originCity} - ${this.route.destinationCity}`
    : 'Create new route'

  emptyForm = {
    originCity: '',
    destinationCity: '',
    distance: 0,
    departmentDate: '',
    neededTransportTypeId: undefined,
    estimatedRevenue: 0,
    transportId: undefined,
    routeStatusId: undefined,
    fulfillmentDate: undefined,
  }

  form = this.isUpdating ? { ...this.route } : { ...this.emptyForm }

  rules = {
    originCity: { required: true, message: 'Please enter origin city' },
    destinationCity: { required: true, message: 'Please enter destination city' },
    distance: { required: true, message: 'Please enter distance' },
    departmentDate: { required: true, message: 'Please enter department date' },
    estimatedRevenue: { required: true, message: 'Please enter estimated revenue' },
    routeStatusId: {
      required: true,
      message: 'Please pick route status',
      trigger: 'change',
    },
  }

  @Watch('route')
  onRouteChanged(): void {
    this.isUpdating = !!this.route && !!Object.keys(this.route).length
    this.title = this.isUpdating
      ? `Update route ${this.route.originCity}-${this.route.destinationCity}`
      : 'Create new route'
    this.form = this.isUpdating ? this.route : this.emptyForm
    this.fetchTransports()
  }

  async fetchTransports(where: Record<string, unknown> = {}): Promise<void> {
    const params: Record<string, unknown> = {
      status: {
        is: {
          name: 'Free',
        },
      },
      ...where,
    }

    try {
      const { data } = await axios.get(`transport?where=${JSON.stringify(params)}`)

      this.transports = data
    } catch (err) {
      this.$message({ type: 'error', message: 'An error occured while getting transports' })
      this.transports = []
    }
  }

  @Watch('form.neededTransportTypeId')
  async onTransportTypeChanged(value: string): Promise<void> {
    let params = {}
    if (value) {
      params = { transportTypeId: value }
    }
    this.fetchTransports(params)
  }

  async onFormSubmit(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(this.$refs.routeForm as Vue & { validate: any }).validate((valid: boolean) => {
      if (!valid) {
        return false
      }

      const funcToExecute = this.isUpdating ? this.updateRoute : this.createRoute
      funcToExecute(this.form)
      ;(this.$refs.routeForm as Vue & { resetFields: () => void }).resetFields()
      return true
    })
  }
}
</script>
