let rejisterApi = (language) => `/register?language=${language}`;

let loginApi = (language) => `/login?language=${language}`;

let logoutApi = (language) => `/logout?language=${language}`;

let getUserInfoApi = (language) => `/getuserinfo?language=${language}`;

let getUserRefferalApi = (language) =>
  `/getuserreferralurl?language=${language}`;

let editUserPasswordApi = (language) => `/edituserpass?language=${language}`;

let resetUserPassApi = (language) => `/resetuserpass?language=${language}`;

let depositeAddressApi = (language) =>
  `/getdepositaddress?language=${language}`;

let collectInvApi = (language) => `/collectinv?language=${language}`;

let getGiftBalanceApi = (language) => `/getgiftbalance?language=${language}`;

let investGiftApi = (language) => `/investgift?language=${language}`;

let userInvestmentApi = (language) => `/userinvestment?language=${language}`;

let withDrawGiftApi = (language) => `/withdrawgift?language=${language}`;

let reinvestApi = (language) => `/reinvest?language=${language}`;

let withDrawApi = (language) => `/withdraw?language=${language}`;

let userWalletApi = (language) => `/getuserwallets?language=${language}`;

let checkSessionAPi = (language) => `/checksession?language=${language}`;

export {
  rejisterApi,
  loginApi,
  logoutApi,
  getUserInfoApi,
  getUserRefferalApi,
  editUserPasswordApi,
  resetUserPassApi,
  depositeAddressApi,
  collectInvApi,
  getGiftBalanceApi,
  userInvestmentApi,
  investGiftApi,
  withDrawGiftApi,
  reinvestApi,
  withDrawApi,
  userWalletApi,
  checkSessionAPi,
};
