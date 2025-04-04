import { Document } from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";

import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Strike } from "@tiptap/extension-strike";

import { Heading } from "@tiptap/extension-heading";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { CodeBlock } from "@tiptap/extension-code-block";
import { ListItem } from "@tiptap/extension-list-item";
import History from "@tiptap/extension-history";
import TextStyle from "@tiptap/extension-text-style";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { NodeSelection } from "@tiptap/pm/state";

import "../tiptap-style.css";
import { useEditor, EditorContent } from "@tiptap/react";
import React, { useCallback } from "react";
import { editorState } from "../store/atoms/editor";
import { useAtomValue, useSetAtom } from "jotai";

import { Markdown } from "tiptap-markdown";

import { Node, mergeAttributes } from "@tiptap/core";
import { useState } from "react";

const FlexibleImage = Node.create({
  name: "flexibleImage",

  group: "inline",

  inline: true,

  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: "50" }, // Set default width
      height: { default: "50" }, // Set default height
      style: {
        default: "display: inline-block; width: 50px; height: 50px;", // Enforce size in style
      },
    };
  },

  parseHTML() {
    return [{ tag: "img[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)];
  },

  defining: false,
  allowGapCursor: true,
});

const MenuBar = () => {
  const editor = useAtomValue(editorState);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  if (!editor) {
    return null;
  }

  const addEmoji = (emoji) => {
    editor.chain().focus().insertContent(emoji.emoji).run();
    setShowEmojiPicker(false);
  };

  return (
    <div className="h-full flex flex-col w-[calc(100%-4rem)] mx-auto">
      <div className="group relative bg-white/90 backdrop-blur-md border border-slate-200 p-2 my-4 rounded-lg shadow-sm flex gap-4 items-center max-w-[90%] mx-auto transition-all duration-300 hover:shadow-md">
        {/* Original buttons with updated styling */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive("bold")
              ? "bg-slate-100 text-blue-600"
              : "hover:bg-slate-50"
            }`}
        >
          <img
            src="src/assets/1_MenuBar/1_bold.svg"
            alt="Bold"
            className="h-6"
          />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive("italic")
              ? "bg-slate-100 text-blue-600"
              : "hover:bg-slate-50"
            }`}
        >
          <img
            src="src/assets/1_MenuBar/2_italic.svg"
            alt="Italics"
            className="h-6"
          />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive("strike")
              ? "bg-slate-100 text-blue-600"
              : "hover:bg-slate-50"
            }`}
        >
          <img
            src="src/assets/1_MenuBar/3_Strike.svg"
            alt="Strike"
            className="h-6"
          />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded-md transition-colors ${editor.isActive("heading", { level: 1 })
              ? "bg-slate-100 text-blue-600"
              : "hover:bg-slate-50"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501m4.501-8.627 2.25-1.5v10.126m0 0h-2.25m2.25 0h2.25"
            />
          </svg>
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded-md transition-colors ${editor.isActive("heading", { level: 2 })
              ? "bg-slate-100 text-blue-600"
              : "hover:bg-slate-50"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 19.5H16.5v-1.609a2.25 2.25 0 0 1 1.244-2.012l2.89-1.445c.651-.326 1.116-.955 1.116-1.683 0-.498-.04-.987-.118-1.463-.135-.825-.835-1.422-1.668-1.489a15.202 15.202 0 0 0-3.464.12M2.243 4.492v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501"
            />
          </svg>
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`p-2 rounded-md transition-colors ${editor.isActive("heading", { level: 3 })
              ? "bg-slate-100 text-blue-600"
              : "hover:bg-slate-50"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.905 14.626a4.52 4.52 0 0 1 .738 3.603c-.154.695-.794 1.143-1.504 1.208a15.194 15.194 0 0 1-3.639-.104m4.405-4.707a4.52 4.52 0 0 0 .738-3.603c-.154-.696-.794-1.144-1.504-1.209a15.19 15.19 0 0 0-3.639.104m4.405 4.708H18M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501"
            />
          </svg>
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive("bulletList")
              ? "bg-slate-100 text-blue-600"
              : "hover:bg-slate-50"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-list-icon lucide-list"
          >
            <path d="M3 12h.01" />
            <path d="M3 18h.01" />
            <path d="M3 6h.01" />
            <path d="M8 12h13" />
            <path d="M8 18h13" />
            <path d="M8 6h13" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive("orderedList")
              ? "bg-slate-100 text-blue-600"
              : "hover:bg-slate-50"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-list-ordered-icon lucide-list-ordered"
          >
            <path d="M10 12h11" />
            <path d="M10 18h11" />
            <path d="M10 6h11" />
            <path d="M4 10h2" />
            <path d="M4 6h1v4" />
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
          </svg>
        </button>

        

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive("codeBlock")
              ? "bg-slate-100 text-blue-600"
              : "hover:bg-slate-50"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded-md transition-colors hover:bg-slate-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>

      </div>

      <div className="h-full relative">
  <EditorContent editor={editor} className="flex-grow outline-none" />
</div>
    </div>
  );
};

const Tiptap = () => {
  const extensions = [
    Document,
    Paragraph,
    Text,
    Heading.configure({
      levels: [1, 2, 3],
    }),
    Bold,
    Italic,
    Strike,
    CodeBlock,
    ListItem,
    OrderedList,
    BulletList,
    History,
    FlexibleImage,
    TextStyle,
    HorizontalRule,
    Markdown.configure({
      html: true, // Allow GitHub-compatible HTML
      transformPastedText: true,
    }),
  ];

  const content = "<p>Hello World!</p>";

  const setEditor = useSetAtom(editorState);

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
      handleClick(view, pos, event) {
        console.log("Click detected at position:", pos);
        const { state } = view;
        const $pos = state.doc.resolve(pos);

        const nodeAfter = $pos.nodeAfter;
        console.log("Node at position:", nodeAfter?.type?.name);

        if (nodeAfter && nodeAfter.type.name === "flexibleImage") {
          console.log("Found image node, creating selection");
          try {
            const selection = NodeSelection.create(state.doc, pos);
            view.dispatch(state.tr.setSelection(selection));
            console.log("Selection applied successfully");
            return true;
          } catch (error) {
            console.error("Error creating selection:", error);
            return false;
          }
        }
        return false;
      },
    },
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: ({ editor }) => {
      setEditor(null);
    },
  });

  if (!editor) {
    return null; // Wait for the editor to initialize
  }

  return (
    <>
      <MenuBar />
    </>
  );
};

export default Tiptap;
