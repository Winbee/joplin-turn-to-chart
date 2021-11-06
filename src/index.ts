import joplin from "api";
import { ContentScriptType } from "api/types";

joplin.plugins.register({
  onStart: async function () {
    const contentScriptId = "net.gagnepain.turnToChart";
    await joplin.contentScripts.register(
      ContentScriptType.MarkdownItPlugin,
      contentScriptId,
      "./turnToChart.js"
    );
  },
});
