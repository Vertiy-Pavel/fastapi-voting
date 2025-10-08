import {useEffect, useState} from "react";
import {getDepartmentsTest} from "../services/api.js";

const DepartmentsPage = () => {
    const [departments, setDepartments] = useState({});
    useEffect(() => {
        const getDepartments = async () => {
            const response = getDepartmentsTest()
            setDepartments(response)
        }
        getDepartments();
    }, [])

    return (<div className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Структура отделов</h1>
        <DepartmentList items={departments.items} />
    </div>)
}
export default DepartmentsPage;