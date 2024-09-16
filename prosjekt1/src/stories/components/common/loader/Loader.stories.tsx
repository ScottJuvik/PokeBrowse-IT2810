import Loader from '@components/common/loader/Loader';
import { StoryFn } from '@storybook/react';

export default {
    title: 'Components/Loader',
    component: Loader,
};

const Template: StoryFn<typeof Loader> = () => <Loader />;

export const Default = Template.bind({});
