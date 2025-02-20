import { useEffect, useState } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { loginUser } from "../redux/thunk/user.jsx";
import { useNavigate } from "react-router-dom";
import { resetSuccessAndMessage } from "../redux/slice/user.jsx";

function Login() {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const { userInfo, success, message, error, errormessage } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            toast.success(message);
            dispatch(resetSuccessAndMessage());
        }
        if (error) {
            toast.error(errormessage);
            dispatch(resetErrorAndErrorMessage());
        }
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, success, error]);

    const onClickSignIn = () => {
        dispatch(loginUser({ ...loginData }));
    };
    return (
        <>
            <div className="w-[100%] h-[740px] bg-gradient-to-b from-[#AFDCB1] to-[#82C4DA] flex justify-center items-center ">
                <div className="w-[40%] h-[500px]  bg-white rounded-sm flex flex-col justify-center items-center space-y-5">
                    <div className="w-[60%] h-[80px]  flex justify-center items-center">
                        <IoMdSpeedometer className="text-6xl"></IoMdSpeedometer>
                        <h1 className="font-squad text-xl">Speedo</h1>
                    </div>
                    <div className="w-[80%] h-[80px] ">
                        <h1>Email</h1>
                        <input
                            type="text"
                            value={loginData.email}
                            onChange={(e) =>
                                setLoginData({ ...loginData, email: e.target.value })
                            }
                            placeholder="Example@gmail.com"
                            className="w-[100%] pl-5 h-[45px]  bg-blue-50 rounded-md"
                        />
                    </div>
                    <div className="w-[80%] h-[80px] ">
                        <h1>Password</h1>
                        <input
                            type="password"
                            value={loginData.password}
                            onChange={(e) =>
                                setLoginData({ ...loginData, password: e.target.value })
                            }
                            placeholder="At least 8 characters"
                            className="w-[100%] h-[45px] pl-5 bg-blue-50 rounded-md"
                        />
                    </div>
                    <div className="w-[80%] h-[80px] flex justify-center">
                        <button
                            className="w-[100%] h-[50px] bg-blue-900 rounded-md text-white text-md"
                            onClick={onClickSignIn}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
