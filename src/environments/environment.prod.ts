const baseRestURL = "https://devdevdev.tk:3001"
export const environment = {
  production: true,
  restApi: {
    login:  baseRestURL + "/login",
    logout: baseRestURL + "/logout",
    register: baseRestURL + "/register",
    renewToken: baseRestURL + "/user/renewtoken",
    userRoles: baseRestURL + "/user-roles"
  }
};
