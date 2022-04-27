const axios = require("axios");

const DEFAULTS = {
  deployments: 10
}

module.exports = {
  async getDeployments() {
    this._validate();

    const config = this._getConfig();
    const params = {
      projectId: config.projectId,
      limit: config.deployments,
    }

    // Team is optional, in case of personal profile or global token
    if (config.teamId) {
      params['teamId'] = config.teamId;
    }

    const res = await this._getClient().get(`/v6/deployments`, { params });
    return res.data;
  },
  async getDeployment(id) {
    const res = await this._getClient().get(`/v13/deployments/${id}`)
    return res.data;
  },
  async deploy(target) {
    const triggers = this._getApiTriggers();
    if (!triggers[target]) throw `[strapi-plugin-vercel] Undefined vercel.triggers.${target}`;
    const res = await this._getClient().get(`/v1/integrations/deploy/${this._getApiProjectId()}/${triggers[target]}`);
    return res.data;
  },
  _validate() {
    if (!strapi.config.server.vercel) {
      throw `[strapi-plugin-vercel] Missing vercel configuration (config/server.js > vercel)`;
    }
  },
  /**
   * @returns {import('axios').AxiosInstance}
   */
  _getClient() {
    if (!this._client) {
      this._client = axios.create({
        baseURL: 'https://api.vercel.com',
        headers: {
          'Authorization': `Bearer ${this._getApiToken()}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Strapi Vercel'
        },
      });
    }

    return this._client;
  },
  _getConfig() {
    return {
      token: this._getApiToken(),
      projectId: this._getApiProjectId(),
      teamId: this._getApiTeamId(),
      triggers: this._getApiTriggers(),
      config: { ...DEFAULTS, ...(strapi.config.server.vercel.config || {}) },
    }
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
  },
};
