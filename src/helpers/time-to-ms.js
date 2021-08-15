const getMinutes = (time) => Math.floor(time / 60)
const getSeconds = (time, minutes) => Math.ceil(time - minutes * 60)
const getFormattedSeconds = (seconds) => seconds < 10 ? '0' + seconds : seconds

export const timeToMs = (time) => {
  const localTime = Number(time)

  const minutes = getMinutes(localTime)
  const seconds = getSeconds(localTime, minutes)

  return [String(minutes), String(getFormattedSeconds(seconds))]
}
