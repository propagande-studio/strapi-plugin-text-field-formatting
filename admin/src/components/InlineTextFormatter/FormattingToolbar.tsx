import React, { useState } from 'react';
import { IconButton, Button } from '@strapi/design-system';
import {
  Bold,
  Italic,
  Underline,
  StrikeThrough,
  Code,
  Link as LinkIcon,
  Check,
  Cross,
} from '@strapi/icons';
import { ToolbarContainer, ToolbarGroup, LinkModal, LinkInput } from './styles';

interface FormattingToolbarProps {
  onFormat: (format: string, value?: string) => void;
  activeFormats: Set<string>;
  allowedFormats: string[];
  disabled?: boolean;
}

export const FormattingToolbar: React.FC<FormattingToolbarProps> = ({
  onFormat,
  activeFormats,
  allowedFormats,
  disabled,
}) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const formatButtons = [
    { format: 'bold', icon: Bold, label: 'Bold' },
    { format: 'italic', icon: Italic, label: 'Italic' },
    { format: 'underline', icon: Underline, label: 'Underline' },
    { format: 'strikethrough', icon: StrikeThrough, label: 'Strikethrough' },
    { format: 'code', icon: Code, label: 'Inline Code' },
    { format: 'link', icon: LinkIcon, label: 'Link' },
  ];

  const handleLinkSubmit = () => {
    if (linkUrl) {
      onFormat('link', linkUrl);
      setLinkUrl('');
      setShowLinkModal(false);
    }
  };

  const handleFormatClick = (format: string) => {
    if (format === 'link') {
      setShowLinkModal(true);
    } else {
      onFormat(format);
    }
  };

  return (
    <>
      <ToolbarContainer>
        <ToolbarGroup>
          {formatButtons.map(({ format, icon: Icon, label }) => {
            if (!allowedFormats.includes(format)) return null;

            return (
              <IconButton
                key={format}
                onClick={() => handleFormatClick(format)}
                label={label}
                disabled={disabled}
                variant={activeFormats.has(format) ? 'primary' : 'tertiary'}
                size="S"
              >
                <Icon />
              </IconButton>
            );
          })}
        </ToolbarGroup>
      </ToolbarContainer>

      {showLinkModal && (
        <LinkModal>
          <LinkInput
            type="url"
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkUrl(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleLinkSubmit();
              } else if (e.key === 'Escape') {
                setShowLinkModal(false);
                setLinkUrl('');
              }
            }}
            autoFocus
          />
          <IconButton
            onClick={handleLinkSubmit}
            label="Insert Link"
            disabled={!linkUrl}
            variant="primary"
            size="S"
          >
            <Check />
          </IconButton>
          <IconButton
            onClick={() => {
              setShowLinkModal(false);
              setLinkUrl('');
            }}
            label="Cancel"
            variant="tertiary"
            size="S"
          >
            <Cross />
          </IconButton>
        </LinkModal>
      )}
    </>
  );
};
