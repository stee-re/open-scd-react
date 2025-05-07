import { Box, Tabs, Tab } from "@mui/material";
import PluginComponent, { PluginProps } from "./PluginComponent";
import { useMemo, useState } from "react";
import { Plugin } from "../hooks/usePlugins";

type Props = {
  editorPlugins: Plugin[];
  pluginTag: (src: string) => string;
} & PluginProps;

export default function OpenScdEditorSection({
  doc,
  docName,
  editorPlugins,
  pluginTag,
  ...rest
}: Props) {
  const [editorIndex, setEditorIndex] = useState(0);

  const editorItems = useMemo(
    () => editorPlugins.filter((item) => !item.requireDoc || (doc && docName)),
    [editorPlugins, doc, docName]
  );

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setEditorIndex(newValue);
  };
  return (
    <div className="main">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={editorIndex} onChange={handleChange}>
            {editorItems.map((editorItem, index) => {
              return <Tab key={index} label={editorItem.name} />;
            })}
          </Tabs>
        </Box>
      </Box>
      <div className="editor">
        {editorItems[editorIndex] && (
          <PluginComponent
            tagName={pluginTag(editorItems[editorIndex].src)}
            className="open-scd-editor-plugin"
            doc={doc}
            docName={docName}
            {...rest}
          />
        )}
      </div>
    </div>
  );
}
