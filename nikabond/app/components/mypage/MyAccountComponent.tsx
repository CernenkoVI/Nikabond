'use client';

import ActorsPageMiddle from "../actors/ActorsPageMiddle";
import ActorsPageRight from "../actors/ActorsPageRight";
import AttachedMediaButton from "../AttachedMediaButton";
import Image from "next/image";

const MyAccountComponent = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="p-5 mt-1 grid grid-cols-1 lg:grid-cols-[20%_50%_30%] gap-4 shadow-md border border-gray-300 rounded-xl w-full">
                {/* Profile Picture Section */}
                <div className="border border-lime-300 rounded-xl">
                    <div className="relative overflow-hidden aspect-square border border-lime-300 rounded-xl">
                        <Image
                            fill
                            src="/moi.png"
                            className="hover:scale-110 object-cover transition h-full w-full"
                            alt="Profile pic"
                        />
                    </div>
                    <AttachedMediaButton />
                </div>

                {/* Middle Section */}
                <div className="border border-lime-200 shadow-xl rounded-xl">
                    <h2 className="p-2 text-xl">Visible Information</h2>
                    <ActorsPageMiddle />
                </div>

                {/* Right Section */}
                <div className="mr-5 bg-lime-100 rounded-xl">
                    <h2 className="pl-2 py-2 text-xl">Invisible Information</h2>
                    <ActorsPageRight />
                </div>
            </div>
        </div>
    );
};

export default MyAccountComponent;
