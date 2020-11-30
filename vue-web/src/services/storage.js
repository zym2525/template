
import Storage from '@/utils/storage/storage'
import sync from './storeSync';

var storage = new Storage({
    storageBackend: window.localStorage,
    // 数据过期时间 10分钟
    defaultExpires: 1000 * 60 * 10,
    enableCache: true,
    sync: sync

})

window.storage = storage;

export default storage;