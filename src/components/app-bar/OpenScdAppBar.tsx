import "./OpenScdAppBar.scss";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import HistoryIcon from "@mui/icons-material/History";

type Props = {
  handleDrawerToggle: () => void;
  title: string;
  onOpenLogs: () => void;
  onUndo: () => void;
  onRedo: () => void;
};

const OpenScdAppBar = ({
  handleDrawerToggle,
  title,
  onOpenLogs,
  onUndo,
  onRedo,
}: Props) => {
  return (
    <AppBar className="open-scd-app-bar" component="nav" position="sticky">
      <Toolbar>
        <div className="open-scd-app-bar__nav-section">
          <IconButton aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </div>
        <div className="open-scd-app-bar__action-section">
          <IconButton aria-label="menu" onClick={() => onUndo()}>
            <UndoIcon />
          </IconButton>
          <IconButton aria-label="menu" onClick={() => onRedo()}>
            <RedoIcon />
          </IconButton>
          <IconButton aria-label="menu" onClick={() => onOpenLogs()}>
            <HistoryIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default OpenScdAppBar;
