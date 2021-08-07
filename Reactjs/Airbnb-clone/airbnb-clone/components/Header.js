import { useState } from "react";
import Image from "next/image";
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UserIcon } from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router";

function Header({pHolder}) {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    
    const router = useRouter();

    const pathname = router.route;


    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const closeCalender = () =>{
        setSearchInput("")
    }

    const search = () => {
        router.push({
            pathname: "/Search",
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numberOfGuests
            },
        })
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    }


    

    return (


        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">

            
            <div className="relative flex items-center h-10 cursor-pointer my-auto" onClick={() => router.push("/")}>
                <Image 
                src="https://links.papareact.com/qd3"
                layout="fill"
                objectFit="contain" objectPosition="left"
                />
            </div>

            {/* Middle-Search */}
            <div className="flex items-center md:border-2 rounded-full py-2 ">
                <input 
                value={searchInput} onChange={(e)=> setSearchInput(e.target.value)}
                type="text" placeholder={pHolder || "Start Your Search"} className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400 placeholder-shown:overflow-ellipsis"/>
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2 placeholder-shown:overflow-ellipsis" />
            </div>
            
            {/* Right-Side */}

            {
            pathname=="/Search" ? <p></p>
             :
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6"/>
                <div className="flex items-center space-x-4 border-2 p-2 rounded-full cursor-pointer">
                    <MenuIcon className="h-6"/>
                    <UserCircleIcon className="h-6"/>
                </div>
            </div>
}
            {searchInput && 
            <div className="flex flex-col col-span-3 mx-auto">
                <DateRangePicker 
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#FD5B61"]}
                onChange={handleSelect}
                />
                <div className="flex items-center border-b mb-4">   
                    <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                    <UserIcon 
                    className="h-5"
                    />
                    <input value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} min={1} type="number" className="w-12 pl-2 text-lg outline-none text-red-400" />
                </div>
                <div className="flex">
                    <button onClick={closeCalender} className="flex-grow text-gray-500">Cancel</button>
                    <button onClick={search} className="flex-grow text-red-400">Search</button>
                </div>
            </div>
            }
            

        </header>
    )
}

export default Header
