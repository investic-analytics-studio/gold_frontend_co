import Cookies from "js-cookie";

const ACCESS_TOKEN: string = "ACCESS_TOKEN";

const setAccessToken = (token: string) =>
  Cookies.set(ACCESS_TOKEN, token, {
    expires: 7,
  });

const getAccessToken = () => Cookies.get(ACCESS_TOKEN);

const removeAccessToken = () => Cookies.remove(ACCESS_TOKEN);

export { setAccessToken, getAccessToken, removeAccessToken };
