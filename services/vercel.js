const axios = require("axios");

module.exports = {
  async getDeployments() {
    const projectId = this._getApiProjectId();
    const teamId = this._getApiTeamId();
    const res = await this._getClient().get(
      `/v6/now/deployments?projectId=${projectId}&limit=10${teamId ? `&teamId=${teamId}` : ''}`
    );
    return res.data;
  },
  async getDeployment(id) {
    const res = await this._getClient().get(`/v10/now/deployments/${id}`)
    return res.data;
  },
  async deploy(target) {
    const triggers = this._getApiTriggers();
    if (!triggers[target]) throw `[strapi-plugin-vercel] Undefined vercel.triggers.${target}`;
    const res = await this._getClient().get(`/v1/integrations/deploy/${this._getApiProjectId()}/${triggers[target]}`);
    return res.data;
  },

  _getClient() {
    if (!this._client) {
      this._client = axios.create({
        baseURL: 'https://api.vercel.com',
        headers: {
          'Authorization': `Bearer ${this._getApiToken()}`,
          'Content-Type': 'application/json'
        },
      });
    }

    return this._client;
  },
  _getApiToken() {
    const conf = strapi.config.server.vercel.token;
    if (!conf) throw "[strapi-plugin-vercel] Missing vercel.token";
    return conf;
  },
  _getApiProjectId() {
    const conf = strapi.config.server.vercel.projectId;
    if (!conf) throw "[strapi-plugin-vercel] Missing vercel.projectId";
    return conf;
  },
  _getApiTeamId() {
    return strapi.config.server.vercel.teamId;
  },
  _getApiTriggers() {
    const conf = strapi.config.server.vercel.triggers;
    if (!conf) throw "[strapi-plugin-vercel] Missing vercel.triggers";
    return conf;
  }
};
