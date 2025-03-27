import { useAtomValue } from "jotai";
import { editorState } from "../store/atoms/editor";
import SearchBar from "./SearchBar";

import { svgLinks } from "../db/svgLinks";

import { CDNLinks } from "../db/Links";

const SideBar = () => {

    const editor = useAtomValue(editorState);

    if (!editor) {
        console.warn(`Editor is not initialized yet.`)
        return (
            <div>
                Loading ...
            </div>
        )
    }

    // editor.commands.insertContent({
    //     type: 'text',
    //     text: '😎', // The emoji you want
    //     marks: [{
    //         type: 'textStyle',
    //         attrs: { 
    //         fontSize: '48px', // Adjust size
    //         display: 'inline-block' 
    //         }
    //     }]
    // });


    // function insertSVG(event) {
    //     if (event) event.preventDefault();

    //     // Store the current selection position before inserting
    //     const { from } = editor.state.selection;

    //     // Insert the SVG
    //     editor.commands.insertContent({
    //       type: 'image',
    //       attrs: {
    //         src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    //         width: 50,
    //         height: 50,
    //         style: 'display: inline-block;'
    //       }
    //     });

    //     // Compute where the cursor should go - just after the inserted image
    //     // This gets the current document state after insertion
    //     const currentState = editor.state;

    //     // Find the image node we just inserted
    //     const resolvedPos = currentState.doc.resolve(from);
    //     const node = resolvedPos.nodeAfter; // This should be our image

    //     // If we found a node, place cursor just after it
    //     if (node) {
    //       const posAfterNode = from + node.nodeSize;

    //       // Set selection after the node and focus
    //       editor.commands.setTextSelection(posAfterNode);
    //       editor.commands.focus();
    //     } else {
    //       // Fallback if we can't identify the node
    //       editor.commands.focus();
    //     }
    //   }

    {/*function expects event object as the parameter. Always!!!*/}
    function insertSVG(event, link) {
        if (event) event.preventDefault(); {/*Because of event.default*/}

        const { from } = editor.state.selection;

        console.log("Starting Positon", from);

        //Insert the svg
        editor.commands.insertContent({
            type: 'flexibleImage',
            attrs: {
                src: link,
                width: 50,
                height: 50,
                style: 'display: inline-block'
            }
        });


        // const resolvedPos = editor.state.doc.resolve(from);
        // const node = resolvedPos.nodeAfter;

        // console.log(node);


        // if (node) {
        //     const posAfterNode = from + node.nodeSize;

        //     // Set cursor position after the image
        //     editor.commands.setTextSelection(posAfterNode);

        //     // Instead of a zero-width space, we can insert a normal space if needed
        //     // and only if we're at the end of a paragraph or if the next character isn't a space
        //     const nextChar = editor.state.doc.textBetween(posAfterNode, posAfterNode + 1);
        //     if (nextChar === '' || nextChar !== ' ') {
        //         // Optional: insert a normal space only if needed
        //         editor.commands.insertContent(' ');
        //     }
        // }


        editor.commands.focus();
    }

    return (
        <>
            <div className="w-full bg-slate-50 h-screen">


                <SearchBar></SearchBar>

                {/* <div className="w-full bg-slate-50 h-screen overflow-y-auto">
                    <h2 className="text-lg font-bold p-4">SVG Links</h2>
                    <div className="grid grid-cols-3 gap-4 p-4">
                        {svgLinks.map(({ id, name, link }) => (
                            <button
                                key={id}
                                onClick={() => insertSVG(event, link)}
                                className="flex flex-col items-center p-2 hover:bg-gray-200"
                            >
                                <img src={link} alt={name} width="40" height="40" />
                                <span className="text-sm mt-2">{name}</span>
                            </button>
                        ))}
                    </div>
                </div> */}
                {/**/}
                
                    <div className="grid grid-cols-3 p-3 h-full gap-3 w-full overflow-y-auto">
                        {CDNLinks.map(function({id, name, link}) {
                            return (
                            <button 
                                key={id} 
                                onClick={() => {insertSVG(event, link)}}
                                className="flex flex-col items-center p-2 hover:bg-gray-200 hover:rounded" 
                            >
                                <img width="40" src={link} alt={name}></img>
                                {/*Text-wrapping or turncating or overflow-hidden? */}
                                <span className="break-words text-center text-sm mt-2">{name}</span>
                            </button>
                        )
                        })}
                    </div>


            </div>
        </>
    )
}


export default SideBar;