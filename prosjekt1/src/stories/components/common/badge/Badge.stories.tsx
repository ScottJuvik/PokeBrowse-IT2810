import { Meta, StoryFn } from '@storybook/react';
import { Badge, BadgeProps } from '@components/ui/badge/Badge'; // Adjust the path as necessary

export default {
    title: 'Components/Badge',
    component: Badge,
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: [
                    'normal',
                    'fire',
                    'water',
                    'electric',
                    'grass',
                    'ice',
                    'fighting',
                    'poison',
                    'ground',
                    'flying',
                    'psychic',
                    'bug',
                    'rock',
                    'ghost',
                    'dragon',
                    'dark',
                    'steel',
                    'fairy',
                ],
            },
        },
    },
} as Meta<BadgeProps>;

const Template: StoryFn<BadgeProps> = args => <Badge {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    type: 'normal',
};

export const Fire = Template.bind({});
Fire.args = {
    type: 'fire',
};

export const Water = Template.bind({});
Water.args = {
    type: 'water',
};

export const Electric = Template.bind({});
Electric.args = {
    type: 'electric',
};

export const Grass = Template.bind({});
Grass.args = {
    type: 'grass',
};

export const Ice = Template.bind({});
Ice.args = {
    type: 'ice',
};

export const Fighting = Template.bind({});
Fighting.args = {
    type: 'fighting',
};

export const Poison = Template.bind({});
Poison.args = {
    type: 'poison',
};

export const Ground = Template.bind({});
Ground.args = {
    type: 'ground',
};

export const Flying = Template.bind({});
Flying.args = {
    type: 'flying',
};

export const Psychic = Template.bind({});
Psychic.args = {
    type: 'psychic',
};

export const Bug = Template.bind({});
Bug.args = {
    type: 'bug',
};

export const Rock = Template.bind({});
Rock.args = {
    type: 'rock',
};

export const Ghost = Template.bind({});
Ghost.args = {
    type: 'ghost',
};

export const Dragon = Template.bind({});
Dragon.args = {
    type: 'dragon',
};

export const Dark = Template.bind({});
Dark.args = {
    type: 'dark',
};

export const Steel = Template.bind({});
Steel.args = {
    type: 'steel',
};

export const Fairy = Template.bind({});
Fairy.args = {
    type: 'fairy',
};
