import React from 'react';

const Badge = ({ name, color }) => {
    return (
        <span className={`inline-block px-2 py-1 text-sm font-semibold rounded-full bg-${color}-500 text-${color}-100`}>
            {name}
        </span>
    );
};

export default Badge;