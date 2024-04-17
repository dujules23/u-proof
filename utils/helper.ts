import { Editor } from "@tiptap/react";

// Editor function
export const getFocusedEditor = (editor: Editor) => {
  return editor.chain().focus();
};

// function that trims text
export const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) return text;
  return text.substring(0, trimBy).trim() + "...";
};
