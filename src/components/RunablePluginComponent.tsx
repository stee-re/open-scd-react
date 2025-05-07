import { useRef, useEffect } from "react";
import PluginComponent, { PluginComponentProps } from "./PluginComponent";

export default function RunablePluginComponent({
  tagName,
  setRunHandler,
  ...rest
}: PluginComponentProps & {
  setRunHandler?: (fn: () => Promise<void> | void) => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuRef.current) {
      // Call the function defined in the web component
      const pluginElement = menuRef.current;
      if (pluginElement && "run" in pluginElement) {
        const fn = (pluginElement.run as () => Promise<void> | void).bind(
          pluginElement
        );
        if (setRunHandler) {
          setRunHandler(fn);
        }
      }
    }
  }, [setRunHandler]);

  const webComponentProps = {
    ref: menuRef,
    ...rest,
  };

  return <PluginComponent tagName={tagName} {...webComponentProps} />;
}
