import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import HistoryIcon from "@mui/icons-material/History";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { LogEntry } from "../App";
import {
  isComplex,
  isInsert,
  isRemove,
  isUpdate,
} from "../foundation/edit-event";
import { DialogActions, DialogContent, ListItemIcon } from "@mui/material";

type Props = {
  open: boolean;
  logEntries: LogEntry[];
  lastEdit: number;
  onClose: () => void;
  onUndo: () => void;
  onRedo: () => void;
};

function describe({ undo, redo }: LogEntry) {
  let result = "Something unexpected happened!";
  if (isComplex(redo)) result = `≥ ${redo.length} nodes changed`;
  if (isInsert(redo)) {
    if (isInsert(undo)) {
      result = `${redo.node.nodeName} moved to ${redo.parent.nodeName}`;
    } else {
      result = `${redo.node.nodeName} inserted into ${redo.parent.nodeName}`;
    }
  }
  if (isRemove(redo)) {
    result = `${redo.node.nodeName} removed`;
  }
  if (isUpdate(redo)) {
    result = `${redo.element.tagName} updated`;
  }
  return result;
}

export default function OscdEditLogDialog({
  open,
  logEntries,
  lastEdit,
  onUndo,
  onRedo,
  onClose,
}: Props) {
  return (
    <Dialog
      onClose={() => {
        onClose();
      }}
      open={open}
    >
      <DialogTitle>Editing history</DialogTitle>
      <DialogContent>
        <List sx={{ pt: 0 }}>
          {logEntries.map((log, index) => (
            <ListItem disablePadding key={index}>
              <ListItemIcon color="inherit">
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={describe(log)} />
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button startIcon={<UndoIcon />} onClick={() => onUndo()}>
          Undo
        </Button>
        <Button startIcon={<RedoIcon />} onClick={() => onRedo()}>
          Redo
        </Button>
        <Button onClick={() => onClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
