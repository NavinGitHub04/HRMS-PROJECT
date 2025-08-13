import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <div className="  bg-slate-400">
            <Link to="/" className="flex items-center">
                {/* Add your logo or text here if needed */}
            </Link>
            <ul className="flex justify-evenly h-14 font-bold text-2xl ">
                <li>
                    <NavLink
                        to="/componey"
                        className={({ isActive }) =>
                            `hover: lg:hover:bg-transparent 
                        ${isActive ? "text-orange-700" : "text-gray-600"}
                         lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                        componey
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/department"
                        className={({ isActive }) =>
                            `hover: lg:hover:bg-transparent 
                             ${isActive ? "text-orange-700" : "text-gray-600"}
                             lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                        department
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/division"
                        className={({ isActive }) =>
                            `hover: lg:hover:bg-transparent 
                             ${isActive ? "text-orange-700" : "text-gray-600"}
                             lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                        division
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/subDivision"
                        className={({ isActive }) =>
                            `hover: lg:hover:bg-transparent 
                             ${isActive ? "text-orange-700" : "text-gray-600"}
                             lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                        subDivision
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/employ"
                        className={({ isActive }) =>
                            `hover: lg:hover:bg-transparent 
                             ${isActive ? "text-orange-700" : "text-gray-600"}
                             lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                        Employ
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/subEmploy"
                        className={({ isActive }) =>
                            `hover:lg:hover:bg-transparent 
                             ${isActive ? "text-orange-700" : "text-gray-600"}
                             lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                        subEmploy
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/job"
                        className={({ isActive }) =>
                            `hover:lg:hover:bg-transparent 
                             ${isActive ? "text-orange-700 " : "text-gray-600"}
                             lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                        Job
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/OrgUnit"
                        className={({ isActive }) =>
                            `hover:lg:hover:bg-transparent 
                             ${isActive ? "text-orange-700 " : "text-gray-600"}
                             lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                        OrgUnit
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/Position"
                        className={({ isActive }) =>
                            `hover:lg:hover:bg-transparent 
                             ${isActive ? "text-orange-700 " : "text-gray-600"}
                             lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                        Position
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}