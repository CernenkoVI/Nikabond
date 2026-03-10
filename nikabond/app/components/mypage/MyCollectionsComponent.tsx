'use client';

import MyCollectionsComponentItem from "./MyCollectionsComponentItem";

const MyCollectionsComponent = () => {
    return (
        <div className="space-y-2">
            <MyCollectionsComponentItem />
            <MyCollectionsComponentItem />
        </div>
    );
};

export default MyCollectionsComponent;
