import {
  Alert,
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeAppEventEmitter,
  NativeModules,
  Platform
} from "react-native";
import Config from '../../../baseConfig'
const { RNAliyunOSS } = NativeModules;
const UPLOAD_EVENT = 'uploadProgress';
const DOWNLOAD_EVENT = 'downloadProgress';
const _subscriptions = new Map();

let subscription;

//default configuration for OSS Client
const defaultConfig = {
  configuration: {
    maxRetryCount: 3,
    timeoutIntervalForRequest: 30,
    timeoutIntervalForResource: 24 * 60 * 60
  },
  accessKey: {
    ...Config.oss.accessKey
  },
  endPoint: Config.oss.endPoint,
  bucketName: Config.oss.bucketName
};

export default AliyunOSS = {

  //Enable dev mode
  // enableDevMode() {
  //     RNAliyunOSS.enableDevMode();
  // },

  /**
   * Initialize the OSS Client
   * Mode: PlainTextAKSK
   */
  initWithPlainTextAccessKey(config = {}) {
    config = { ...defaultConfig, ...config };
    RNAliyunOSS.initWithPlainTextAccessKey(config.accessKey.AccessKey, config.accessKey.SecretKey, config.endPoint, config.configuration);
  },

  /**
   * Initialize the OSS Client
   * Mode: ImplementedSigner
   */
  initWithImplementedSigner(signature, accessKey = defaultConfig.accessKey.AccessKey, endPoint = defaultConfig.endPoint, configuration = defaultConfig.configuration) {
    RNAliyunOSS.initWithImplementedSigner(signature, accessKey, endPoint, configuration);
  },

  /**
   * Initialize the OSS Client
   * Mode: SecurityToken (STS)
   */
  initWithSecurityToken(securityToken, accessKey = defaultConfig.accessKey.AccessKey, secretKey = defaultConfig.accessKey.SecretKey, endPoint = defaultConfig.endPoint, configuration = defaultConfig.configuration) {
    RNAliyunOSS.initWithSecurityToken(securityToken, accessKey, secretKey, endPoint, configuration);
  },

  /**
   * Asynchronously uploading
   */
  asyncUpload(params = {}) {
    params = {
      bucketName: defaultConfig.bucketName,
      objectKey: '',
      filepath: null,
      ...params
    };
    return RNAliyunOSS.asyncUpload(params.bucketName, params.objectKey, params.filepath);
  },

  /**
   * Asynchronously downloading
   */
  asyncDownload(params = {}) {
    params = {
      bucketName: defaultConfig.bucketName,
      objectKey: 'aadd.png',
      filepath: null,
      ...params
    };
    return RNAliyunOSS.asyncDownload(params.bucketName, params.objectKey, params.filepath);
  },

  /**
   * event listener for native upload/download event
   * @param event one of 'uploadProgress' or 'downloadProgress'
   * @param callback a callback function accepts one params: event
   */
  addEventListener(type, handler) {
    var listener;
    if (Platform.OS === 'ios') {
      const Emitter = new NativeEventEmitter(NativeAliyunOSS);
      if (type === UPLOAD_EVENT) {
        listener = Emitter.addListener(
          'uploadProgress',
          (uploadData) => {
            handler(uploadData);
          }
        );
      } else if (type === DOWNLOAD_EVENT) {
        listener = Emitter.addListener(
          'downloadProgress',
          (downloadData) => {
            handler(downloadData);
          }
        );
      } else {
        return false;
      }
    }
    else {
      if (type === UPLOAD_EVENT) {
        listener = NativeAppEventEmitter.addListener(
          'uploadProgress',
          (uploadData) => {
            handler(uploadData);
          }
        );
      } else if (type === DOWNLOAD_EVENT) {
        listener = NativeAppEventEmitter.addListener(
          'downloadProgress',
          (downloadData) => {
            handler(downloadData);
          }
        );
      } else {
        return false;
      }
    }
    _subscriptions.set(handler, listener);
  },
  // addEventListener(event, callback) {
  //     const RNAliyunEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(RNAliyunOSS) : new DeviceEventEmitter(RNAliyunOSS);
  //     switch (event) {
  //         case 'uploadProgress':
  //             subscription = RNAliyunEmitter.addListener(
  //                 'uploadProgress',
  //                 e => callback(e)
  //             );
  //             break;
  //         case 'downloadProgress':
  //             subscription = RNAliyunEmitter.addListener(
  //                 'downloadProgress',
  //                 e => callback(e)
  //             );
  //             break;
  //         default:
  //             break;
  //     }
  // },

  /**
   * remove event listener for native upload/download event
   * @param event one of 'uploadProgress' or 'downloadProgress'
   */
  // removeEventListener(event) {
  //     switch (event) {
  //         case 'uploadProgress':
  //           _subscriptions.remove();
  //             break;
  //         case 'downloadProgress':
  //           _subscriptions.remove();
  //             break;
  //         default:
  //             break;
  //     }
  // }

  removeEventListener(handler) {
    var listener = _subscriptions.get(handler);
    if (!listener) {
      return;
    }
    listener.remove();
    _subscriptions.delete(handler);
  }
};