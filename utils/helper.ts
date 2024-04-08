import { Editor } from "@tiptap/react";

// Editor function
export const getFocusedEditor = (editor: Editor) => {
  return editor.chain().focus();
};
