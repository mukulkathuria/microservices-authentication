// basically we use to maintain expired refresh token in database. showing right now its just for local use

const Jwt = {
  expiredTokens: {},

  checkValidToken(token) {
    if (this.expiredTokens[token.reId]) {
      return { error: "Cant use that token" };
    }
    return { success: true };
  },

  addExpireTokens(key, token) {
    this.expiredTokens[key] = JSON.parse(token);
  },
};

module.exports = Jwt;
