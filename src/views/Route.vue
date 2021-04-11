<template>
  <el-row v-loading="loading" class="route">
    <el-row class="top-block" type="flex" align="center">
      <el-col :span="18">
        <h2 class="route-title">Routes</h2>
      </el-col>
      <el-col class="add-route-container" :span="6">
        <el-button type="primary" icon="el-icon-plus" @click="openRouteModal"
          >Add new route</el-button
        >
      </el-col>
    </el-row>
    <p v-if="error">{{ error }}</p>
    <RouteList
      @onRouteDelete="confirmDelete"
      @onRouteUpdate="openUpdateModal"
      :routeList="routes"
      :transportTypes="transportTypes"
    />
    <RouteModal
      :isVisible="isRouteModalVisible"
      :route="routeForUpdate"
      :closeRouteModal="closeRouteModal"
      :transportTypes="transportTypes"
      :routeStatuses="routeStatuses"
      :updateRoute="handleRouteUpdate"
      :createRoute="handleRouteCreate"
    />
  </el-row>
</template>

<style lang="scss" scoped>
.add-route-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.route-title {
  margin: 0;
}
.top-block {
  margin-bottom: 25px;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'
import RouteList from '../components/RouteList.vue'
import RouteModal from '../components/RouteModal.vue'

@Component({
  components: {
    RouteList,
    RouteModal,
  },
})
export default class Route extends Vue {
  loading = false

  error = null

  routes = []

  routeForUpdate = {}

  transportTypes = []

  routeStatuses = []

  isRouteModalVisible = false

  created(): void {
    this.fetchRoutes()
    this.fetchTransportTypes()
    this.fetchRouteStatuses()
  }

  async fetchRoutes(): Promise<void> {
    this.error = null
    this.loading = true
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/route')
      this.routes = data
    } catch (err) {
      this.error = err.toString()
    } finally {
      this.loading = false
    }
  }

  async confirmDelete(route: any): Promise<void> {
    try {
      await this.$confirm(`Are you sure you want to delete ${route.name} route?`, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })

      this.loading = true
      try {
        await axios.delete(`http://localhost:3000/api/v1/route/${route.id}`)
        await this.$message({
          type: 'success',
          message: `Successfully deleted ${route.name}`,
        })
        this.fetchRoutes()
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

  openUpdateModal(route: any): void {
    this.routeForUpdate = route
    this.openRouteModal()
  }

  openRouteModal(): void {
    this.isRouteModalVisible = true
  }

  closeRouteModal(): void {
    this.isRouteModalVisible = false
    this.routeForUpdate = {}
  }

  async fetchTransportTypes(): Promise<void> {
    this.loading = true
    this.error = null
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/transport/types`)
      this.transportTypes = data
    } catch (err) {
      this.error = err.toString()
    } finally {
      this.loading = false
    }
  }

  async fetchRouteStatuses(): Promise<void> {
    this.loading = true
    this.error = null
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/route/statuses`)

      this.routeStatuses = data
    } catch (err) {
      this.error = err.toString()
    } finally {
      this.loading = false
    }
  }

  async handleRouteCreate(route: any): Promise<void> {
    this.loading = true
    this.error = null

    try {
      const body = JSON.stringify(route)
      await axios.post(`http://localhost:3000/api/v1/route`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      this.$message({ type: 'success', message: `Successfully created route` })
      this.closeRouteModal()
      this.fetchRoutes()
    } catch (err) {
      this.error = err.toString()
    } finally {
      this.loading = false
    }
  }

  async handleRouteUpdate(route: any): Promise<void> {
    this.loading = true
    this.error = null

    try {
      const body = JSON.stringify(route)
      await axios.patch(`http://localhost:3000/api/v1/route/${route.id}`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      this.$message({ type: 'success', message: `Successfully updated route` })
      this.closeRouteModal()
      this.fetchRoutes()
    } catch (err) {
      this.error = err.toString()
    } finally {
      this.loading = false
    }
  }
}
</script>
