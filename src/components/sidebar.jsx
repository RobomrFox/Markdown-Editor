import { useAtomValue } from "jotai";
import { editorState } from "../store/atoms/editor";

const SideBar = () => {

    const editor = useAtomValue(editorState);

    function getThis(event) {
        // const value = event.currentTarget.innerHTML;
        // console.log(value);
        // editor.commands.insertContent(value);

    editor.commands.insertContent({
        type: 'text',
        text: '😎', // The emoji you want
        marks: [{
            type: 'textStyle',
            attrs: { 
            fontSize: '48px', // Adjust size
            display: 'inline-block' 
            }
        }]
    });
    }


    function insertSVG() {
        editor.commands.insertContent({
            type: 'image',
            attrs: {
              src: '/src/assets/1_MenuBar/1_bold.svg', // Verify path
              width: 50,
              height: 50,
              style: 'display: inline;'
            }
          })
      }
      
    return (
        <>
        <div className="w-full bg-slate-50 h-screen"> 
            😒

            <div className="flex flex-col my-auto h-full">
                <button data-tip="2" onClick={insertSVG}>
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