import wave from './waves'

const install = function (Vue) {
  Vue.directive('waves', wave)
}

if (window.Vue) {
  window.waves = wave
  Vue.use(install); // eslint-disable-line
}

wave.install = install
export const waves = wave
export default waves
