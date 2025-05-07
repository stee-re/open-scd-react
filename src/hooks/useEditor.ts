import { useState, useMemo, useCallback } from "react";
import { LogEntry } from "../App";
import { EditEvent, handleEdit } from "../foundation/edit-event";
import { OpenEvent } from "../foundation/open-event";

export default function useEditor({
  editable = ["cid", "icd", "iid", "scd", "sed", "ssd"],
}) {
  const [doc, setDoc] = useState<XMLDocument | undefined>();
  const [docs, setDocs] = useState<Record<string, XMLDocument>>({});
  const [docName, setDocName] = useState<string | undefined>();
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [editCount, setEditCount] = useState(0);

  const canUndo = useMemo(() => {
    return editCount > 0;
  }, [editCount]);

  const canRedo = useMemo(() => {
    return editCount < history.length;
  }, [editCount, history]);

  const last = useMemo(() => {
    return editCount - 1;
  }, [editCount]);

  const isEditable = useCallback(
    (_docName: string): boolean => {
      return !!editable.find((ext) =>
        _docName.toLowerCase().endsWith(`.${ext}`)
      );
    },
    [editable]
  );

  const handleOpenDoc = useCallback(
    ({ detail }: OpenEvent) => {
      setDocs((prevVal) => ({
        ...prevVal,
        [detail.docName]: detail.doc,
      }));

      if (isEditable(detail.docName)) {
        setDoc(detail.doc);
        setDocName(detail.docName);
      }
    },
    [isEditable]
  );

  const handleEditEvent = useCallback(
    (event: EditEvent) => {
      const edit = event.detail;
      setHistory((prevHistory) => {
        prevHistory.splice(editCount);
        prevHistory.push({ undo: handleEdit(edit), redo: edit });
        return prevHistory;
      });
      setEditCount((prevCount) => prevCount + 1);
      console.log({ editCount, history });
    },
    [editCount]
  );

  /** Undo the last `n` [[Edit]]s committed */
  const undo = useCallback(
    (n = 1) => {
      if (!canUndo || n < 1) return;
      handleEdit(history[last!].undo);
      setEditCount((prevVal) => (prevVal -= 1));
      if (n > 1) {
        undo(n - 1);
      }
    },
    [canUndo, last, history]
  );

  /** Redo the last `n` [[Edit]]s that have been undone */
  const redo = useCallback(
    (n = 1) => {
      if (!canRedo || n < 1) {
        return;
      }
      handleEdit(history[editCount].redo);
      setEditCount((prevVal) => (prevVal += 1));
      if (n > 1) {
        redo(n - 1);
      }
    },
    [history, editCount, canRedo]
  );

  return {
    doc,
    docs,
    docName,
    handleOpenDoc,
    handleEditEvent,
    canUndo,
    canRedo,
    undo,
    redo,
    history,
    editCount,
    last,
  };
}
