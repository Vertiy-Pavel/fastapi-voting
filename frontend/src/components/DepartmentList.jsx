import {useState} from "react";

const DepartmentList = ({items}) => {
    return (
        <ul className="ml-2 w-full">
            {items
                .filter((dept) => dept.parent_id === null)
                .map((dept) => (
                    <DepartmentItem key={dept.id} dept={dept}/>
                ))}
        </ul>
    );
};

const DepartmentItem = ({dept}) => {
    const [open, setOpen] = useState(false);

    const hasChildren = dept.children && dept.children.length > 0;

    return (
        <li className="text-gray-800 w-full">
            <div
                className="flex items-center cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
                onClick={() => hasChildren && setOpen(!open)}
            >
                {hasChildren && (
                    <span className="mr-2 text-gray-500">
            {open ? "▼" : "▶"}
          </span>
                )}
                <span className="font-medium">{dept.name}</span>
            </div>

            {hasChildren && open && (
                <ul className="ml-6 border-l border-gray-300 pl-2 space-y-1">
                    {dept.children.map((child) => (
                        <DepartmentItem key={child.id} dept={child}/>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default DepartmentList;
