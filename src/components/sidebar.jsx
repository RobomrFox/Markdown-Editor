import { useAtomValue } from "jotai";
import { editorState } from "../store/atoms/editor";

const SideBar = () => {

    const editor = useAtomValue(editorState);

    return (
        <>
        <div className="w-full bg-slate-50 h-screen"> 
            😒

            <div className="flex flex-col my-auto h-full">
                <button onClick={(event) => {
                    if(editor) {
                        editor.commands.insertContent('😎');
                    }
                    }}>
                    <span className="text-[5rem]">😎</span> 
                </button>
                <button>
                    <span className="text-[5rem]">😾</span>
                </button>
            </div>
        </div>
        </>
    )
}

function isertIcons(item) {
    const value = item.targe.value;
}

export default SideBar;