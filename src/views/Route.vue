<template>
  <div class="route">
    <h1>This is an route page</h1>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <RouteList :routeList="routes" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'
import RouteList from '../components/RouteList.vue'

@Component({
  components: {
    RouteList,
  },
})
export default class Route extends Vue {
  loading = false

  error = null

  routes = []

  created(): void {
    this.fetchRoutes()
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
}
</script>
