import { useAtomValue } from "jotai";
import { editorState } from "../store/atoms/editor";

const SideBar = () => {

    const editor = useAtomValue(editorState);

    function getThis(event) {
        const value = event.currentTarget.innerHTML;
        console.log(value);
        editor.commands.insertContent(value);
    }

    return (
        <>
        <div className="w-full bg-slate-50 h-screen"> 
            😒

            <div className="flex flex-col my-auto h-full">
                <button data-tip="2" onClick={getThis}>
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

function insertIcons(item) {
    const value = item.target.value;
}

export default SideBar;