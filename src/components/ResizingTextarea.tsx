import { TextareaHTMLAttributes, useRef, useState, useEffect } from "react";

// soruced from https://medium.com/@lucasalgus/creating-a-custom-auto-resize-textarea-component-for-your-react-web-application-6959c0ad68bc

export function ResizingTextarea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");

  useEffect(() => {
    setParentHeight(`${textAreaRef.current!.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight("auto");
    setParentHeight(`${textAreaRef.current!.scrollHeight}px`);
    setText(event.target.value);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div
      style={{
        minHeight: parentHeight,
      }}
    >
      <textarea
        {...props}
        ref={textAreaRef}
        style={{
          height: textAreaHeight,
        }}
        onChange={onChangeHandler}
      />
    </div>
  );
}
