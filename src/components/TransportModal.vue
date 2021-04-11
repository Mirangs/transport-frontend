<template>
  <el-dialog :title="title" :visible.sync="isVisible">
    <el-form ref="transportForm" :rules="rules" :model="form">
      <el-form-item label="License plate" prop="licensePlate" required>
        <el-input v-model="form.licensePlate"></el-input>
      </el-form-item>

      <el-form-item label="Model" prop="model" required>
        <el-input v-model="form.model"></el-input>
      </el-form-item>

      <el-form-item label="Purchase date" prop="purchaseDate" required>
        <el-date-picker
          v-model="form.purchaseDate"
          type="datetime"
          placeholder="Select date and time"
          >>
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Mileage" prop="mileage" required>
        <el-input-number v-model="form.mileage" :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="Transport type" prop="transportTypeId" required>
        <el-select
          placeholder="Transport Type"
          v-model="form.transportTypeId"
          prop="transportTypeId"
        >
          <el-option
            v-for="transportType in transportTypes"
            :key="transportType.id"
            :label="transportType.name"
            :value="transportType.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Transport status" required prop="statusId">
        <el-select placeholder="Transport status" v-model="form.statusId">
          <el-option
            v-for="transportStatus in transportStatuses"
            :key="transportStatus.id"
            :label="transportStatus.name"
            :value="transportStatus.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="closeTransportModal">Cancel</el-button>
        <el-button type="primary" @click="onFormSubmit">Confirm</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class TransportModal extends Vue {
  @Prop({ default: false }) isVisible!: boolean

  @Prop({ default: {} }) transport!: Record<string, unknown>

  @Prop() closeTransportModal!: () => void

  @Prop() onConfirmTransport!: () => void

  @Prop({ default: [] }) transportTypes!: any[]

  @Prop({ default: [] }) transportStatuses!: any[]

  @Prop() updateTransport!: (form: any) => void

  @Prop() createTransport!: (form: any) => void

  @Prop() toggle!: (isVisible: boolean) => void

  isUpdating = !!this.transport && !!Object.keys(this.transport).length

  title = this.isUpdating ? `Update transport ${this.transport.model}` : 'Create new transport'

  emptyForm = {
    id: '',
    licensePlate: '',
    model: '',
    purchaseDate: null,
    mileage: 0,
    statusId: undefined,
    transportTypeId: undefined,
  }

  form = this.isUpdating ? { ...this.transport } : { ...this.emptyForm }

  rules = {
    licensePlate: { required: true, message: 'Please enter license plate' },
    model: { required: true, message: 'Please enter model' },
    purchaseDate: { required: true, message: 'Please enter purchase date' },
    mileage: { required: true, message: 'Please enter mileage' },
    statusId: { required: true, message: 'Please pick status', triger: 'change' },
    transportTypeId: { required: true, message: 'Please pick transport type', triger: 'change' },
  }

  @Watch('transport')
  onTransportChanged() {
    this.isUpdating = !!this.transport && !!Object.keys(this.transport).length
    this.title = this.isUpdating ? `Update transport ${this.transport.model}` : 'Create new route'
    this.form = this.isUpdating ? this.transport : this.emptyForm
  }

  async onFormSubmit(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(this.$refs.transportForm as Vue & { validate: any }).validate((valid: boolean) => {
      if (!valid) {
        return false
      }

      const funcToExecute = this.isUpdating ? this.updateTransport : this.createTransport
      funcToExecute(this.form)
      ;(this.$refs.routeForm as Vue & { resetFields: () => void }).resetFields()
      return true
    })
  }
}
</script>
