const DepartmentList = ({ items }) => {
    return (
        <ul className="ml-4 list-disc space-y-2">
            {items.map((dept) => (
                <li key={dept.id} className="text-gray-800">
                    <div className="font-semibold">{dept.name}</div>
                    <div className="text-sm text-gray-600 whitespace-pre-line">{dept.location}</div>
                    <div className="italic text-gray-500">{dept.description}</div>
                    {dept.children && dept.children.length > 0 && (
                        <DepartmentList items={dept.children} />
                    )}
                </li>
            ))}
        </ul>
    );
};
