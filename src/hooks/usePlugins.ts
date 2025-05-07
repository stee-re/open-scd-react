import { useEffect, useState } from "react";
import { cyrb64 } from "../foundation/cyrb64";

type Props = {
  plugins: Partial<PluginSet>;
};

export type Plugin = {
  name: string;
  // translations?: Record<typeof targetLocales[number], string>;
  src: string;
  icon: string;
  requireDoc?: boolean;
  active?: boolean;
};

export type PluginSet = { menu: Plugin[]; editor: Plugin[] };

export default function usePlugins({ plugins }: Props) {
  const [pluginTags] = useState(new Map<string, string>());
  const [menuPlugins, setMenuPlugins] = useState<Plugin[]>([]);
  const [editorPlugins, setEditorPlugins] = useState<Plugin[]>([]);

  /** @returns a valid customElement tagName containing the URI hash. */
  function pluginTag(uri: string): string {
    if (!pluginTags.has(uri)) pluginTags.set(uri, `oscd-p${cyrb64(uri)}`);
    return pluginTags.get(uri)!;
  }

  const loadPlugin = async (plugin: Plugin) => {
    const tagName = pluginTag(plugin.src);
    if (pluginTags.has(tagName)) {
      return plugin;
    }

    if (customElements.get(tagName)) {
      return plugin;
    }
    const url = new URL(plugin.src, window.location.href).toString();
    /*
     * Dynamic import limitations with Vite:
     * https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
     */

    const mod = await import(/* @vite-ignore */ url);
    // Because this is async, we need to check (again) if the element is already defined.
    if (!customElements.get(tagName)) {
      customElements.define(tagName, mod.default);
    }
    return plugin;
  };

  const loadPluginSet = async (pluginSet: Plugin[]) => {
    return Promise.all(pluginSet.map(loadPlugin));
  };

  const loadAllPlugins = async (plugins: Partial<PluginSet>) => {
    const loadedMenu = await loadPluginSet(plugins.menu || []);
    const loadedEditor = await loadPluginSet(plugins.editor || []);

    setMenuPlugins(loadedMenu);
    setEditorPlugins(loadedEditor);
  };

  useEffect(() => {
    void loadAllPlugins(plugins);
  }, [plugins]);

  return {
    menuPlugins,
    editorPlugins,
    pluginTag,
  };
}
