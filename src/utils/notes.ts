export type Semester = 'frst' | 'scnd' | 'annual'
export type Absences = {
  ma: number
  ua: number
  da: number
  total: number
}

export const absences: Array<keyof Absences> = ['ma', 'ua', 'da']
export const notes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
export const descriptors = ['N', 'S', 'G', 'VG']

export function usesDescriptors(notes: {value: string}[]) {
  for (const note of notes) {
    if (descriptors.includes(note.value)) {
      return true
    }
  }
  return false
}

export function parseNoteValue(value: string, useDescriptors: boolean) {
  return useDescriptors ? (4 + 2 * descriptors.indexOf(value)) : parseInt(value)
}

export function parsePerformance(value: string, useDescriptors: boolean) {
  return useDescriptors ? (4 + 2 * descriptors.indexOf(value)) : parseFloat(value)
}

export function performanceToHundreds(performance: number, useDescriptors: boolean, count?: number) {
  if (performance === 0) {
    return '-'
  }
  if (useDescriptors) {
    const descriptorIndex = Math.ceil(Math.floor(performance) / 2) - 2
    if (descriptorIndex < 0) {
      return '-'
    } else if (descriptorIndex >= descriptors.length) {
      return '-'
    }
    return descriptors[descriptorIndex]
  }
  if (count) {
    return roundToHundreeds(performance, count).toFixed(2)
  }
  return performance.toFixed(2)
}

export function roundToHundreeds(val: number, q: number) {
  return Math.round(val / q * 100) / 100
}