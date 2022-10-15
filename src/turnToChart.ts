import { generateHtmlString } from "turn-to-chart";

export default function (context) {
  return {
    plugin: function (markdownIt, _options) {
      const defaultRender =
        markdownIt.renderer.rules.fence ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options, env, self);
        };

      markdownIt.renderer.rules.fence = function (
        tokens,
        idx,
        options,
        env,
        self
      ) {
        const token = tokens[idx];
        if (token.info !== "turnToChart") {
          return defaultRender(tokens, idx, options, env, self);
        }

        return generateHtmlString(token.content);
      };
    },
    assets: function () {
      return [];
    },
  };
}
