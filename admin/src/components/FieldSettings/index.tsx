import React from 'react';
import { useIntl } from 'react-intl';
import {
  Box,
  Field,
  Flex,
  MultiSelect,
  MultiSelectOption,
  SingleSelect,
  SingleSelectOption,
} from '@strapi/design-system';
import { getTranslation } from '../../utils/getTranslation';

interface FieldSettingsProps {
  options: {
    output?: 'html' | 'markdown';
    allowedFormats?: string[];
  };
  onChange: (options: { output?: 'html' | 'markdown'; allowedFormats?: string[] }) => void;
}

const AVAILABLE_FORMATS = [
  { value: 'bold', label: 'Bold' },
  { value: 'italic', label: 'Italic' },
  { value: 'underline', label: 'Underline' },
  { value: 'strikethrough', label: 'Strikethrough' },
  { value: 'code', label: 'Inline Code' },
  { value: 'link', label: 'Link' },
];

const OUTPUT_OPTIONS = [
  { value: 'html', label: 'HTML' },
  { value: 'markdown', label: 'Markdown' },
];

export const FieldSettings: React.FC<FieldSettingsProps> = ({ options, onChange }) => {
  const { formatMessage } = useIntl();

  const handleOutputChange = (value: string) => {
    onChange({
      ...options,
      output: value as 'html' | 'markdown',
    });
  };

  const handleFormatsChange = (values: string[]) => {
    onChange({
      ...options,
      allowedFormats: values,
    });
  };

  return (
    <Box padding={4}>
      <Flex direction="column" alignItems="stretch" gap={4}>
        <Field.Root name="output">
          <Field.Label>
            {formatMessage({
              id: getTranslation('settings.output.label'),
              defaultMessage: 'Output Format',
            })}
          </Field.Label>
          <SingleSelect value={options.output || 'html'} onChange={handleOutputChange}>
            {OUTPUT_OPTIONS.map((option) => (
              <SingleSelectOption key={option.value} value={option.value}>
                {option.label}
              </SingleSelectOption>
            ))}
          </SingleSelect>
          <Field.Hint>
            {formatMessage({
              id: getTranslation('settings.output.hint'),
              defaultMessage: 'Choose how the formatted text should be stored in the database',
            })}
          </Field.Hint>
        </Field.Root>

        <Field.Root name="allowedFormats">
          <Field.Label>
            {formatMessage({
              id: getTranslation('settings.allowedFormats.label'),
              defaultMessage: 'Allowed Formats',
            })}
          </Field.Label>
          <MultiSelect
            value={options.allowedFormats || AVAILABLE_FORMATS.map((f) => f.value)}
            onChange={handleFormatsChange}
            placeholder={formatMessage({
              id: getTranslation('settings.allowedFormats.placeholder'),
              defaultMessage: 'Select allowed formats',
            })}
          >
            {AVAILABLE_FORMATS.map((format) => (
              <MultiSelectOption key={format.value} value={format.value}>
                {format.label}
              </MultiSelectOption>
            ))}
          </MultiSelect>
          <Field.Hint>
            {formatMessage({
              id: getTranslation('settings.allowedFormats.hint'),
              defaultMessage: 'Select which formatting options are available for this field',
            })}
          </Field.Hint>
        </Field.Root>
      </Flex>
    </Box>
  );
};
