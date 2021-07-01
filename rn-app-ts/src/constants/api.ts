export const SERVER_URL = __DEV__
    ? "http://118.178.225.198:8087" //http://118.178.225.198:8087
    : "http://api.huijiaoketang.com"; //http://api.huijiaoketang.com


export default {
    user: {
        auth: `${SERVER_URL}/api/Account/authenticate`,
    }
}