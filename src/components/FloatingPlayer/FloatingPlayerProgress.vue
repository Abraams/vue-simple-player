<template>
  <div class="floating-player__progress-wrapper">
    <div class="floating-player__progress-container">
      <v-slider
        v-model="localCurrentDuration"
        :max="totalDuration"
        step="0"
        height="6"
        hide-details
        dense
        @start="onSeekStart"
        @end="onSeekEnd"
        @change="onSeek"
      >
        <template #thumb-label="{value}">
          {{ getFormattedTime(value) }}
        </template>
      </v-slider>
    </div>
  </div>
</template>

<script>
import { timeToMs, getFormattedTime } from '@/helpers/'

export default {
  name: 'FloatingPlayerProgress',
  props: {
    totalDuration: {
      type: [Number, String],
      default: 0
    },
    curentDuration: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      localCurrentDuration: this.curentDuration,
      isDragging: false
    }
  },
  watch: {
    curentDuration (value) {
      if (this.isDragging) {
        return
      }

      this.localCurrentDuration = value
    }
  },
  methods: {
    getFormattedTime (time) {
      return getFormattedTime(...timeToMs(time))
    },
    onSeekStart () {
      this.isDragging = true
      this._$emitSeekStart()
    },
    onSeekEnd () {
      this.isDragging = false
      this._$emitSeekEnd()
    },
    onSeek (value) {
      this._$emitSeek(value)
    },
    _$emitSeekStart () {
      this.$emit('start')
    },
    _$emitSeekEnd () {
      this.$emit('end')
    },
    _$emitSeek (value) {
      this.$emit('seek', Math.ceil(value))
    }
  }
}
</script>

<style lang="scss">
  .floating-player {
    &__progress {
      &-wrapper {
        width: 100%;
        background: #fff;
        position: relative;
        z-index: 9;
      }

      &-container {
        width: calc(100% - 32px);
        min-width: 936px;
        margin: 0 auto;

        &:hover {
          cursor: pointer;
        }

        .v-slider {
          &--horizontal {
            margin: 0 !important;
          }

          &__track-container {
            height: 6px !important;
          }

          &__thumb {
            width: 16px !important;
            height: 16px !important;
            left: -8px !important;

            &::before {
              left: -10px !important;
              top: -10px !important;
            }
          }
        }
      }
    }
  }
</style>
