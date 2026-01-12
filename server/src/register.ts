import type { Core } from '@strapi/strapi';

/**
 * Register custom field on the server side
 */
const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'inline-text-formatter',
    plugin: 'propagande-text-field-formatting',
    type: 'text',
    inputSize: {
      default: 6,
      isResizable: true,
    },
  });
};

export default register;
