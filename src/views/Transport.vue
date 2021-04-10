<template>
  <el-row v-loading="loading" class="transport">
    <h1>Transports</h1>
    <p v-if="error">{{ error }}</p>
    <TransportList v-if="transports.length" :transportList="transports" />
  </el-row>
</template>

<script lang="ts">
import axios from 'axios'
import { Vue, Component } from 'vue-property-decorator'
import TransportList from '../components/TransportList.vue'

@Component({
  components: {
    TransportList,
  },
})
export default class Transport extends Vue {
  loading = false

  error = null

  transports = []

  created(): void {
    this.fetchTransports()
  }

  async fetchTransports(): Promise<void> {
    this.error = null
    this.loading = true
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/transport')
      this.transports = data
    } catch (err) {
      this.error = err.toString()
    } finally {
      this.loading = false
    }
  }
}
</script>
