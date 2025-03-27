

const SearchBar = () => {

    console.log("Rendering SearchBar");

    return(
        <>
        <div className='mt-10 flex justify-between items-center border border-gray-200 rounded-3xl w-[90%] mx-auto overflow-hidden focus-within:border-gray-300 focus-within:shadow-xs hover:border-gray-300 transition-all duration-200'>
            <input type='text' id='search-field' className="outline-none ml-3 text-base w-[80%]" />
            <button className="cursor-pointer mr-0 h-9 aspect-square bg-purple-300 rounded-full flex items-center justify-center">
                <img src='/src/assets/2_SearchBar/1_Search.svg' className="h-[90%]"></img>
            </button>
        </div>
        </>
    )
};


export default SearchBar;