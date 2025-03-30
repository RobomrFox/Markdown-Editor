import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { Strike } from '@tiptap/extension-strike'
import { Underline } from '@tiptap/extension-underline'
import { Heading } from '@tiptap/extension-heading'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { CodeBlock } from '@tiptap/extension-code-block'
import { ListItem } from '@tiptap/extension-list-item'
import History from '@tiptap/extension-history'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { NodeSelection } from '@tiptap/pm/state'
import '../tiptap-style.css'
import { useEditor, EditorContent } from '@tiptap/react'
import React, { useState } from 'react'
import { editorState } from '../store/atoms/editor'
import { useAtomValue, useSetAtom } from 'jotai'
import { Markdown } from 'tiptap-markdown'
import { FaBold, FaItalic, FaStrikethrough, FaUnderline, FaSmile, FaHighlighter, FaMinus, FaImage } from 'react-icons/fa'
import EmojiPicker from 'emoji-picker-react'
import { mergeAttributes } from '@tiptap/core'

const FlexibleImage = Image.extend({
  name: 'flexibleImage',
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: null },
      height: { default: null },
      style: { default: 'display: inline-block;' }
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
  const editor = useAtomValue(editorState)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [imageURL, setImageURL] = useState('')

  if (!editor) {
    return null
  }

  const addEmoji = (emoji) => {
    editor.chain().focus().insertContent(emoji.emoji).run()
    setShowEmojiPicker(false)
  }

  const openImageModal = () => setIsImageModalOpen(true)
  const closeImageModal = () => {
    setIsImageModalOpen(false)
    setImageURL('')
  }

  const handleImageSubmit = () => {
    if (imageURL) {
      editor.chain().focus().setImage({ src: imageURL }).run()
      closeImageModal()
    }
  }

  return (
    <div className="h-full flex flex-col w-[calc(100%-4rem)] mx-auto">
<div className="group relative bg-gradient-to-br from-blue-500/30 to-purple-500/20 backdrop-blur-lg border border-purple-300/20 p-2 my-4 rounded-2xl shadow-2xl shadow-purple-500/10 flex gap-5 items-center mb-4 max-w-[90%] mx-auto 
">  
   {/* <div className="bg-gray-200 p-3 rounded shadow-md flex gap-4 items-center mb-4  bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg border border-purple-300/20 p-2 my-3 rounded-2xl shadow-2xl shadow-purple-500/10">  */}   <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-slate-200 ${editor.isActive('bold') ? 'bg-slate-200' : ''}`}
        >
          <FaBold size={23} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-slate-200 ${editor.isActive('italic') ? 'bg-slate-200' : ''}`}
        >
          <FaItalic size={23} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-slate-200 ${editor.isActive('strike') ? 'bg-slate-200' : ''}`}
        >
          <FaStrikethrough size={23} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-slate-200 ${editor.isActive('underline') ? 'bg-slate-200' : ''}`}
        >
          <FaUnderline size={23} />
        </button>

   
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-2 rounded hover:bg-slate-200 ${editor.isActive('highlight') ? 'bg-slate-200' : ''}`}
        >
          <FaHighlighter size={23} />
        </button>

        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded hover:bg-slate-200"
        >
          <FaMinus size={23} />
        </button>
     {/* Image Button with Dropdown */}
     <div className="relative">
          <button
            onClick={openImageModal}
            className={`p-2 rounded hover:bg-slate-200 ${isImageModalOpen ? 'bg-slate-200' : ''}`}
          >
            <FaImage size={23} />
          </button>

          {isImageModalOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200">
              <div className="p-3 space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Insert Image URL</h3>
                <input
                  type="text"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                  onKeyDown={(e) => e.key === 'Enter' && handleImageSubmit()}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={closeImageModal}
                    className="px-2 py-1 text-sm text-gray-600 hover:bg-slate-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImageSubmit}
                    className="px-2 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded"
                  >
                    Insert
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="p-2 rounded hover:bg-slate-200"
          >
            <FaSmile size={23} />
          </button>
          {showEmojiPicker && (
            <div className="absolute z-10">
              <EmojiPicker onEmojiClick={addEmoji} />
            </div>
          )}
        </div>
      </div>

      <div className="h-full">
        <EditorContent editor={editor} className="flex-grow outline-none" />
      </div>
    </div>
  )
}

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
    Underline,
    CodeBlock,
    ListItem,
    OrderedList,
    BulletList,
    History,
    FlexibleImage,
    TextStyle,
    Highlight,
    HorizontalRule,
    Markdown.configure({
      html: true,
      transformPastedText: true,
    }),
  ]

  const content = '<p>Hello World!</p>'
  const setEditor = useSetAtom(editorState)

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      }
    },
    onCreate: ({ editor }) => {
      setEditor(editor)
    },
    onDestroy: ({ editor }) => {
      setEditor(null)
    },
  })

  if (!editor) {
    return null
  }

  return <MenuBar />
}

export default Tiptap