import "./open-scd-drawer.scss";
import { Icon, ListItem, ListItemButton, ListItemIcon } from "@mui/material";

import ListItemText from "@mui/material/ListItemText";
import { Plugin } from "../../hooks/usePlugins";
import { PluginEventCallbacks, PluginProps } from "../PluginComponent";
import RunablePluginComponent from "../RunablePluginComponent";

type Props = { tagName: string } & Plugin & PluginProps & PluginEventCallbacks;

const OpenScdDrawer = ({ tagName, icon, name, ...rest }: Props) => {
  let runHandler: () => Promise<void> | void = () => undefined;

  return (
    <ListItem
      disablePadding
      onClick={() => {
        if (runHandler) {
          void runHandler();
        }
      }}
    >
      <RunablePluginComponent
        className="open-scd-menu-plugin"
        tagName={tagName}
        setRunHandler={(fn) => (runHandler = fn)}
        {...rest}
      />
      <ListItemButton>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};

export default OpenScdDrawer;
