import Breadcrumbs from "../components/Breadcrumbs";
import PageTitle from "../components/PageTitle";
import PersonalDataForm from "../components/profile/PersonalDataForm";
import PasswordChangeForm from "../components/profile/PasswordChangeFrom";
import TimezoneSettings from "../components/profile/TimezoneSetting";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {changeEmailConfirm, changePasswordConfirm} from "../services/api/user.js";
import toast from "react-hot-toast";
import EmailChangeForm from "../components/profile/EmailChangeForm.jsx";

const ProfilePage = ({ variant }) => {
    const [formData, setFormData] = useState({
        last_name: '',
        first_name: '',
        surname: '',
        email: ''
    });
    const [resendTimer, setResendTimer] = useState(0);

    const { uuid } = useParams();
    const navigate = useNavigate();

    const accessToken = localStorage.getItem("accessToken");

    useEffect( () => {
        if (!uuid) return;

        if (accessToken) {
            if (variant === 'password') {
                const confirmPasswordChange = async () => {
                    try {
                        const response = await changePasswordConfirm(uuid);
                        console.log(response);
                        toast.success('Пароль успешно обновлен!')
                        navigate("/profile", {replace: true});
                    } catch (error) {
                        console.log(error);
                        navigate("/profile", {replace: true});
                        toast.error('Не удалось обновить пароль!');
                    }
                }
                confirmPasswordChange()
            } else if (variant === 'email') {
                const confirmEmailChange = async () => {
                    try {
                        const response = await changeEmailConfirm(uuid);
                        console.log(response);
                        toast.success('Почта успешно обновлена!')
                        navigate("/profile", {replace: true});
                    } catch (error) {
                        console.log(error);
                        navigate("/profile", {replace: true});
                        toast.error('Не удалось обновить почту!');
                    }
                }
                confirmEmailChange()
            }
        } else {
            if (variant === 'password') {
                sessionStorage.setItem('uuidPassword', uuid);
            } else if (variant === 'email') {
                sessionStorage.setItem('uuidEmail', uuid);
            }
            navigate('/login');
            toast.error('Требуется авторизация!')
        }

    }, [navigate, uuid, variant]);

    // таймер
    useEffect(() => {
        if (resendTimer > 0) {
            const timerId = setTimeout(() => {
                setResendTimer(resendTimer - 1);
            }, 1000);

            // очистка таймера
            return () => clearTimeout(timerId);
        }
    }, [resendTimer]);

    return (
        <>
            <div className="min-h-screen">

                <div className="xl:ml-[240px] mt-[60px] xl:mr-[240px] px-4 lg:px-0 py-4 lg:py-0">
                    <Breadcrumbs
                        title="Администратор / Личный кабинет / Общая информация"
                        className="text-sm lg:text-base"
                    />

                    <PageTitle
                        title="Личный кабинет"
                        className="text-2xl lg:text-3xl lg:mt-0"
                    />

                        <main className="xl:flex flex-col lg:flex-row gap-4 lg:gap-[10px] mt-4 lg:mt-[24px]">
                            {/* Левая колонка (формы) */}
                            <div className="flex flex-col gap-4 lg:gap-[10px] w-full lg:w-auto">
                                <PersonalDataForm
                                    formData={formData}
                                    setFormData={setFormData}/>
                                <PasswordChangeForm/>
                            </div>

                            {/* Правая колонка (настройки) */}
                            <div
                                className="flex flex-col mt-4 md:mt-3 lg:mt-3 sm:mt-3 xl:mt-0 w-full gap-4 lg:gap-[10px]">
                                <TimezoneSettings/>
                                <EmailChangeForm/>
                            </div>
                        </main>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;