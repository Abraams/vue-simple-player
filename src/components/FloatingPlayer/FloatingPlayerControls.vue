<template>
  <div class="floating-player__controls">
    <v-row
      align="center"
      justify="center"
    >
      <!-- prev -->
      <v-btn
        icon
        class="mr-1"
        color="primary"
        @click="onPrev"
      >
        <v-icon>
          mdi-skip-previous
        </v-icon>
      </v-btn>
      <!-- play/pause -->
      <v-btn
        icon
        x-large
        color="primary"
        @click="setPlayStatus(!playing)"
      >
        <v-icon>
          {{ playing ? 'mdi-pause' : 'mdi-play' }}
        </v-icon>
      </v-btn>
      <!-- next -->
      <v-btn
        icon
        class="ml-1"
        color="primary"
        @click="onNext"
      >
        <v-icon>
          mdi-skip-next
        </v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'FloatingPlayerControls',
  props: {
    playing: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setPlayStatus (value) {
      if (value) {
        this._$emitPlay()
      } else {
        this._$emitPause()
      }
    },
    onPrev () {
      this._$emitPrev()
    },
    onNext () {
      this._$emitNext()
    },
    // EMITS
    _$emitPlay (value) {
      this.$emit('click:play')
    },
    _$emitPause (value) {
      this.$emit('click:pause')
    },
    _$emitPrev () {
      this.$emit('click:prev')
    },
    _$emitNext (value) {
      this.$emit('click:next')
    }
  }
}
</script>

<style>

</style>
