/*
Auth Client Doesn't cache any requests and makes only POST requests
Therefore it doesn't need to be a service client
*/

export { sendAuthRequest, sendOauth2Request } from "./auth";
export { sendLogoutRequest } from "./token";
export { fetchAuthUser, updateAuthUserEmail, updateAuthUserPassword, deleteAuthUser } from "./user";
export { sendCodeVerificationRequest, sendTokenVerificationRequest } from "./verification";