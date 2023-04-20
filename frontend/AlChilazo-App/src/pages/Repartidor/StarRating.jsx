import React from "react";
import { Rating } from "semantic-ui-react";

export const StarRating = ({value}) => {
    const initialRating = value;

    return (
        <>
            <Rating 
                icon="star" 
                defaultRating={initialRating} 
                maxRating={5} 
                size="massive"
                disabled />
        </>
    );
}

export default StarRating;
