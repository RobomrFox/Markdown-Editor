import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'

import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { Strike } from '@tiptap/extension-strike'

import { Heading } from '@tiptap/extension-heading'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { CodeBlock } from '@tiptap/extension-code-block'

import { useEditor, EditorContent } from '@tiptap/react';
import React from 'react';
import { editorState } from '../store/atoms/editor';
import { useAtomValue, useSetAtom } from 'jotai';



const MenuBar = () => {
  const editor = useAtomValue(editorState);

  if (!editor) {
    return null;
  }

  return (
    <div className="h-full flex flex-col w-[calc(100%-4rem)] mx-auto">
      <div className='border my-[1rem] flex gap-[1rem] px-[1rem]'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <img src="src/assets/1_MenuBar/1_bold.svg" alt='Bold' className='h-8'/> 
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <img src="src/assets/1_MenuBar/2_italic.svg" alt='Italics' className='h-8'/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <img src="src/assets/1_MenuBar/3_Strike.svg" alt='Strike' className='h-8'/>
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          Paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          H3
        </button>
        
      </div>
      <div className="h-full">
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
      levels: [1, 2, 3]
    }),
    Bold, 
    Italic,
    Strike,
    CodeBlock,
    OrderedList,
    BulletList
  ];

  const content = '<p>Hello World!</p>';

  const setEditor = useSetAtom(editorState);

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    onCreate: ({editor})=> {
      setEditor(editor);
    },
    onDestroy: ({editor}) => {
      setEditor(null);
    }
  });

  if (!editor) {
    return null; // Wait for the editor to initialize
  }

  console.log("this is editor: " + editor);


  return (
    <>
      <MenuBar/>
    </>
  );
};

export default Tiptap;
