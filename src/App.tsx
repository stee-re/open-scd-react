import { useState, useRef, useEffect } from "react";
import "./App.scss";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { DarkTheme } from "./theme";
import HistoryIcon from "@mui/icons-material/History";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

import { Edit } from "./foundation/edit-event";

import usePlugins, { PluginSet } from "./hooks/usePlugins";
import OpenScdDrawer from "./components/drawer/OpenScdDrawer";
import OpenScdEditorSection from "./components/OpenScdEditorSection";
import OpenScdAppBar from "./components/app-bar/OpenScdAppBar";
import OscdEditLogDialog from "./components/OscdEditLogDialog";
import useEditor from "./hooks/useEditor";

const DEFAULT_EDITABLE = ["cid", "icd", "iid", "scd", "sed", "ssd"];

type Props = {
  plugins: PluginSet;
  editable?: string[];
};

export type LogEntry = { undo: Edit; redo: Edit };

function App({ plugins, editable = DEFAULT_EDITABLE }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editLogDialogOpen, setEditLogDialogOpen] = useState(false);
  const [locale, setLocale] = useState<string>("en");

  const {
    doc,
    docName,
    docs,
    history,
    last,
    editCount,
    handleOpenDoc,
    handleEditEvent,
    undo,
    redo,
  } = useEditor({
    editable,
  });

  const { menuPlugins, editorPlugins, pluginTag } = usePlugins({ plugins });

  const appRef = useRef<HTMLDivElement>(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const { current } = appRef;
    if (current) {
      // document.addEventListener('keydown', event => handleKeyPress(event));
      current.addEventListener("oscd-open", handleOpenDoc);
      current.addEventListener("oscd-edit", handleEditEvent);
    }
    return () => {
      if (current) {
        current.removeEventListener("oscd-open", handleOpenDoc);
        current.removeEventListener("oscd-edit", handleEditEvent);
      }
    };
  }, [appRef, handleOpenDoc, handleEditEvent]);

  return (
    <div className="App" ref={appRef}>
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        <OpenScdAppBar
          handleDrawerToggle={handleDrawerToggle}
          title={docName || ""}
          onOpenLogs={() => setEditLogDialogOpen(true)}
          onUndo={() => undo()}
          onRedo={() => redo()}
        />
        <OscdEditLogDialog
          open={editLogDialogOpen}
          logEntries={history}
          lastEdit={last}
          onClose={() => setEditLogDialogOpen(false)}
          onUndo={undo}
          onRedo={redo}
        ></OscdEditLogDialog>
        <OpenScdDrawer
          menuPlugins={menuPlugins}
          pluginTag={pluginTag}
          doc={doc}
          docs={docs}
          docName={docName}
          locale={locale}
          editCount={editCount}
          open={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          actions={[
            {
              label: "Undo",
              icon: <UndoIcon />,
              onClick: () => undo(),
            },
            {
              label: "Redo",
              icon: <RedoIcon />,
              onClick: () => redo(),
            },
            {
              label: "History",
              icon: <HistoryIcon />,
              onClick: () => setEditLogDialogOpen(true),
            },
          ]}
        />
        <OpenScdEditorSection
          editorPlugins={editorPlugins}
          pluginTag={pluginTag}
          doc={doc}
          docs={docs}
          docName={docName}
          locale={locale}
          editCount={editCount}
        ></OpenScdEditorSection>
      </ThemeProvider>
    </div>
  );
}

export default App;
