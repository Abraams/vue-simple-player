<template>
  <div class="floating-player__duration caption font-weight-light">
    <span>
      {{ getFormattedTime(curentDuration) }}
    </span>
    <span> / </span>
    <span>
      {{ getFormattedTime(totalDuration) }}
    </span>
  </div>
</template>

<script>
import { timeToMs, getFormattedTime } from '@/helpers/'

export default {
  name: 'FloatingPlayerDuration',
  props: {
    totalDuration: {
      type: [Number, String],
      required: true
    },
    curentDuration: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    getFormattedTime (time) {
      return getFormattedTime(...timeToMs(time))
    }
  }

}
</script>

<style>

</style>
