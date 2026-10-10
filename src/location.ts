import { config } from './config'
import { moveMarker, recenter } from './map'
import { flashErr, flashOk } from './ui'

export function updateGeoloc() {
  if (!('geolocation' in navigator)) {
    flashErr()
    return
  }
  navigator.geolocation.getCurrentPosition(position => {
    moveMarker(position.coords.latitude, position.coords.longitude)
    if (config.viewType === 'follow') recenter()
    flashOk()
  }, positionError => {
    flashErr()
    throw positionError
  }, { enableHighAccuracy: true })
}

let watch = -1, interval = -1

function updateWatch() {
  if (!('geolocation' in navigator)) {
    flashErr()
    return
  }
  if (watch !== -1) {
    navigator.geolocation.clearWatch(watch)
    watch = -1
  }
  if (interval !== -1) {
    clearInterval(interval)
    interval = -1
  }
  if (config.geolocType === 'watch') {
    watch = navigator.geolocation.watchPosition(position => {
      moveMarker(position.coords.latitude, position.coords.longitude)
      if (config.viewType === 'follow') recenter()
      flashOk()
    }, positionError => {
      flashErr()
      throw positionError
    }, { enableHighAccuracy: true })
  } else if (config.geolocType === 'interval') {
    interval = setInterval(updateGeoloc, config.geolocInterval)
  }
}

const onGeolocChange = config.onGeolocChange
config.onGeolocChange = () => {
  onGeolocChange()
  updateWatch()
}
updateWatch()
