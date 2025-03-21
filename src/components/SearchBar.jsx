

const SearchBar = () => {


    console.log("Rendering SearchBar");

    return(
        <>
        <div className='flex justify-between border-1 border-gray-200 rounded w-[90%] mx-auto'>
            <input type='text' id='search-field' className="outline-none ml-1 text-2xl w-[80%]" />
            <button className="cursor-pointer">
                <img src='/src/assets/2_SearchBar/1_Search.svg' className="h-full"></img>
            </button>
        </div>
        </>
    )
};


export default SearchBar;