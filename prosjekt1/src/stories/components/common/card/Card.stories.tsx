import Card from '@components/common/card/Card';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Components/Card',
    component: Card,
    argTypes: {
        index: {
            control: 'number',
            description: 'Index number of the Pokémon',
        },
        name: {
            control: 'text',
            description: 'Name of the Pokémon',
        },
        imageUrl: {
            control: 'text',
            description: 'Image URL of the Pokémon sprite',
        },
    },
} as Meta;

const Template: StoryFn = args => <Card index={0} name={''} imageUrl={''} {...args} />;

// Default Pokémon Card Story
export const Default = Template.bind({});
Default.args = {
    index: 1,
    name: 'Bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
};

// Another Pokémon Card (Charmander)
export const Charmander = Template.bind({});
Charmander.args = {
    index: 4,
    name: 'Charmander',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
};

// Large Pokémon Card (Mewtwo)
export const Mewtwo = Template.bind({});
Mewtwo.args = {
    index: 150,
    name: 'Mewtwo',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
};
