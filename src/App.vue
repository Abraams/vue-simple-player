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
              @click="setRecord(record.id)"
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

export default {
  name: 'App',
  components: {
    FloatingPlayer,
    RecordInfo
  },
  data () {
    return {
      playlist: [
        {
          id: 984231287,
          author: 'Bensound',
          name: 'Creative Minds',
          src: require('@/assets/audio/bensound-creativeminds.mp3'),
          img: require('@/assets/images/creative_minds.jpg')
        },
        {
          id: 171899812,
          author: 'Bensound',
          name: 'Happy Rock',
          src: require('@/assets/audio/bensound-happyrock.mp3'),
          img: require('@/assets/images/happy_rock.jpg')
        }
      ],
      currentRecord: null
    }
  },
  methods: {
    setRecord (id) {
      if (id === this.currentRecord?.id) {
        return
      }

      this.currentRecord = this.playlist.find(record => record.id === id) || null
    }
  }
}
</script>
