import { Main, Box, Typography, Grid, Card } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { Bold, Italic, Underline, StrikeThrough, Code, Link as LinkIcon } from '@strapi/icons';

import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();

  const features = [
    {
      icon: Bold,
      title: 'Bold',
      description: 'Make text stand out with bold formatting',
    },
    {
      icon: Italic,
      title: 'Italic',
      description: 'Add emphasis with italic text',
    },
    {
      icon: Underline,
      title: 'Underline',
      description: 'Underline important text',
    },
    {
      icon: StrikeThrough,
      title: 'Strikethrough',
      description: 'Strike through text to show deletions',
    },
    {
      icon: Code,
      title: 'Inline Code',
      description: 'Format text as inline code',
    },
    {
      icon: LinkIcon,
      title: 'Hyperlinks',
      description: 'Add links to your text',
    },
  ];

  return (
    <Main>
      <Box padding={8}>
        <Box paddingBottom={4}>
          <Typography variant="alpha" as="h1">
            {formatMessage({
              id: getTranslation('plugin.name'),
              defaultMessage: 'Text Field Formatting',
            })}
          </Typography>
          <Typography variant="omega" textColor="neutral600">
            {formatMessage({
              id: getTranslation('plugin.description'),
              defaultMessage: 'Add inline formatting to text fields',
            })}
          </Typography>
        </Box>

        <Box paddingTop={6} paddingBottom={4}>
          <Typography variant="beta" as="h2">
            Available Formatting Options
          </Typography>
        </Box>

        <Grid.Root gap={4}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Grid.Item key={feature.title} col={4} s={12}>
                <Card padding={4}>
                  <Box paddingBottom={2}>
                    <Icon width="24px" height="24px" />
                  </Box>
                  <Typography variant="delta" as="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="omega" textColor="neutral600">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid.Item>
            );
          })}
        </Grid.Root>

        <Box paddingTop={6}>
          <Typography variant="beta" as="h2" paddingBottom={2}>
            How to Use
          </Typography>
          <Typography variant="omega" as="p" paddingBottom={2}>
            1. Go to Content-Type Builder
          </Typography>
          <Typography variant="omega" as="p" paddingBottom={2}>
            2. Select a content type or create a new one
          </Typography>
          <Typography variant="omega" as="p" paddingBottom={2}>
            3. Add a new field and select "Inline Text Formatter" from the custom fields section
          </Typography>
          <Typography variant="omega" as="p" paddingBottom={2}>
            4. Configure the output format (HTML or Markdown) and allowed formatting options
          </Typography>
          <Typography variant="omega" as="p">
            5. Save and start using your formatted text field!
          </Typography>
        </Box>
      </Box>
    </Main>
  );
};

export { HomePage };
