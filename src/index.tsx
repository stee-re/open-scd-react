import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const _customElementsDefine = window.customElements.define;
window.customElements.define = (name, cl, conf) => {
  if (!customElements.get(name)) {
    try {
      _customElementsDefine.call(window.customElements, name, cl, conf);
    } catch (e) {
      console.warn(e);
    }
  }
};

const plugins = {
  menu: [
    {
      name: "Add plugins...",
      translations: { de: "Erweitern..." },
      icon: "extension",
      active: true,
      src: "/demo/AddPlugins.js",
    },
    {
      name: "Open File",
      translations: { de: "Datei öffnen" },
      icon: "folder_open",
      active: true,
      src: "https://openenergytools.github.io/oscd-open/oscd-open.js",
    },
    {
      name: "Save File",
      translations: { de: "Datei öffnen" },
      icon: "save",
      active: true,
      src: "https://openenergytools.github.io/oscd-save/oscd-save.js",
    },
  ],
  editor: [
    {
      name: "Start",
      translations: {
        de: "Start",
      },
      icon: "start",
      active: true,
      src: "https://openenergytools.github.io/scl-editor-landing/scl-editor-landing.js",
    },

    {
      name: "Substation",
      icon: "margin",
      active: true,
      requireDoc: true,
      src: "https://openenergytools.github.io/scl-substation-editor/scl-substation-editor.js",
    },
    {
      name: "Design SLD",
      translations: {
        de: "Designer",
      },
      icon: "add_box",
      active: true,
      requireDoc: true,
      src: "https://openenergytools.github.io/oscd-designer/oscd-designer.js",
    },
  ],
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App plugins={plugins} />
  </StrictMode>
);
