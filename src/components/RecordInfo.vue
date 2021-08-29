<template>
  <div class="floating-player__info d-flex">
    <div class="floating-player__thumb pr-3">
      <v-img
        height="64px"
        width="64px"
        :aspect-ratio="1/1"
        :src="thumb || $options.lazySrc"
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
  name: 'RecordInfo',
  lazySrc,
  props: {
    thumb: {
      type: String,
      default: ''
    },
    soundName: {
      type: String,
      default: 'Song name not defined'
    },
    soundAuthor: {
      type: String,
      default: 'Author\'s name not'
    }
  }
}
</script>
