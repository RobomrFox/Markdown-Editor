import { useAtom, useAtomValue } from "jotai";
import { accordionState, editorState } from "../store/atoms/editor";
import { SearchBar, Accordion } from "./SideBarComponent";

import { CDNLinks } from "../db/Links";

const SideBar = () => {

    const [isSelected, setIsSelected] = useAtom(accordionState);

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
            <div className="w-full bg-slate-50 h-screen gap-4 flex flex-col border-r-1 border-gray-950/30">
        

                <div className="p-4">
                    <img 
                    className="w-10"
                    src="src/assets/3_Logo/Md.svg"
                    ></img>
                </div>


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
                <div className="overflow-y-auto max-h-full w-full mx-auto custom-scrollbar">

                
                    <Accordion id={"Programming Languages"} isSelected={isSelected["Programming Languages"]} content={
                        <div className={`${isSelected["Programming Languages"] ? "max-h-[60vh]" : "max-h-0"} grid grid-cols-3 
                        justify-items-center p-3 gap-3 w-full overflow-y-auto overflow-x-hidden transition-all 
                        duration-300 border-b-1 border-slate-300 hover:shadow-xs hide-scrollbar`}>
                        {CDNLinks.filter(({category})=> {
                            return category === "Programming Languages";
                        }).map(({id, name, link}) => {
                            return(
                            <>
                                <button 
                                key={id}
                                onClick={() => {
                                    insertSVG(event, link)
                                }}
                                className="w-18 flex flex-col items-center p-2 hover:bg-slate-200 hover:rounded"
                                > {/*images with 4rem appears differently */}
                                    <img className="w-[3rem]" src={link} alt={name} />
                                    <h2 className="text-sm">{name}</h2>
                                </button>
                            </>
                            )
                        })}
                    </div>
                    }>
                
                </Accordion>

                <Accordion id={"Frontend Development"} isSelected={isSelected["Frontend Development"]} content={
                        <div className={`${isSelected["Frontend Development"] ? "max-h-[60vh]" : "max-h-0"} grid grid-cols-3 justify-items-center p-3 gap-3 w-full overflow-y-auto overflow-x-hidden transition-all duration-300 border-b-1 border-gray-800/30 hover:shadow-xs hide-scrollbar`}>
                        {CDNLinks.filter(({category})=> {
                            return category === "Frontend Development";
                        }).map(({id, name, link}) => {
                            return(
                            <>
                                <button 
                                key={id}
                                onClick={() => {
                                    insertSVG(event, link)
                                }}
                                className="w-[4rem] flex flex-col items-center p-2 hover:bg-gray-200 hover:rounded"
                                > {/*images with 4rem appears differently */}
                                    <img className="w-[3rem]" src={link} alt={name} />
                                    <h2 className="text-sm">{name}</h2>
                                </button>
                            </>
                            )
                        })}
                    </div>
                    }>
                
                </Accordion>

                <Accordion id={"Backend Development"} isSelected={isSelected["Backend Development"]} content={
                        <div className={`${isSelected["Backend Development"] ? "max-h-[60vh]" : "max-h-0"} grid grid-cols-3 justify-items-center p-3 gap-3 w-full overflow-y-auto overflow-x-hidden transition-all duration-300 border-b-1 border-gray-800/30 hover:shadow-xs hide-scrollbar`}>
                        {CDNLinks.filter(({category})=> {
                            return category === "Backend Development";
                        }).map(({id, name, link}) => {
                            return(
                            <>
                                <button 
                                key={id}
                                onClick={() => {
                                    insertSVG(event, link)
                                }}
                                className="w-[4rem] flex flex-col items-center p-2 hover:bg-gray-200 hover:rounded"
                                > {/*images with 4rem appears differently */}
                                    <img className="w-[3rem]" src={link} alt={name} />
                                    <h2 className="text-sm">{name}</h2>
                                </button>
                            </>
                            )
                        })}
                    </div>
                    }>
                
                </Accordion>

                <Accordion id={"Databases & Data Storage"} isSelected={isSelected["Databases & Data Storage"]} content={
                        <div className={`${isSelected["Databases & Data Storage"] ? "max-h-[60vh]" : "max-h-0"} grid grid-cols-3 justify-items-center p-3 gap-3 w-full overflow-y-auto overflow-x-hidden transition-all duration-300 border-b-1 border-gray-800/30 hover:shadow-xs hide-scrollbar`}>
                        {CDNLinks.filter(({category})=> {
                            return category === "Databases & Data Storage";
                        }).map(({id, name, link}) => {
                            return(
                            <>
                                <button 
                                key={id}
                                onClick={() => {
                                    insertSVG(event, link)
                                }}
                                className="w-[4rem] flex flex-col items-center p-2 hover:bg-gray-200 hover:rounded"
                                > {/*images with 4rem appears differently */}
                                    <img className="w-[3rem]" src={link} alt={name} />
                                    <h2 className="text-sm">{name}</h2>
                                </button>
                            </>
                            )
                        })}
                    </div>
                    }>
                
                </Accordion>

                <Accordion id={"Cloud & DevOps"} isSelected={isSelected["Cloud & DevOps"]} content={
                        <div className={`${isSelected["Cloud & DevOps"] ? "max-h-[60vh]" : "max-h-0"} grid grid-cols-3 justify-items-center p-3 gap-3 w-full overflow-y-auto overflow-x-hidden transition-all duration-300 border-b-1 border-gray-800/30 hover:shadow-xs hide-scrollbar`}>
                        {CDNLinks.filter(({category})=> {
                            return category === "Cloud & DevOps";
                        }).map(({id, name, link}) => {
                            return(
                            <>
                                <button 
                                key={id}
                                onClick={() => {
                                    insertSVG(event, link)
                                }}
                                className="w-[4rem] flex flex-col items-center p-2 hover:bg-gray-200 hover:rounded"
                                > {/*images with 4rem appears differently */}
                                    <img className="w-[3rem]" src={link} alt={name} />
                                    <h2 className="text-sm">{name}</h2>
                                </button>
                            </>
                            )
                        })}
                    </div>
                    }>
                
                </Accordion>

                <Accordion id={"Software & Tools"} isSelected={isSelected["Software & Tools"]} content={
                        <div className={`${isSelected["Software & Tools"] ? "max-h-[60vh]" : "max-h-0"} grid grid-cols-3 justify-items-center p-3 gap-3 w-full overflow-y-auto overflow-x-hidden transition-all duration-300 border-b-1 border-gray-800/30 hover:shadow-xs hide-scrollbar`}>
                        {CDNLinks.filter(({category})=> {
                            return category === "Software & Tools";
                        }).map(({id, name, link}) => {
                            return(
                            <>
                                <button 
                                key={id}
                                onClick={() => {
                                    insertSVG(event, link)
                                }}
                                className="w-[4rem] flex flex-col items-center p-2 hover:bg-gray-200 hover:rounded"
                                > {/*images with 4rem appears differently */}
                                    <img className="w-[3rem]" src={link} alt={name} />
                                    <h2 className="text-sm">{name}</h2>
                                </button>
                            </>
                            )
                        })}
                    </div>
                    }>
                
                </Accordion>

                <Accordion id={"Operating Systems"} isSelected={isSelected["Operating Systems"]} content={
                        <div className={`${isSelected["Operating Systems"] ? "max-h-[60vh]" : "max-h-0"} grid grid-cols-3 justify-items-center p-3 gap-3 w-full overflow-y-auto overflow-x-hidden transition-all duration-300 border-b-1 border-gray-800/30 hover:shadow-xs hide-scrollbar`}>
                        {CDNLinks.filter(({category})=> {
                            return category === "Operating Systems";
                        }).map(({id, name, link}) => {
                            return(
                            <>
                                <button 
                                key={id}
                                onClick={() => {
                                    insertSVG(event, link)
                                }}
                                className="w-[4rem] flex flex-col items-center p-2 hover:bg-gray-200 hover:rounded"
                                > {/*images with 4rem appears differently */}
                                    <img className="w-[3rem]" src={link} alt={name} />
                                    <h2 className="text-sm">{name}</h2>
                                </button>
                            </>
                            )
                        })}
                    </div>
                    }>
                
                </Accordion>

                <Accordion id={"Game Development"} isSelected={isSelected["Game Development"]} content={
                        <div className={`${isSelected["Game Development"] ? "max-h-[60vh]" : "max-h-0"} grid grid-cols-3 justify-items-center p-3 gap-3 w-full overflow-y-auto overflow-x-hidden transition-all duration-300 border-b-1 border-gray-800/30 hover:shadow-xs hover:bg-gray-200/10 hide-scrollbar`}>
                        {CDNLinks.filter(({category})=> {
                            return category === "Game Development";
                        }).map(({id, name, link}) => {
                            return(
                            <>
                                <button 
                                key={id}
                                onClick={() => {
                                    insertSVG(event, link)
                                }}
                                className="w-[4rem] flex flex-col items-center p-2 hover:bg-gray-200 hover:rounded"
                                > {/*images with 4rem appears differently */}
                                    <img className="w-[3rem]" src={link} alt={name} />
                                    <h2 className="text-sm">{name}</h2>
                                </button>
                            </>
                            )
                        })}
                    </div>
                    }>
                
                </Accordion>
                    

                </div>
            </div>
        </>
    )
}


// {CDNLinks.map(function({id, name, link}) {
//     return (
//     <button 
//         key={id} 
//         onClick={() => {insertSVG(event, link)}}
//         className="flex flex-col items-center p-2 hover:bg-gray-200 hover:rounded" 
//     >
//         <img width="40" src={link} alt={name}></img>
//         {/*Text-wrapping or turncating or overflow-hidden? */}
//         <span className="break-words text-center text-sm mt-2">{name}</span>
//     </button>
// )
// })}


export default SideBar;