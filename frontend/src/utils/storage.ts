export default {
  set: (value: string) => localStorage.setItem('bpm', value),
  get: () => JSON.parse(localStorage.getItem('bpm') ?? '{}'),
  clear: () => localStorage.removeItem('bpm')
}
