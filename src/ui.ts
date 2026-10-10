import { config } from './config'
import { updateGeoloc } from './location'
import { recenter } from './map'
import { clearPlots, defaultPlots, exportPlotSchema, importPlotsFromFile, importPlotsFromUrl } from './plots'
import { createButton, createIcon, createSelect, createTitle } from './ui-gen'
import './ui.css'

export function flashOk(): void {
  document.querySelector<HTMLDivElement>('#flash')!.animate([{ backgroundColor: '#00ff00' }, {}], { duration: 200 })
}
export function flashErr(): void {
  document.querySelector<HTMLDivElement>('#flash')!.animate([{ backgroundColor: '#ff0000' }, {}], { duration: 200 })
}

function makeSettings(): HTMLDivElement {
  const container = document.createElement('div')
  container.classList.add('container')
  container.style.display = 'none'
  container.append(createIcon('#tabler-x', () => container.style.display = 'none'))

  container.append(createTitle('Geolocation updates'))
  container.append(createSelect([
    { text: 'Manual', value: 'manual' },
    { text: 'Watch', value: 'watch' },
    { text: 'Interval', value: 'interval' },
  ], config.geolocType, value => config.geolocType = value))

  const geoManual = document.createElement('div')
  geoManual.style.display = config.geolocType === 'manual' ? '' : 'none'
  container.append(geoManual)
  geoManual.append(createButton('Update', updateGeoloc))

  const geoInterval = document.createElement('div')
  geoInterval.style.display = config.geolocType === 'interval' ? '' : 'none'
  container.append(geoInterval)
  geoInterval.append(createSelect([
    { text: '1s', value: 1000 },
    { text: '5s', value: 5000 },
    { text: '20s', value: 20000 },
    { text: '30s', value: 30000 },
  ], config.geolocInterval, value => config.geolocInterval = value))

  container.append(createTitle('Map view'))
  container.append(createSelect([
    { text: 'Static', value: 'static' },
    { text: 'Follow', value: 'follow' },
  ], config.viewType, value => config.viewType = value))
  container.append(createButton('Recenter', recenter))

  const onGeolocChange = config.onGeolocChange
  config.onGeolocChange = () => {
    onGeolocChange()
    geoManual.style.display = config.geolocType === 'manual' ? '' : 'none'
    geoInterval.style.display = config.geolocType === 'interval' ? '' : 'none'
  }
  return container
}

function makePlots(): HTMLDivElement {
  const container = document.createElement('div')
  container.classList.add('container')
  container.style.display = 'none'
  container.append(createIcon('#tabler-x', () => container.style.display = 'none'))

  container.append(createTitle('Plots'))
  container.append(createButton('Clear', clearPlots))
  container.append(createButton('Import file', importPlotsFromFile))
  container.append(createButton('Export schema', exportPlotSchema))

  container.append(createTitle('Default plots'))
  for (const plot of defaultPlots)
    container.append(createButton(plot.name, () => importPlotsFromUrl(plot.url)))

  return container
}

function makeIcons(settings: HTMLDivElement, plots: HTMLDivElement): HTMLDivElement {
  const container = document.createElement('div')
  container.classList.add('icons')

  container.append(createIcon('#tabler-settings', () => settings.style.display = ''))
  container.append(createIcon('#tabler-polygon', () => plots.style.display = ''))

  return container
}

const overlay = document.querySelector('#overlay')!
const settings = makeSettings()
const plots = makePlots()
const icons = makeIcons(settings, plots)
overlay.append(icons, settings, plots)
