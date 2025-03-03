import Cookies from "js-cookie";

const ACCESS_TOKEN: string = "ACCESS_TOKEN";

const setAccessToken = (token: string) => Cookies.set(ACCESS_TOKEN, token);
const getAccessToken = () => Cookies.get(ACCESS_TOKEN);
const removeAccessToken = () => Cookies.remove(ACCESS_TOKEN);

const setExpireFlag = () => Cookies.set("EXPIRE_FLAG", "true");
const getExpireFlag = () => Cookies.get("EXPIRE_FLAG");
const removeExpireFlag = () => Cookies.remove("EXPIRE_FLAG");

export {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  setExpireFlag,
  getExpireFlag,
  removeExpireFlag,
};
