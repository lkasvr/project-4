import { TextComponent } from '.';

export default {
  title: 'TextComponent',
  component: TextComponent,
  args: {
    children: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores beatae
    aspernatur nam tempora, officia, perspiciatis consequuntur minus porro,
    deserunt vel ducimus aliquid. Et sapiente expedita earum vel quis dolorem
    omnis?
    `,
  },
  argTypes: {
    children: { type: 'string' },
  },
};

export const Template = (args) => {
  return (
    <div>
      <TextComponent {...args} />
    </div>
  );
};
