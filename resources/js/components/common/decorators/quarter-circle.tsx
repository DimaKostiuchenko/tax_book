import React from 'react';
import {cn} from "@/lib/utils";

const QuarterCircle = ({className = "bg-white",  size = 'md'}) => {

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
    }

    return (
        <div className={ cn( 'quarter-circle-bottom-right', sizeClasses[size], className)} />
    );
};

export default QuarterCircle;
