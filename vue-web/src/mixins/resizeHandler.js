import store from '@/store'
import { DeviceType, ScreenBreakPoints } from '@/constants'
import _ from 'lodash'
import { mapGetters } from 'vuex'

const { body } = document


export default {
    computed: {
        ...mapGetters(["deviceType"]),
    },
    beforeMount() {
        window.addEventListener('resize', this.$_resizeHandler)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.$_resizeHandler)
    },
    mounted() {
        const deviceType = this.$_createDeviceType();
        if (deviceType) {
            store.dispatch('app/toggleDevice', deviceType)
        }
    },
    methods: {
        $_createDeviceType() {
            const rect = body.getBoundingClientRect();
            const width = rect.width;
            if (width >= ScreenBreakPoints.md) {
                return DeviceType.Desktop;
            } else if (width >= ScreenBreakPoints.sm) {
                return DeviceType.Pad;
            } else {
                return DeviceType.Phone;
            }
        },
        $_resizeHandler: _.throttle(function () {
            if (!document.hidden) {
                const deviceType = this.$_createDeviceType();
                if (this.deviceType != deviceType) {
                    store.dispatch('app/toggleDevice', deviceType);
                }
            }
        }, 300)
    }
}
