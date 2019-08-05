import React from 'react';
import PropertyCard from './PropertyListItems'

function PropertyList() {
    return (
        <div className="">
           {
                [1, 2, 3, 4, 5, 6].map((e) => <PropertyCard/>)
           }
        </div>
    );
}

export default PropertyList;
