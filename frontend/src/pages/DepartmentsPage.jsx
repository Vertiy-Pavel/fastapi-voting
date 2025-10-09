import DepartmentList from "../components/DepartmentList.jsx";
import {useEffect, useState} from "react";
import PageTitle from "../components/PageTitle.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";

const DepartmentPage = () => {
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/v1/department/departments/')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Ошибка HTTP: ${res.status}`)
                }
                return res.json()
            })
            .then((data) => {
                setDepartments(data)
                console.log("Ответ сервера:", data)
            })
            .catch((err) => {
                console.error("Ошибка запроса:", err)
            })
    }, [])

    return (
        <>
            <div className='mx-4 2xl:ml-[240px] mt-[60px] 2xl:mr-[240px] lg:ml-[40px] lg:mr-[40px]'>
                <Breadcrumbs title={'Departments'}/>
                <PageTitle title={'Структура отделов'}/>
                <div className="p-6 mt-4 md:mt-3 lg:mt-3 sm:mt-3 xl:mt-0 bg-white shadow-md w-full rounded-[10px]">
                    <DepartmentList items={departments}/>
                </div>
            </div>
        </>)
}
export default DepartmentPage;
