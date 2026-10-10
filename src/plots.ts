import { addPlotPolygon, clearPlotPolygons } from './map'

export type Plot = { name: string, color: string, polygon: [lat: number, lng: number][] }

let back: Plot[] = []
const local = localStorage.getItem('plots')
if (local !== null) back = JSON.parse(local)
for (const plot of back)
  addPlotPolygon(plot)

export function clearPlots() {
  clearPlotPolygons()
  back = []
  localStorage.setItem('plots', JSON.stringify(back))
}

function addPlots(plots: Plot[]) {
  for (const plot of plots)
    addPlotPolygon(plot)
  back.push(...plots)
  localStorage.setItem('plots', JSON.stringify(back))
}

export function importPlotsFromFile() {
  const input = document.createElement('input')
  input.type = 'file'
  input.addEventListener('input', () => {
    if (!input.files?.length) return
    input.files[0].text().then<Plot[]>(JSON.parse).then(addPlots)
  })
  input.click()
}

export function importPlotsFromUrl(url: string) {
  fetch(url).then<Plot[]>(res => res.json()).then(addPlots)
}

export function exportPlotSchema() {
  fetch('./plots.schema.json').then(res => res.blob()).then(res => {
    const a = document.createElement('a')
    a.download = 'plots.schema.json'
    a.href = URL.createObjectURL(new Blob([ res ], { type: 'application/json' }))
    a.click()
    URL.revokeObjectURL(a.href)
  })
}

import defaultPlotsJson from './default-plots.json'
export const defaultPlots: { name: string, url: string }[] = defaultPlotsJson
