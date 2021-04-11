<template>
  <el-row v-loading="loading" class="transport">
    <el-row class="top-block" type="flex" align="center">
      <el-col :span="18">
        <h2 class="transport-title">Transports</h2>
      </el-col>
      <el-col class="add-transport-container" :span="6">
        <el-button type="primary" icon="el-icon-plus" @click="openTransportModal"
          >Add new transport</el-button
        >
      </el-col>
    </el-row>
    <p v-if="error">{{ error }}</p>
    <TransportList
      @onTransportDelete="confirmDelete"
      @onTransportUpdate="openUpdateModal"
      v-if="transports.length"
      :transportList="transports"
    />
    <TransportModal
      :isVisible="isTransportModalVisible"
      :transport="transportForUpdate"
      :closeTransportModal="closeTransportModal"
      :transportTypes="transportTypes"
      :transportStatuses="transportStatuses"
      :updateTransport="handleTransportUpdate"
      :createTransport="handleTransportCreate"
    />
  </el-row>
</template>

<style lang="scss" scoped>
.add-transport-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.transport-title {
  margin: 0;
}
.top-block {
  margin-bottom: 25px;
}
</style>

<script lang="ts">
import axios from 'axios'
import { Vue, Component } from 'vue-property-decorator'
import TransportList from '../components/TransportList.vue'
import TransportModal from '../components/TransportModal.vue'

@Component({
  components: {
    TransportList,
    TransportModal,
  },
})
export default class Transport extends Vue {
  loading = false

  error = null

  transports = []

  transportForUpdate = {}

  transportTypes = []

  transportStatuses = []

  isTransportModalVisible = false

  created(): void {
    this.fetchTransports()
    this.fetchTransportTypes()
    this.fetchTransportStatuses()
  }

  async fetchTransports(): Promise<void> {
    this.error = null
    this.loading = true
    try {
      const { data } = await axios.get('/transport')
      this.transports = data
    } catch (err) {
      this.error = err.toString()
    } finally {
      this.loading = false
    }
  }

  async fetchTransportTypes(): Promise<void> {
    this.loading = true
    this.error = null
    try {
      const { data } = await axios.get(`/transport/types`)
      this.transportTypes = data
    } catch (err) {
      this.error = err.toString()
    } finally {
      this.loading = false
    }
  }

  async fetchTransportStatuses(): Promise<void> {
    this.loading = true
    this.error = null
    try {
      const { data } = await axios.get(`/transport/statuses`)

      this.transportStatuses = data
    } catch (err) {
      this.error = err.toString()
    } finally {
      this.loading = false
    }
  }

  async confirmDelete(transport: any): Promise<void> {
    try {
      await this.$confirm(
        `Are you sure you want to delete ${transport.model} transport?`,
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )

      this.loading = true
      try {
        const { data } = await axios.delete(`/transport/${transport.id}`)

        await this.$message({
          type: 'success',
          message: `Successfully deleted ${data.model}`,
        })
        this.fetchTransports()
      } catch (err) {
        await this.$message({
          type: 'error',
          message: err.toString(),
        })
      }
    } catch {
      this.$message({
        type: 'info',
        message: 'Deletion cancelled',
      })
    }
  }

  openUpdateModal(transport: any): void {
    this.transportForUpdate = transport
    this.openTransportModal()
  }

  openTransportModal(): void {
    this.isTransportModalVisible = true
  }

  closeTransportModal(): void {
    this.isTransportModalVisible = false
    this.transportForUpdate = {}
  }

  async handleTransportCreate(transport: any): Promise<void> {
    this.loading = true
    this.error = null

    try {
      const body = JSON.stringify(transport)
      await axios.post(`/transport`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      this.$message({ type: 'success', message: `Successfully created transport` })
      this.closeTransportModal()
      this.fetchTransports()
    } catch (err) {
      this.error = err.toString()
    } finally {
      this.loading = false
    }
  }

  async handleTransportUpdate(transport: any): Promise<void> {
    this.loading = true
    this.error = null

    try {
      const body = JSON.stringify(transport)
      await axios.patch(`/transport/${transport.id}`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      this.$message({ type: 'success', message: `Successfully updated transport` })
      this.closeTransportModal()
      this.fetchTransports()
    } catch (err) {
      this.error = err.toString()
    } finally {
      this.loading = false
    }
  }
}
</script>
