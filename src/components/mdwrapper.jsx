// MdWrapper.js
import { useCallback } from 'react';
import { useAtomValue } from 'jotai';
import Tiptap from "./tiptap";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { editorState } from "../store/atoms/editor";

const DndProvider = ({ children }) => {
    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToParentElement]}
        >
            {children}
        </DndContext>
    );
};

const MdWrapper = () => {
    const editor = useAtomValue(editorState);

    const handleCopy = useCallback(async () => {
        try {
            if (!editor) {
                alert('Editor not initialized');
                return;
            }
            
            // Get Markdown content from the editor
            const markdownContent = editor.storage.markdown.getMarkdown();
            
            // Copy to clipboard
            await navigator.clipboard.writeText(markdownContent);
            alert('Content copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy:', error);
            alert('Failed to copy content');
        }
    }, [editor]);

    return (
        <DndProvider>
            <div className="flex justify-around mt-4 mr-4 w-120 ml-auto">
                <button
                    className="flex gap-2 items-center border-2 p-1 cursor-pointer bg-green-400/70 hover:bg-green-400/80 transition-all ease-in-out duration-200 active:scale-95"
                >
                    <span>Save</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                         strokeLinejoin="round"
                         className="lucide lucide-server-icon lucide-server w-5">
                        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                        <line x1="6" x2="6.01" y1="6" y2="6" />
                        <line x1="6" x2="6.01" y1="18" y2="18" />
                    </svg>
                </button>

                <button
                    onClick={handleCopy}
                    className="flex gap-2 items-center border-2 p-1 cursor-pointer bg-green-400/70 hover:bg-green-400/80 transition-all ease-in-out duration-200 active:scale-95"
                >
                    <span>Copy</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                         className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>
                </button>

                <button
                    className="flex gap-2 items-center border-2 p-1 cursor-pointer bg-green-400/70 hover:bg-green-400/80 transition-all ease-in-out duration-200 active:scale-95"
                >
                    <span>Download</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                         className="w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </button>
            </div>

            <Tiptap />
        </DndProvider>
    )
}

export default MdWrapper;