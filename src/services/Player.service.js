class PlayerService {
  audio = null
  recordId = null
  playing = false
  currentDuration = 0
  totalDuration = 0
  DEFAULT_VOLUME = 0.01

  listeners = []

  constructor (record, listeners) {
    if (record.id == null) {
      throw new Error('Некорректный record')
    }

    this.audio = new Audio(process.env.VUE_APP_API_BASE_URL + record.src)
    this.recordId = record.id
    this.audio.volume = this.DEFAULT_VOLUME

    this.setListener('loadedmetadata', this.$onLoadedmetadata, { once: true })
    this.setListener('canplay', this.$onCanPlay, { once: true })
    this.setListener('timeupdate', this.$onTimeupdate)

    listeners.forEach(({ eventName, callback, options }) => {
      this.setListener(eventName, callback, options)
    })
  }

  play () {
    this.audio.play()
    this.playing = true
  }

  seek (value) {
    this.audio.currentTime = value
  }

  pause () {
    this.audio.pause()
    this.playing = false
  }

  setListener (eventName, callback, options) {
    const $boundedCallback = callback.bind(this)

    if (options?.once !== true) {
      this.listeners.push(Object.freeze({ eventName, callback: $boundedCallback, options }))
    }

    this.audio.addEventListener(eventName, $boundedCallback, options)
  }

  removeListener (eventName, callback, options) {
    this.audio.removeEventListener(eventName, callback, options)

    this.listeners = this.listeners.filter(l => {
      const isEventNameRegistered = l.eventName === eventName
      const isCallbackExists = l.callback === callback
      const isOptionsExists = l.options === options

      return isEventNameRegistered && isCallbackExists && isOptionsExists
    })
  }

  $onLoadedmetadata (event) {
    const { duration } = event.path[0]

    this.currentDuration = 0
    this.totalDuration = duration
  }

  $onCanPlay () {
    this.play()
  }

  $onTimeupdate (event) {
    const { currentTime } = event.path[0]

    requestAnimationFrame(() => {
      this.currentDuration = currentTime
    })
  }

  destroy () {
    this.pause() // https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio#memory_usage_and_management

    this.listeners.forEach(({ eventName, callback, options }) => {
      this.removeListener(eventName, callback, options)
    })

    this.listeners = []
    this.audio = null
    this.recordId = null
    this.currentDuration = 0
    this.totalDuration = 0
  }
}

export { PlayerService }
