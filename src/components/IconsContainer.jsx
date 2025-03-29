import { useSetAtom } from "jotai";
import { accordionState } from "../store/atoms/editor";


const SearchBar = () => {

    console.log("Rendering SearchBar");

    return (
        <>
            <div className='min-h-10 flex justify-between items-center border border-gray-200 rounded-3xl w-[90%] mx-auto overflow-hidden focus-within:border-gray-300 focus-within:shadow-xs hover:border-gray-300 transition-all duration-200'>
                <input type='text' id='search-field' className="outline-none ml-3 text-base w-[80%]" />
                <button className="cursor-pointer mr-0 h-9 aspect-square bg-purple-300 rounded-full flex items-center justify-center">
                    <img src='/src/assets/2_SearchBar/1_Search.svg' className="h-[90%]"></img>
                </button>
            </div>
        </>
    )
};

const Accordion = ({ id, content, isSelected }) => {
    const setIsSelected = useSetAtom(accordionState);
    return (
        <>
            <button
                onClick={() => {
                    setIsSelected((prev) => ({
                        ...prev,
                        [id]: !prev[id]
                    }))
                }}
                className="focus-within:cursor-pointer flex items-center w-full hover:bg-gray-400/20 cursor-pointer border-b-1 border-b-gray-800/30"
            >
                <h1 className="ml-4 text-base my-1">{id}</h1>

                <svg
                className={`size-4 ml-auto mr-1 ${isSelected ? " rotate-180 " : " "}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>

            </button>

            {isSelected && content}
        </>
    )
}


export {
    SearchBar,
    Accordion
}