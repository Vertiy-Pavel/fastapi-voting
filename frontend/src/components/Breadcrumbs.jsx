import React, {memo} from 'react';

const Breadcrumbs = (props) => {
    return (
        <div className="text-stone-300 text-base font-normal ">
            {props.title}
        </div>
    );
};

export default memo(Breadcrumbs);