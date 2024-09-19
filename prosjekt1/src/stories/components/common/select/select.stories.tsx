import { Meta, StoryFn } from '@storybook/react';
import Select, { SelectOption, SelectProps } from '@/components/common/select/Select';
import { useState } from 'react';

export default {
    title: 'Components/Common/Select',
    component: Select,
} as Meta;

const sampleOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];

// Template for the Select component
const Template: StoryFn<SelectProps> = (args) => {
    const [selectedOption, setSelectedOption] = useState<SelectOption>(args.selected);

    return (
        <Select
            {...args}
            selected={selectedOption}
            setSelected={(option) => setSelectedOption(option)}
        />
    );
};

// Default story for the Select component
export const Default = Template.bind({});
Default.args = {
    options: sampleOptions,
    selected: sampleOptions[0], // Default selected option
};

// Story for the Select component with filter options
export const SelectedOption = Template.bind({});
SelectedOption.args = {
    options:[ 
                { value: 'asc', label: 'Number Ascending' },
                { value: 'desc', label: 'Number Descending' },
                { value: 'az', label: 'A-Z' },
                { value: 'za', label: 'Z-A' },
            ],
    selected: sampleOptions[1], // Default selected option
};