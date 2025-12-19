import styled from 'styled-components';

export const EditorContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary600};
    box-shadow: ${({ theme }) => theme.colors.primary600} 0px 0px 0px 2px;
  }
`;

export const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spaces[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  background: ${({ theme }) => theme.colors.neutral100};
  gap: ${({ theme }) => theme.spaces[1]};
`;

export const ToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces[1]};
`;

export const StyledInput = styled.div`
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[3]}`};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: ${({ theme }) => theme.lineHeights[6]};
  color: ${({ theme }) => theme.colors.neutral800};
  outline: none;
  font-family: inherit;

  &:empty:before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.colors.neutral500};
  }

  &:focus {
    outline: none;
  }

  &[contenteditable='false'] {
    background: ${({ theme }) => theme.colors.neutral150};
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral600};
  }

  code {
    background: ${({ theme }) => theme.colors.neutral150};
    padding: ${({ theme }) => `${theme.spaces[1]} ${theme.spaces[2]}`};
    border-radius: ${({ theme }) => theme.borderRadius};
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Courier New', monospace;
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }

  a {
    color: ${({ theme }) => theme.colors.primary600};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.colors.primary700};
    }
  }

  strong,
  b {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  em,
  i {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  del,
  s,
  strike {
    text-decoration: line-through;
  }
`;

export const LinkModal = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: ${({ theme }) => theme.zIndices.popover};
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spaces[3]};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  display: flex;
  gap: ${({ theme }) => theme.spaces[2]};
  align-items: center;
  margin-top: ${({ theme }) => theme.spaces[1]};
`;

export const LinkInput = styled.input`
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  min-width: 250px;
  height: ${({ theme }) => theme.spaces[8]};
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary600};
    outline: none;
    box-shadow: ${({ theme }) => theme.colors.primary600} 0px 0px 0px 2px;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral500};
  }
`;
