<template>
  <div class="floating-player elevation-10">
    <FloatingPlayerProgress
      :curent-duration="player.currentDuration"
      :total-duration="player.totalDuration"
      @seek="seek"
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
            <RecordInfo
              :thumb="record.img"
              :sound-author="record.author"
              :sound-name="record.name"
            />
          </v-col>
          <v-col>
            <FloatingPlayerControls
              :playing="player.isPlaying"
              @click:play="play"
              @click:pause="pause"
              @click:prev="skipPrev"
              @click:next="skipNext"
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
                :curent-duration="player.currentDuration"
                :total-duration="player.totalDuration"
              />
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import FloatingPlayerProgress from './FloatingPlayerProgress.vue'
import RecordInfo from '../RecordInfo.vue'
import FloatingPlayerControls from './FloatingPlayerControls.vue'
import FloatingPlayerDuration from './FloatingPlayerDuration.vue'

export default {
  name: 'FloatingPlayer',
  components: {
    FloatingPlayerProgress,
    RecordInfo,
    FloatingPlayerControls,
    FloatingPlayerDuration
  },
  props: {
    record: {
      type: Object,
      require: true
    },
    playlist: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      player: {
        audio: null,
        recordId: null,
        isPlaying: false,
        currentDuration: 0,
        totalDuration: 0
      }
    }
  },
  watch: {
    'record.id': {
      handler () {
        if (this.record.id === this.player.recordId) {
          return
        }

        if (this.player.audio) {
          this.destroySound()
        }

        this.player.audio = new Audio(process.env.VUE_APP_API_BASE_URL + this.record.src)
        this.player.audio.volume = 0.1
        this.player.audio.addEventListener('loadedmetadata', this.onLoadedmetadata, { once: true })
        this.player.audio.addEventListener('canplay', this.onCanPlay, { once: true })
        this.player.audio.addEventListener('timeupdate', this.onTimeupdate)
        this.player.audio.addEventListener('ended', this.onEnded)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    this.destroySound()
  },
  methods: {
    seek (value) {
      this.player.audio.currentTime = value
    },
    play () {
      if (this.player.isPlaying === true) {
        return
      }

      this.player.isPlaying = true
      this.player.audio.play()
    },
    pause () {
      if (this.player.isPlaying === false) {
        return
      }

      this.player.isPlaying = false
      this.player.audio.pause()
    },
    destroySound () {
      this.pause() // https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio#memory_usage_and_management

      this.player.audio.removeEventListener('timeupdate', this.onTimeupdate)
      this.player.audio.removeEventListener('ended', this.onTimeupdate)
      this.player = {
        audio: null,
        recordId: null,
        isPlaying: false,
        currentDuration: 0,
        totalDuration: 0
      }
    },
    skipPrev () {
      const audioIdx = this.playlist.findIndex(audio => audio.id === this.player.recordId)
      const prevIdx = audioIdx === 0 ? this.playlist.length - 1 : audioIdx - 1

      this.emitSkip(this.playlist[prevIdx])
    },
    skipNext () {
      const audioIdx = this.playlist.findIndex(audio => audio.id === this.player.recordId)
      const nextIdx = audioIdx === this.playlist.length - 1 ? 0 : audioIdx + 1

      this.emitSkip(this.playlist[nextIdx])
    },
    onTimeupdate (event) {
      const { currentTime } = event.path[0]

      requestAnimationFrame(() => {
        this.player.currentDuration = currentTime
      })
    },
    onLoadedmetadata (event) {
      const { duration } = event.path[0]

      this.player.recordId = this.record.id
      this.player.currentDuration = 0
      this.player.totalDuration = duration
    },
    onEnded () {
      this.skipNext()
    },
    onCanPlay () {
      this.play()
    },
    // emits
    emitSkip (record) {
      this.$emit('skip', record)
    }
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
