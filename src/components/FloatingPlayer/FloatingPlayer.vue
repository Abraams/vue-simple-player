<template>
  <div class="floating-player elevation-10">
    <FloatingPlayerProgress
      :curent-duration="duration"
      :total-duration="record.duration"
      @seek="onSeek"
    />
    <v-card
      tile
      height="88px"
      elevation="4"
    >
      <div class="py-3 px-4">
        <v-row
          no-gutters
          justify="space-between"
          align="center"
        >
          <v-col cols="3">
            <FloatingPlayerInfo
              :thumb="record.img"
              :sound-author="record.author"
              :sound-name="record.name"
            />
          </v-col>
          <v-col>
            <FloatingPlayerControls
              :playing="isPlaying"
              @click:play="onPlay"
              @click:pause="onPause"
              @click:prev="onSkipPrev"
              @click:next="onSkipNext"
            />
          </v-col>
          <v-col
            cols="3"
            align-self="start"
          >
            <v-row
              no-gutters
              justify="end"
            >
              <FloatingPlayerDuration
                :curent-duration="duration"
                :total-duration="record.duration"
              />
            </v-row>
          </v-col>
          <!--  -->
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import FloatingPlayerProgress from './FloatingPlayerProgress.vue'
import FloatingPlayerInfo from './FloatingPlayerInfo.vue'
import FloatingPlayerControls from './FloatingPlayerControls.vue'
import FloatingPlayerDuration from './FloatingPlayerDuration.vue'

export default {
  name: 'FloatingPlayer',
  components: {
    FloatingPlayerProgress,
    FloatingPlayerInfo,
    FloatingPlayerControls,
    FloatingPlayerDuration
  },
  props: {
    record: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      isPlaying: false,
      duration: 0
    }
  },
  watch: {
    'record.id': {
      handler () {
        this.duration = 0
      },
      immediate: true
    }
  },
  methods: {
    onSeek (value) {
      this.duration = value
    },
    onPlay () {
      this.isPlaying = true
    },
    onPause () {
      this.isPlaying = false
    },
    onSkipPrev () { },
    onSkipNext () { }
  }
}
</script>

<style lang="scss">
  .floating-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
