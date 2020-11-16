module.exports = {
  async find(ctx) {
    try {
      const data = await strapi.plugins.vercel.services.vercel.getDeployments();
      ctx.send(data);
    } catch (e) {
      ctx.send({ error: e }, 400);
    }
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    try {
      const data = await strapi.plugins.vercel.services.vercel.getDeployment(id);
      ctx.send(data);
    } catch (e) {
      ctx.send({ error: e }, 400);
    }
  },
  async deploy(ctx) {
    const { target } = ctx.params;
    try {
      const data = await strapi.plugins.vercel.services.vercel.deploy(target);
      ctx.send(data);
    } catch (e) {
      ctx.send({ error: e }, 400);
    }
  }
};
