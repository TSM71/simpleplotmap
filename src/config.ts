type Config = {
  geolocType: 'manual' | 'watch' | 'interval'
  geolocInterval: number
  onGeolocChange: () => void
  viewType: 'static' | 'follow'
  latlng: [number, number]
}

let back: Config = {
  geolocType: 'manual',
  geolocInterval: 1000,
  onGeolocChange: () => {},
  viewType: 'static',
  latlng: [0, 0],
}
const local = localStorage.getItem('config')
if (local !== null) back = { ...back, ...JSON.parse(local) }
export const config = new Proxy(back, {
  set(target, p, newValue) {
    ;(target as any)[p] = newValue
    if (p === 'geolocType' || p === 'geolocInterval') target.onGeolocChange()
    localStorage.setItem('config', JSON.stringify(config))
    return true
  },
})
