import "./OpenScdDrawer.scss";
import { Icon, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { Plugin } from "../../hooks/usePlugins";
import { ReactNode, useRef } from "react";
import { PluginProps } from "../PluginComponent";
import RunablePluginComponent from "../RunablePluginComponent";

type Props = {
  open: boolean;
  handleDrawerToggle: () => void;
  menuPlugins: Plugin[];
  actions: {
    label: string;
    icon: ReactNode;
    onClick: () => void;
  }[];
  pluginTag: (src: string) => string;
} & PluginProps;

const OpenScdDrawer = ({
  open,
  handleDrawerToggle,
  menuPlugins,
  actions,
  pluginTag,
  ...rest
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePluginRun = async (menuItem: Plugin) => {
    const pluginTagName = pluginTag(menuItem.src);
    const pluginElement = ref.current?.querySelector(pluginTagName);
    if (pluginElement && "run" in pluginElement) {
      const fn = (pluginElement.run as () => Promise<void> | void).bind(
        pluginElement
      );
      await fn();
      handleDrawerToggle();
    }
  };

  return (
    <div ref={ref}>
      <Drawer anchor="left" open={open} onClose={handleDrawerToggle}>
        <List>
          {menuPlugins.map((menuItem, index) => {
            return (
              <ListItem key={index} onClick={() => handlePluginRun(menuItem)}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon>{menuItem.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={menuItem.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
          {actions.map(({ label, icon, onClick }, index) => {
            return (
              <ListItem key={index} onClick={() => onClick()}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon>{icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      {menuPlugins.map((menuPlugin, index) => {
        return (
          <RunablePluginComponent
            className="open-scd-menu-plugin"
            tagName={pluginTag(menuPlugin.src)}
            key={index}
            {...rest}
          />
        );
      })}
    </div>
  );
};

export default OpenScdDrawer;
