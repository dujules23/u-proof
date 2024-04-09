"use client";

import { FC, useState } from "react";
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Focus from "@tiptap/extension-focus";

export interface FinalMessage {
  content: string;
}

interface Props {
  initialValue?: FinalMessage;
  value: string;
  onChange(event: any): void;
}

const Editor: FC<Props> = ({ initialValue, onChange, value }) => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Focus.configure({
        className: "focus",
      }),
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Placeholder.configure({
        placeholder: "What do you want to say?",
      }),
      Youtube.configure({
        // width: 840,
        // height: 472.5,
        HTMLAttributes: {
          class: "w-full aspect-video",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;

        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );

        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto text-black bg-white dark:bg-primary-light py-2 px-3 rounded min-h-[15rem] max-h-[15rem] overflow-y-auto border",
      },
    },
  });

  return (
    <EditorContent value={value} editor={editor} className="min-h-[300px]" />
  );
};

export default Editor;
