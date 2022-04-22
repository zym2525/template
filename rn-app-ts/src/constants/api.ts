export const SERVER_URL = __DEV__
    ? "http://192.168.1.101:3000" //http://118.178.225.198:8087
    : "http://api.huijiaoketang.com"; //http://api.huijiaoketang.com


export default {
    user: {
        login: `${SERVER_URL}/api/login`,
    }
}