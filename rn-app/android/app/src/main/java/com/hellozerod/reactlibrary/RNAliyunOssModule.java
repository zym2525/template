package com.hellozerod.reactlibrary;

/**
 * Created by Administrator on 2018/1/12.
 */

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.util.Base64;
import android.util.Log;

import com.alibaba.sdk.android.oss.ClientConfiguration;
import com.alibaba.sdk.android.oss.ClientException;
import com.alibaba.sdk.android.oss.OSS;
import com.alibaba.sdk.android.oss.OSSClient;
import com.alibaba.sdk.android.oss.ServiceException;
import com.alibaba.sdk.android.oss.callback.OSSCompletedCallback;
import com.alibaba.sdk.android.oss.callback.OSSProgressCallback;
import com.alibaba.sdk.android.oss.common.auth.OSSCredentialProvider;
import com.alibaba.sdk.android.oss.common.auth.OSSCustomSignerCredentialProvider;
import com.alibaba.sdk.android.oss.common.auth.OSSPlainTextAKSKCredentialProvider;
import com.alibaba.sdk.android.oss.common.auth.OSSStsTokenCredentialProvider;
import com.alibaba.sdk.android.oss.internal.OSSAsyncTask;
import com.alibaba.sdk.android.oss.model.GetObjectRequest;
import com.alibaba.sdk.android.oss.model.GetObjectResult;
import com.alibaba.sdk.android.oss.model.ObjectMetadata;
import com.alibaba.sdk.android.oss.model.PutObjectRequest;
import com.alibaba.sdk.android.oss.model.PutObjectResult;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class RNAliyunOssModule extends ReactContextBaseJavaModule {

    private OSS oss;

    private final ReactApplicationContext reactContext;

    public RNAliyunOssModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNAliyunOSS";
    }

    @ReactMethod
    public void initWithSigner(final String signature, final String accessKey, String endPoint,
            ReadableMap configuration) {

        OSSCredentialProvider credentialProvider = new OSSCustomSignerCredentialProvider() {
            @Override
            public String signContent(String content) {
                return "OSS " + accessKey + ":" + signature;
            }
        };

        ClientConfiguration conf = new ClientConfiguration();
        conf.setConnectionTimeout(configuration.getInt("timeoutIntervalForRequest") * 1000);
        conf.setSocketTimeout(configuration.getInt("timeoutIntervalForRequest") * 1000);
        conf.setMaxConcurrentRequest(configuration.getInt("maxRetryCount"));
        conf.setMaxErrorRetry(configuration.getInt("maxRetryCount"));

        oss = new OSSClient(getReactApplicationContext().getApplicationContext(), endPoint, credentialProvider, conf);

        Log.d("AliyunOSS", "OSS initWithSigner ok!");
    }

    @ReactMethod
    public void initWithPlainTextAccessKey(String accessKeyId, String accessKeySecret, String endPoint,
            ReadableMap configuration) {
        // OSSCredentialProvider credentialProvider = new
        // OSSFederationCredentialProvider() {
        // @Override
        // public OSSFederationToken getFederationToken() {
        // try {
        // URL stsUrl = new URL("http://localhost:8080/distribute-token.json");
        // HttpURLConnection conn = (HttpURLConnection) stsUrl.openConnection();
        // InputStream input = conn.getInputStream();
        // String jsonText = IOUtils.readStreamAsString(input,
        // OSSConstants.DEFAULT_CHARSET_NAME);
        // JSONObject jsonObjs = new JSONObject(jsonText);
        // String ak = jsonObjs.getString("accessKeyId");
        // String sk = jsonObjs.getString("accessKeySecret");
        // String token = jsonObjs.getString("securityToken");
        // String expiration = jsonObjs.getString("expiration");
        // return new OSSFederationToken(ak, sk, token, expiration);
        // } catch (Exception e) {
        // e.printStackTrace();
        // }
        // return null;
        // }
        // };
        OSSCredentialProvider credentialProvider = new OSSPlainTextAKSKCredentialProvider(accessKeyId, accessKeySecret);
        ClientConfiguration conf = new ClientConfiguration();
        conf.setConnectionTimeout(configuration.getInt("timeoutIntervalForRequest") * 1000);
        conf.setSocketTimeout(configuration.getInt("timeoutIntervalForRequest") * 1000);
        conf.setMaxConcurrentRequest(configuration.getInt("maxRetryCount"));
        conf.setMaxErrorRetry(configuration.getInt("maxRetryCount"));

        oss = new OSSClient(getReactApplicationContext().getApplicationContext(), endPoint, credentialProvider, conf);

        Log.d("AliyunOSS", "OSS initWithKey ok!");
    }

    @ReactMethod
    public void initWithSecurityToken(String securityToken, String accessKeyId, String accessKeySecret, String endPoint,
            ReadableMap configuration) {
        OSSCredentialProvider credentialProvider = new OSSStsTokenCredentialProvider(accessKeyId, accessKeySecret,
                securityToken);

        ClientConfiguration conf = new ClientConfiguration();
        conf.setConnectionTimeout(configuration.getInt("timeoutIntervalForRequest") * 1000);
        conf.setSocketTimeout(configuration.getInt("timeoutIntervalForRequest") * 1000);
        conf.setMaxConcurrentRequest(configuration.getInt("maxRetryCount"));
        conf.setMaxErrorRetry(configuration.getInt("maxRetryCount"));

        oss = new OSSClient(getReactApplicationContext().getApplicationContext(), endPoint, credentialProvider, conf);

        Log.d("AliyunOSS", "OSS initWithKey ok!");
    }

    public static String bitmapToBase64(Bitmap bitmap) {

        String result = null;
        ByteArrayOutputStream baos = null;
        try {
            if (bitmap != null) {
                baos = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.PNG, 100, baos);

                baos.flush();
                baos.close();

                byte[] bitmapBytes = baos.toByteArray();
                result = Base64.encodeToString(bitmapBytes, Base64.DEFAULT);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (baos != null) {
                    baos.flush();
                    baos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    @ReactMethod
    public void asyncUpload(String bucketName, String ossFile, String sourceFile, final Promise promise) {
        // 构造上传请求
        boolean isFile = false;
        if (sourceFile.contains("file://")) {
            isFile = true;
        }
        if (sourceFile != null) {
            sourceFile = sourceFile.replace("file://", "");
        }
        PutObjectRequest put;
        if (isFile) {
            put = new PutObjectRequest(bucketName, ossFile, sourceFile);
        } else {
            // Bitmap bitmap = BitmapFactory.decodeFile(sourceFile);
            Bitmap bitmap = BitmapFactory.decodeByteArray(Base64.decode(sourceFile, Base64.DEFAULT), 0,
                    Base64.decode(sourceFile, Base64.DEFAULT).length);
            // int height = Math.round((float)(bitmap.getHeight()*907/bitmap.getWidth()));
            // Bitmap mBitmap = Bitmap.createScaledBitmap(bitmap, 907,height, true);
            Log.e("YUNWidth", bitmap.getWidth() + "");
            Log.e("YUNHeight", bitmap.getHeight() + "");
            bitmap.getHeight();
            byte[] byteArr = Base64.decode(bitmapToBase64(bitmap), Base64.DEFAULT);

            Log.e("byteArr", byteArr.length + "");
            put = new PutObjectRequest(bucketName, ossFile, byteArr);

            // mBitmap.recycle();
            bitmap.recycle();
        }

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType("application/octet-stream");
        put.setMetadata(metadata);

        // 异步上传时可以设置进度回调
        put.setProgressCallback(new OSSProgressCallback<PutObjectRequest>() {
            @Override
            public void onProgress(PutObjectRequest request, long currentSize, long totalSize) {
                Log.d("PutObject", "currentSize: " + currentSize + " totalSize: " + totalSize);
                String str_currentSize = Long.toString(currentSize);
                String str_totalSize = Long.toString(totalSize);
                // WritableMap onProgressValueData = Arguments.createMap();
                // onProgressValueData.putString("currentSize", str_currentSize);
                // onProgressValueData.putString("totalSize", str_totalSize);
                // getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                // .emit("uploadProgress", onProgressValueData);
            }
        });

        OSSAsyncTask task = oss.asyncPutObject(put, new OSSCompletedCallback<PutObjectRequest, PutObjectResult>() {
            @Override
            public void onSuccess(PutObjectRequest request, PutObjectResult result) {
                Log.d("PutObject", "UploadSuccess");
                Log.d("ETag", result.getETag());
                Log.d("RequestId", result.getRequestId());
                promise.resolve("UploadSuccess");
                WritableMap onProgressValueData = Arguments.createMap();
                onProgressValueData.putString("status", "success");
                getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("uploadProgress", onProgressValueData);
            }

            @Override
            public void onFailure(PutObjectRequest request, ClientException clientExcepion,
                    ServiceException serviceException) {
                WritableMap onProgressValueData = Arguments.createMap();
                onProgressValueData.putString("status", "failure");
                // 请求异常
                if (clientExcepion != null) {
                    // 本地异常如网络异常等
                    clientExcepion.printStackTrace();
                    onProgressValueData.putString("exception", clientExcepion.getLocalizedMessage());
                }
                if (serviceException != null) {
                    // 服务异常
                    Log.e("ErrorCode", serviceException.getErrorCode());
                    Log.e("RequestId", serviceException.getRequestId());
                    Log.e("HostId", serviceException.getHostId());
                    Log.e("RawMessage", serviceException.getRawMessage());
                    onProgressValueData.putString("exception", serviceException.getLocalizedMessage());
                }
                getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("uploadProgress", onProgressValueData);
                promise.reject("UploadFail", serviceException.getRawMessage());
            }
        });
        Log.d("AliyunOSS", "OSS uploadObjectAsync ok!");
    }

    @ReactMethod
    public void asyncDownload(String bucketName, String ossFile, String updateDate, final Promise promise) {
        // 构造下载文件请求
        GetObjectRequest get = new GetObjectRequest(bucketName, ossFile);

        OSSAsyncTask task = oss.asyncGetObject(get, new OSSCompletedCallback<GetObjectRequest, GetObjectResult>() {
            @Override
            public void onSuccess(GetObjectRequest request, GetObjectResult result) {
                // 请求成功
                Log.d("Content-Length", "" + result.getContentLength());

                InputStream inputStream = result.getObjectContent();
                long resultLength = result.getContentLength();

                byte[] buffer = new byte[2048];
                int len;

                FileOutputStream outputStream = null;
                String localImgURL = Environment.getExternalStorageDirectory().getAbsolutePath() + "/ImgCache/"
                        + System.currentTimeMillis() + ".jpg";
                Log.d("localImgURL", localImgURL);
                File cacheFile = new File(localImgURL);
                if (!cacheFile.exists()) {
                    cacheFile.getParentFile().mkdirs();
                    try {
                        cacheFile.createNewFile();
                    } catch (IOException e) {
                        e.printStackTrace();
                        promise.reject("DownloadFaile", e);
                    }
                }
                long readSize = cacheFile.length();
                try {
                    outputStream = new FileOutputStream(cacheFile, true);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                    promise.reject("DownloadFaile", e);
                }
                if (resultLength == -1) {
                    promise.reject("DownloadFaile", "message:lengtherror");
                }

                try {
                    while ((len = inputStream.read(buffer)) != -1) {
                        // 处理下载的数据
                        try {
                            outputStream.write(buffer, 0, len);
                            readSize += len;

                            String str_currentSize = Long.toString(readSize);
                            String str_totalSize = Long.toString(resultLength);
                            WritableMap onProgressValueData = Arguments.createMap();
                            onProgressValueData.putString("currentSize", str_currentSize);
                            onProgressValueData.putString("totalSize", str_totalSize);
                            getReactApplicationContext()
                                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                    .emit("downloadProgress", onProgressValueData);

                        } catch (IOException e) {
                            e.printStackTrace();
                            promise.reject("DownloadFaile", e);
                        }
                    }
                    outputStream.flush();
                } catch (IOException e) {
                    e.printStackTrace();
                    promise.reject("DownloadFaile", e);
                } finally {
                    if (outputStream != null) {
                        try {
                            outputStream.close();
                        } catch (IOException e) {
                            promise.reject("DownloadFaile", e);
                        }
                    }
                    if (inputStream != null) {
                        try {
                            inputStream.close();
                        } catch (IOException e) {
                            promise.reject("DownloadFaile", e);
                        }
                    }
                    promise.resolve(localImgURL);
                }
            }

            @Override
            public void onFailure(GetObjectRequest request, ClientException clientExcepion,
                    ServiceException serviceException) {
                // 请求异常
                if (clientExcepion != null) {
                    // 本地异常如网络异常等
                    clientExcepion.printStackTrace();
                }
                if (serviceException != null) {
                    // 服务异常
                    Log.e("ErrorCode", serviceException.getErrorCode());
                    Log.e("RequestId", serviceException.getRequestId());
                    Log.e("HostId", serviceException.getHostId());
                    Log.e("RawMessage", serviceException.getRawMessage());
                }
                promise.reject("DownloadFaile", "message:networkerror");
            }
        });

        // task.cancel(); // 可以取消任务

        // task.waitUntilFinished(); // 如果需要等待任务完成
    }

}