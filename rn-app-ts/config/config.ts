import NativeConfig from '@zero-d/rn-config'

type ConfigType = {
    /**
     * api地址
     */
    SERVER_URL: string
    /**
     * 实验播放地址
     */
    EXPERIMENT_URL: string
    /**
     * 微课播放地址
     */
    RecordMicroSolution_URL: string
    /**
     * ppt地址
     */
    PPT_URL: string
    /**
     * 赶考api地址
     */
    GK_URL: string
}

export default NativeConfig as ConfigType;