import Image from "next/image";
import React from "react";

const Header = () => {
    return (
        <div className="flex items-center justify-between lg:justify-between w-full ">
            <input
                type="text"
                placeholder="Search..."
                className="h-12 lg:h-14 p-2 text-[24px] text-gray-200 focus:outline-0 w-[80%] overflow-ellipsis"
            />
            <Image
                src="https://i.pinimg.com/736x/43/a2/d3/43a2d3c73edc817e5e518068a0bd0e05.jpg"
                height={50}
                width={50}
                alt="profile"
                className="rounded-full w-10 h-10 lg:w-14 lg:h-14 cursor-pointer mr-1 mt-1 lg:mr-3 lg:mt-2"
            />
        </div>
    );
};

export default Header;
