<template>
  <div class="floating-player__info d-flex">
    <div
      v-if="thumb"
      class="floating-player__thumb pr-3"
    >
      <v-img
        height="64px"
        width="64px"
        :aspect-ratio="1/1"
        :src="thumb"
        :lazy-src="$options.lazySrc"
      />
    </div>
    <div class="floating-player__caption d-flex flex-column py-1">
      <span class="subtitle-2">
        {{ soundName }}
      </span>
      <span class="caption font-weight-light">
        {{ soundAuthor }}
      </span>
    </div>
  </div>
</template>

<script>
const lazySrc = require('@/assets/images/thumb-lazy.jpg')

export default {
  name: 'FloatingPlayerInfo',
  $options: {
    lazySrc
  },
  props: {
    thumb: {
      type: String,
      default: ''
    },
    soundName: {
      type: String,
      default: 'Name of the Sound'
    },
    soundAuthor: {
      type: String,
      default: 'Author’s name'
    }
  }
}
</script>
