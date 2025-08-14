const SearchFilters = () => {
    return (
        <div className="p-1 h-[68px] flex flex-row items-center justify-between border border-lime-500/50 rounded-full bg-gray-200 hover:bg-gray-300">

            <div className="flex flex-col items-center">
                <div className="p-2">
                    <div className="p-4 cursor-pointer bg-lime-500/75 rounded-full text-black text-sm font-semibold hover:bg-lime-500">Advanced&nbsp;search</div>
                </div>
            </div>

            <div className="h-[52px] mr-2 flex justify-center rounded-full border border-gray-300 hover:bg-gray-300">
                <div className="py-3 flex items-center justify-center bg-lime-100 hover:bg-gray-100 rounded-full">
                    <p className="px-2 cursor-text text-sm text-gray-500 font-semibold">Search&nbsp;by&nbsp;name</p>
                    <div className="hidden md:block lg:block">

                        <div className="flex flex-row items-center justify-between">
                            <div className="p-2">
                                <div className="cursor-pointer p-4 bg-gray-400 rounded-full hover:bg-gray-500">
                                    <img src="/search.png" alt="Browse actors" className="w-5 h-5 min-w-5" />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchFilters;