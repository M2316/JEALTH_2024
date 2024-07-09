export function getAccessToken() {
    return localStorage.getItem("accessToken");
}
export function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}
export function setToken(key, token) {
    localStorage.setItem(key, token);
}