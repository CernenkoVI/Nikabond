'use client';

import ActorsList from "../actors/ActorsList";

const MyActorsComponent = () => {
    return (
        <div>
            <div className="p-5 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 shadow-md border border-gray-300 rounded-xl">
                <ActorsList />
            </div>
        </div>
    );
};

export default MyActorsComponent;
