import type { Preview } from "@storybook/vue3";
import "../src/app/assets/styles/theme/index.scss";

const preview: Preview = {
  parameters: {
      controls: {
          matchers: {
              color: /(background|color)$/i,
              date: /Date$/i,
          },
      },
      backgrounds: {
          default: 'light',
          values: [
              {
                  name: 'light',
                  value: '#F1F1F1',
              },
          ],
      },
  },
};

export default preview;
