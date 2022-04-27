module.exports = {
  async find(ctx) {
    try {
      const data = await strapi.plugins.vercel.services.vercel.getDeployments();
      ctx.send(data);
    } catch (e) {
      console.error(e);
      ctx.send({ error: e, message: 'Cannot list deployments' }, 400);
    }
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    try {
      const data = await strapi.plugins.vercel.services.vercel.getDeployment(id);
      ctx.send(data);
    } catch (e) {
      console.error(e);
      ctx.send({ error: e, message: 'Cannot get deployment detail' }, 400);
    }
  },
  async deploy(ctx) {
    const { target } = ctx.params;
    try {
      const data = await strapi.plugins.vercel.services.vercel.deploy(target);
      ctx.send(data);
    } catch (e) {
      console.error(e);
      console.error({ target });
      ctx.send({ error: e, message: 'Cannot trigger deployment' }, 400);
    }
  }
};
