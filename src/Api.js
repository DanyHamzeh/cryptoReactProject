let rejisterApi = (language) =>
  `http://localhost:5001/crypto_wallet/register?language=${language}`;

let loginApi = (language) =>
  `http://localhost:5001/crypto_wallet/login?language=${language}`;

let logoutApi = (language) =>
  `http://localhost:5001/crypto_wallet/logout?language=${language}`;

let getUserInfoApi = (language) =>
  `http://localhost:5001/crypto_wallet/getuserinfo?language=${language}`;

let getUserRefferalApi = (language) =>
  `http://localhost:5001/crypto_wallet/getuserreferralurl?language=${language}`;

let editUserPasswordApi = (language) =>
  `http://localhost:5001/crypto_wallet/edituserpass?language=${language}`;

let resetUserPassApi = (language) =>
  `http://localhost:5001/crypto_wallet/resetuserpass?language=${language}`;

let depositeAddressApi = (language) =>
  `http://localhost:5001/crypto_wallet/getdepositaddress?language=${language}`;

let collectInvApi = (language) =>
  `http://localhost:5001/crypto_wallet/collectinv?language=${language}`;

let getGiftBalanceApi = (language) =>
  `http://localhost:5001/crypto_wallet/getgiftbalance?language=${language}`;

let investGiftApi = (language) =>
  `http://localhost:5001/crypto_wallet/investgift?language=${language}`;

let userInvestmentApi = (language) =>
  `http://localhost:5001/crypto_wallet/userinvestment?language=${language}`;

let withDrawGiftApi = (language) =>
  `http://localhost:5001/crypto_wallet/withdrawgift?language=${language}`;

let reinvestApi = (language) =>
  `http://localhost:5001/crypto_wallet/reinvest?language=${language}`;

let withDrawApi = (language) =>
  `http://localhost:5001/crypto_wallet/withdraw?language=${language}`;

let userWalletApi = (language) =>
  `http://localhost:5001/crypto_wallet/getuserwallets?language=${language}`;

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
};
