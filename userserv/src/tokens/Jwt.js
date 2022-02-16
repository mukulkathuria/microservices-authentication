const Jwt = {
  expiredTokens: {},

  checkValidToken(token) {
    if (Date.now() >= token.exp * 1000) {
      return { error: "Token Expired" };
    } else if (this.expiredTokens[token.reId]) {
      return { error: "Cant use that token" };
    }
    return { success: true };
  },

  addExpireTokens(key, token) {
    this.expiredTokens[key] = JSON.parse(token);
  },
};

module.exports = Jwt;
