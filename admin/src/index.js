import pluginPkg from '../../package.json';
import pluginId from './pluginId';

export default strapi => {
  const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon: pluginPkg.strapi.icon,
    id: pluginId,
    isReady: true,
    initializer: () => null,
    injectedComponents: [],
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles: () => { },
    mainComponent: null,
    name: pluginPkg.strapi.name,
    preventComponentRendering: false,
    trads: {},
  };

  return strapi.registerPlugin(plugin);
};
