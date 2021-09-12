<template>
  <v-app class="app">
    <v-main>
      <v-container>
        <div class="mt-6">
          <v-hover
            v-for="(record, idx) in playlist"
            :key="record.id"
            #default="{hover}"
          >
            <v-card
              class="pa-2 pr-6"
              :class="{'mt-4': idx !== 0}"
              :elevation="(currentRecord && currentRecord.id === record.id) || hover ? 4 : 2"
              @click="setRecord(record)"
            >
              <v-row
                no-gutters
                align-content="center"
                justify="space-between"
              >
                <RecordInfo
                  style="cursor: pointer"
                  :sound-author="record.author"
                  :sound-name="record.name"
                  :thumb="record.img"
                />
                <v-fade-transition>
                  <a
                    v-if="hover"
                    :href="record.src"
                    :download="`${record.author}-${record.name}.mp3`"
                    class="d-flex align-center text-decoration-none"
                    @click.stop
                  >
                    <v-icon
                      :color="hover && 'primary'"
                    >
                      mdi-download
                    </v-icon>
                  </a>
                </v-fade-transition>
              </v-row>
            </v-card>
          </v-hover>
        </div>
      </v-container>
    </v-main>
    <FloatingPlayer
      v-if="currentRecord"
      :record="currentRecord"
      :playlist="playlist"
      @skip="setRecord"
    />
  </v-app>
</template>

<script>
import FloatingPlayer from './components/FloatingPlayer/FloatingPlayer.vue'
import RecordInfo from './components/RecordInfo.vue'
import { playlistApi } from '@/api/playlistApi.js'

export default {
  name: 'App',
  components: {
    FloatingPlayer,
    RecordInfo
  },
  data () {
    return {
      playlist: [],
      currentRecord: null
    }
  },
  async mounted () {
    try {
      this.playlist = await playlistApi.get()
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    setRecord (record) {
      if (this.currentRecord?.id === record.id) {
        return
      }

      this.currentRecord = record
    }
  }
}
</script>
