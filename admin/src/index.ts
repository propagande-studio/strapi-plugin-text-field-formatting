import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import { StrapiApp } from '@strapi/admin/strapi-admin';

export default {
  register(app: StrapiApp) {
    // Register custom field
    app.customFields.register({
      name: 'inline-text-formatter',
      pluginId: PLUGIN_ID,
      type: 'string',
      intlLabel: {
        id: getTranslation('field.label'),
        defaultMessage: 'Inline Text Formatter',
      },
      intlDescription: {
        id: getTranslation('field.description'),
        defaultMessage: 'A text field with inline formatting options',
      },
      // @ts-expect-error
      icon: PluginIcon,
      components: {
        Input: async () =>
          // @ts-expect-error
          import('./components/InlineTextFormatter').then((module) => ({
            default: module.InlineTextFormatter,
          })),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: getTranslation('settings.section.format'),
              defaultMessage: 'Format Options',
            },
            items: [
              {
                // @ts-expect-error
                name: 'options.output',
                type: 'select',
                intlLabel: {
                  id: getTranslation('settings.output.label'),
                  defaultMessage: 'Output Format',
                },
                description: {
                  id: getTranslation('settings.output.hint'),
                  defaultMessage: 'Choose how the formatted text should be stored in the database',
                },
                defaultValue: 'html',
                options: [
                  {
                    key: 'html',
                    value: 'html',
                    metadatas: {
                      intlLabel: {
                        id: getTranslation('settings.output.html'),
                        defaultMessage: 'HTML',
                      },
                    },
                  },
                  {
                    key: 'markdown',
                    value: 'markdown',
                    metadatas: {
                      intlLabel: {
                        id: getTranslation('settings.output.markdown'),
                        defaultMessage: 'Markdown',
                      },
                    },
                  },
                ],
              },
              {
                // @ts-expect-error
                name: 'options.allowNewlines',
                type: 'checkbox',
                intlLabel: {
                  id: getTranslation('settings.allowNewlines.label'),
                  defaultMessage: 'Allow Line Breaks',
                },
                description: {
                  id: getTranslation('settings.allowNewlines.hint'),
                  defaultMessage: 'Allow users to insert line breaks (Shift+Enter)',
                },
                defaultValue: true,
              },
            ],
          },
          {
            sectionTitle: {
              id: getTranslation('settings.section.allowedFormats'),
              defaultMessage: 'Allowed Formats',
            },
            items: [
              {
                // @ts-expect-error
                name: 'options.allowBold',
                type: 'checkbox',
                intlLabel: {
                  id: getTranslation('settings.format.bold'),
                  defaultMessage: 'Bold',
                },
                defaultValue: true,
              },
              {
                // @ts-expect-error
                name: 'options.allowItalic',
                type: 'checkbox',
                intlLabel: {
                  id: getTranslation('settings.format.italic'),
                  defaultMessage: 'Italic',
                },
                defaultValue: true,
              },
              {
                // @ts-expect-error
                name: 'options.allowUnderline',
                type: 'checkbox',
                intlLabel: {
                  id: getTranslation('settings.format.underline'),
                  defaultMessage: 'Underline',
                },
                defaultValue: true,
              },
              {
                // @ts-expect-error
                name: 'options.allowStrikethrough',
                type: 'checkbox',
                intlLabel: {
                  id: getTranslation('settings.format.strikethrough'),
                  defaultMessage: 'Strikethrough',
                },
                defaultValue: false,
              },
              {
                // @ts-expect-error
                name: 'options.allowCode',
                type: 'checkbox',
                intlLabel: {
                  id: getTranslation('settings.format.code'),
                  defaultMessage: 'Inline Code',
                },
                defaultValue: false,
              },
              {
                // @ts-expect-error
                name: 'options.allowLink',
                type: 'checkbox',
                intlLabel: {
                  id: getTranslation('settings.format.link'),
                  defaultMessage: 'Link',
                },
                defaultValue: false,
              },
            ],
          },
          {
            sectionTitle: {
              id: getTranslation('settings.section.advanced'),
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: getTranslation('settings.required.label'),
                  defaultMessage: 'Required field',
                },
                description: {
                  id: getTranslation('settings.required.hint'),
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
