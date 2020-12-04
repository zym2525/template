import Cookies from 'js-cookie'
import { DeviceType } from '@/constants'

const state = {
  deviceType: DeviceType.Desktop,
  isMobile: false
}

const mutations = {
  TOGGLE_DEVICE: (state, deviceType) => {
    state.deviceType = deviceType;
    state.isMobile = deviceType != DeviceType.Desktop;
  },
}

const actions = {
  toggleDevice({ commit }, deviceType) {
    commit('TOGGLE_DEVICE', deviceType)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
