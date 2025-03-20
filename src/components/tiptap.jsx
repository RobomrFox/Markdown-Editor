import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'

import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { Strike } from '@tiptap/extension-strike'

import { Heading } from '@tiptap/extension-heading'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { CodeBlock } from '@tiptap/extension-code-block'
import { ListItem } from '@tiptap/extension-list-item'
import History from '@tiptap/extension-history'
import TextStyle from '@tiptap/extension-text-style'
import { NodeSelection } from '@tiptap/pm/state'

import '../tiptap-style.css'
import { useEditor, EditorContent } from '@tiptap/react';
import React, { useCallback } from 'react';
import { editorState } from '../store/atoms/editor';
import { useAtomValue, useSetAtom } from 'jotai';

import { Markdown } from 'tiptap-markdown';

import { Node, mergeAttributes } from '@tiptap/core'


const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: null }, // Allow width
      height: { default: null }, // Allow height
      style: { default: 'display: inline-block' } // Add default styling
    }
  },

  selectable: true,
  draggable: true,
})


const FlexibleImage = Node.create({
  name: 'flexibleImage',
  
  group: 'inline',
  
  inline: true,
  
  atom: true,
  
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: null },
      height: { default: null },
      style: { default: 'display: inline-block;' } // Add this
    }
  },
  
  parseHTML() {
    return [{ tag: 'img[src]' }]
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)]
  },
  
  defining: false,
  allowGapCursor: true,
})



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
    ListItem,
    OrderedList,
    BulletList,
    History,
    FlexibleImage,
    TextStyle,
    Markdown.configure({
      html: true, // Allow GitHub-compatible HTML
      transformPastedText: true,
    }),
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
      handleClick(view, pos, event) {
        console.log("Click detected at position:", pos);
        const { state } = view;
        const $pos = state.doc.resolve(pos);
    
        const nodeAfter = $pos.nodeAfter;
        console.log("Node at position:", nodeAfter?.type?.name);
        
        if (nodeAfter && (nodeAfter.type.name === 'flexibleImage')) {
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
      }
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


  return (
    <>
      <MenuBar />
    </>
  );
};

export default Tiptap;
