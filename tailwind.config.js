import {tailwindConfig} from '@alwatr/style';

export default {
  ...tailwindConfig,
  theme: {
    ...tailwindConfig.theme,
    extend: {
      ...tailwindConfig.theme.extend,
      fontFamily: {
        ...tailwindConfig.theme.extend.fontFamily,
        kalameh: [
          ['"kalameh"', ...tailwindConfig.theme.extend.fontFamily.system],
          {fontFeatureSettings: '"calt" 1, "tnum" 0'},
        ],
      },
    },
  },
  content: ['**/*.njk'],
};
