"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { FC, useEffect } from "react";

interface Props {
  content: string;
  className?: string;
  maxLength?: number;
  isPreview?: boolean;
}

const FormattedMessageDisplay: FC<Props> = ({
  content,
  className = "",
  maxLength,
  isPreview = false,
}): JSX.Element => {
  // Trim HTML
  let displayContent = content;
  if (maxLength) {
    const plainText = content.replace(/<[^>]+>/g, ""); // Strip HTML tags
    if (plainText.length > maxLength) {
      displayContent = plainText.substring(0, maxLength) + "..."; // Truncate and add ellipsis
    }
  }

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
          class: "bg-yellow-200",
        },
      }),
    ],
    content: "",
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-headings:my-3 prose-li:my-1 prose-ul:my-2 prose-ol:my-2 ${className}`,
      },
    },
  });

  useEffect(() => {
    if (editor && displayContent) {
      editor.commands.setContent(displayContent);
    }
  }, [displayContent, editor]);

  return <EditorContent editor={editor} />;
};

export default FormattedMessageDisplay;
