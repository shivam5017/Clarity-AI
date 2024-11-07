'use client'
import React from 'react';

const Spinner = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
    );
};

export default Spinner;
