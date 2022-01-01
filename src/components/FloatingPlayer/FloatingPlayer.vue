<template>
  <div class="floating-player elevation-10">
    <FloatingPlayerProgress
      v-if="player"
      :curent-duration="player.currentDuration"
      :total-duration="player.totalDuration"
      :loading="isLoading"
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
              v-if="player"
              :loading="isLoading"
              :playing="player.playing"
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
                v-if="player"
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
import { PlayerService } from '../../services/Player.service'

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
      player: null,
      isLoading: false
    }
  },
  watch: {
    'record.id': {
      handler () {
        if (this.record.id === this.player?.recordId) {
          return
        }

        if (this.player?.audio) {
          this.destroyPlayer()
        }

        this.isLoading = true

        this.player = new PlayerService(this.record, [
          {
            eventName: 'ended',
            callback: this.onEnded
          },
          {
            eventName: 'canPlay',
            callback: this.onCanPlay
          },
          {
            eventName: 'waiting',
            callback: this.onWaiting
          },
          {
            eventName: 'playing',
            callback: this.onPlaying
          }
        ])
      },
      immediate: true
    }
  },
  beforeDestroy () {
    this.destroyPlayer()
  },
  methods: {
    destroyPlayer () {
      this.player.destroy()
      this.player = null
    },
    seek (value) {
      this.player.seek(value)
    },
    play () {
      this.player.play()
    },
    pause () {
      this.player.pause()
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
    onEnded () {
      this.skipNext()
    },
    onCanPlay () {
      this.isLoading = false
    },
    onWaiting () {
      this.isLoading = true
    },
    onPlaying () {
      this.isLoading && (this.isLoading = false)
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
