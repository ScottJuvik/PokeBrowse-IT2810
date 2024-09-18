import Button, { ButtonProps, ButtonSize, ButtonType } from '@components/common/button/Button';
import { Meta, StoryFn } from '@storybook/react';
import styles from './Button.module.css';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        onClick: { action: 'clicked' },
        type: {
            control: {
                type: 'select',
                options: ButtonType,
            },
        },
        size: {
            control: {
                type: 'select',
                options: ButtonSize,
            },
        },
        disabled: {
            control: 'boolean',
        },
        customClassName: {
            control: 'text',
        },
        style: {
            control: 'object',
        },
    },
} as Meta;

const Template: StoryFn<ButtonProps> = args => <Button {...args} />;

// Default Button story (Filled & Medium)
export const Default = Template.bind({});
Default.args = {
    text: 'Default Button',
    type: ButtonType.Filled,
    size: ButtonSize.Medium,
    disabled: false,
};

// Filled Button
export const Filled = Template.bind({});
Filled.args = {
    text: 'Filled Button',
    type: ButtonType.Filled,
    size: ButtonSize.Large,
    disabled: false,
};

// Outline Button
export const Outline = Template.bind({});
Outline.args = {
    text: 'Outline Button',
    type: ButtonType.Outline,
    size: ButtonSize.Small,
    disabled: false,
};

// Disabled Button
export const Disabled = Template.bind({});
Disabled.args = {
    text: 'Disabled Button',
    type: ButtonType.Filled,
    size: ButtonSize.Medium,
    disabled: true,
};

// Custom Class and Style Button
export const CustomStyle = Template.bind({});
CustomStyle.args = {
    text: 'Custom Button',
    type: ButtonType.Outline,
    size: ButtonSize.Medium,
    customClassName: styles['custom-class'],
    style: { backgroundColor: 'purple' },
};
