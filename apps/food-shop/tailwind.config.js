const { createGlobPatternsForDependencies } = require("@nrwl/angular/tailwind");
const { join } = require("path");
const sharedTailwindConfig = require("../../libs/core/theme/src/lib/config");

module.exports = {
  presets: [sharedTailwindConfig],
  content: [
    join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}"),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  plugins: [
    require("@tailwindcss/aspect-ratio")
  ]
};
