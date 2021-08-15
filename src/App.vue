<template>
  <v-app class="app">
    <v-main>
      <v-container>
        <div>
          <v-row
            align="center"
            justify="center"
          >
            some content
          </v-row>
        </div>
      </v-container>
    </v-main>
    <FloatingPlayer
      :record="{
        id: 1,
        author: 'Kirill Marchenko',
        name: 'The Awesome Song',
        duration: 185,
        img: require('@/assets/images/thumb.jpg')
      }"
    />
  </v-app>
</template>

<script>
import FloatingPlayer from './components/FloatingPlayer/FloatingPlayer.vue'

export default {
  name: 'App',
  components: {
    FloatingPlayer
  }
}
</script>
