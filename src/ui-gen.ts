import './ui-gen.css'

export function createIcon(href: string, click?: (this: HTMLAnchorElement, evt: MouseEvent) => void): SVGSVGElement | HTMLAnchorElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.classList.add('icon')
  svg.setAttribute('viewBox', '0 0 24 24')
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
  use.setAttribute('href', href)
  svg.append(use)
  if (!click)
    return svg
  const a = document.createElement('a')
  a.classList.add('icon')
  a.addEventListener('click', click)
  a.append(svg)
  return a
}

export function createButton(text: string, click: (this: HTMLAnchorElement, evt: MouseEvent) => void) {
  const a = document.createElement('a')
  a.classList.add('button')
  a.textContent = text
  a.addEventListener('click', click)
  return a
}

export function createSelect<const T>(options: { text: string, value: T }[], selected: T, select: (value: T) => void): HTMLDivElement {
  const div = document.createElement('div')
  div.classList.add('select')
  for (const option of options) {
    const a = document.createElement('a')
    a.textContent = option.text
    if (option.value === selected)
      a.classList.add('selected')
    a.addEventListener('click', () => {
      for (const other of div.children)
        if (other !== a)
          other.classList.remove('selected')
      a.classList.add('selected')
      select(option.value)
    })
    div.append(a)
  }
  return div
}

export function createTitle(text: string): HTMLSpanElement {
  const span = document.createElement('span')
  span.textContent = text
  span.classList.add('title')
  return span
}
