import React from 'react'
import * as Icons from "react-icons/md";

const MenuLinks = ({MathRoute, path, title, icon}) => {

    const Icon = Icons[icon];
    return (
        <>  <li
                className={`${MathRoute(path)
                    ? "text-yellow-50 cursor-pointer px-4"
                    : "cursor-pointer px-4"
                    }`}
            >
            <div className='flex gap-x-2 items-center'>
                <Icon /> <p>{title}</p>
            </div>
            </li>
        </>
    )
}

export default MenuLinks