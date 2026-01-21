import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, useEffect } from "react";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

interface Props {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor: FC<Props> = ({ content, onChange }): JSX.Element => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: { class: "list-disc ml-5 mb-2" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal ml-5 mb-2" },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
    ],
    content: content,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "border-none text-primary-dark dark:bg-primary-light bg-white min-h-[7rem] md:min-h-[15rem] prose prose-sm sm:prose lg:prose-lg xl:prose-xl m-0 p-4 max-w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
      },
    },
    onUpdate: ({ editor }) => {
      // console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content === "" && editor.getHTML() !== "") {
      editor.commands.clearContent();
    }
  }, [content, editor]);

  return (
    <div className="border border-gray-300 rounded-md">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
