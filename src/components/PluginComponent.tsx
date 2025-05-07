import { ElementType, FC, useRef, useEffect } from "react";

export type PluginProps = {
  doc?: XMLDocument;
  docName?: string;
  docs: Record<string, XMLDocument>;
  locale: string;
  editCount: number;
};

export type PluginComponentProps = Partial<HTMLElement> &
  PluginProps & {
    tagName: ElementType | string;
  };

const PluginComponent: FC<PluginComponentProps> = ({
  tagName: Tag,
  className,
  doc,
  docName,
  docs,
  ...otherProps
}) => {
  const pluginRef = useRef<PluginComponentProps | null>(null);

  useEffect(() => {
    if (pluginRef.current) {
      pluginRef.current.docName = docName;
    }
  }, [docName]);

  return (
    <Tag
      className={className}
      ref={pluginRef}
      doc={doc}
      docs={docs}
      {...otherProps}
    />
  );
};

export default PluginComponent;
