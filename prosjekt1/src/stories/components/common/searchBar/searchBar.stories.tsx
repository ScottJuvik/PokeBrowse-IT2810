import { Meta, StoryFn } from '@storybook/react';
import SearchBar, { SearchBarProps, SearchBarSize } from '@/components/common/searchbar/SearchBar';

export default {
    title: 'Components/SearchBar',
    component: SearchBar,
    argTypes: {
        size: {
            control: { type: 'select', options: [SearchBarSize.Small, SearchBarSize.Large] },
        },
        placeholder: { control: 'text' },
    },
} as Meta;

const Template: StoryFn<SearchBarProps> = args => <SearchBar {...args} />;

// Large SearchBar Story
export const Large = Template.bind({});
Large.args = {
    placeholder: 'Search for a Pokémon',
    size: SearchBarSize.Large,
    onSearch: (query: string) => console.log(`Searched for: ${query}`),
};

// Small SearchBar Story
export const Small = Template.bind({});
Small.args = {
    placeholder: 'Search for a Pokémon',
    size: SearchBarSize.Small,
    onSearch: (query: string) => console.log(`Searched for: ${query}`),
};
