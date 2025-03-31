import { useSetAtom } from "jotai";
import { accordionState } from "../store/atoms/editor";


const SearchBar = () => {
    console.log('Rendering SearchBar');
  
    return (
      <div className="group relative bg-white/90 backdrop-blur-md border border-slate-200 p-2 my-4 rounded-lg flex gap-2 items-center max-w-[90%] mx-auto transition-all duration-300 shadow-pink-300/50 hover:shadow-xs focus-within:shadow-xs">

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  
        {/* Input Field */}
        <input
          type="text"
          id="search-field"
          placeholder="Search..." // Added placeholder
          className="outline-none bg-transparent text-base text-slate-700 flex-grow px-1 py-0.5" // Adjusted padding
        />
  
        {/* Clear Button (Optional, appears when typing) */}
        {/* You would need state to manage the input value and show/hide this */}
        {/* <button className="p-1 rounded-full hover:bg-slate-100 text-slate-400 mr-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button> */}
      </div>
    );
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
                className="focus-within:cursor-pointer flex items-center w-[90%] mx-auto hover:bg-slate-200/50 cursor-pointer rounded"
            >
                <h1 className="ml-1 text-base my-1">{id}</h1>

                <svg
                className={`size-4 ml-auto mr-1 transition-transform transform duration-200${isSelected ? " rotate-180 " : " "}`}
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