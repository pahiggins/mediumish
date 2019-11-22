import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from './Button';

export default { component: Button, title: 'Button' };

export const primary = () => (
  <Button
    type="button"
    backgroundColorHover={'rgba(3, 168, 124, 1)'}
    borderColor={'rgba(3, 168, 124, 1)'}
    color={'rgba(3, 168, 124, 1)'}
    colorHover={'#fff'}
    backgroundColorSelect={'rgba(3, 168, 124, 0.8)'}
    borderColorSelect={'rgba(3, 168, 124, 0.8)'}
    disabled={false}
    backgroundColorDisabled={'transparent'}
    colorHoverDisabled={'rgba(3, 168, 124, 1)'}
    margin={'0.75rem'}
    onClick={action('clicked')}
  >
    Primary
  </Button>
);

export const secondary = () => (
  <Button
    type="button"
    borderColor={'rgba(0, 0, 0, 0.24)'}
    borderColorHover={'rgba(0, 0, 0, 0.54)'}
    color={'rgba(0, 0, 0, 0.54)'}
    margin={'0.75rem'}
    onClick={action('clicked')}
  >
    Secondary
  </Button>
);

export const warning = () => (
  <Button
    type="submit"
    backgroundColorHover={'rgba(255, 86, 48, 1)'}
    borderColor={'rgba(255, 86, 48, 1)'}
    color={'rgba(255, 86, 48, 1)'}
    colorHover={'#fff'}
    backgroundColorSelect={'rgba(255, 86, 48, 0.8)'}
    borderColorSelect={'rgba(255, 86, 48, 0.8)'}
    margin={'0.75rem'}
    onClick={action('clicked')}
  >
    Warning
  </Button>
);
