const DepartmentList = ({ items }) => {
    return (
        <ul className="ml-4 list-disc space-y-2 w-full">
            {items
                .filter((dept) => dept.parent_id === null) // только корневые
                .map((dept) => (
                    <DepartmentItem key={dept.id} dept={dept} />
                ))}
        </ul>
    );
};

const DepartmentItem = ({ dept }) => {
    return (
        <li className="text-gray-800 w-full">
            <div className="font-semibold">{dept.name}</div>
            {dept.children && dept.children.length > 0 && (
                <ul className="ml-4 list-disc space-y-2">
                    {dept.children.map((child) => (
                        <DepartmentItem key={child.id} dept={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default DepartmentList;
