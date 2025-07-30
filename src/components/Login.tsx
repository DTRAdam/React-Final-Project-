import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useContext, useEffect, } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkUser } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedback";
import useUser from "../hooks/useUser";

interface LoginProps {

}
const Login: FunctionComponent<LoginProps> = () => {
    const navigate: NavigateFunction = useNavigate()
    const { setIsLoggedIn, users } = useUser()
    const formik: FormikValues = useFormik({
        initialValues: {
            email: "", password: ""
        },
        validationSchema: yup.object({
            email: yup.string().email().min(5).required(),
            password: yup.string().min(9).max(20).required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/,),
        }),
        onSubmit: (values) => {
            checkUser(values.email, values.password).then((res) => {
                if (res.data.length) {
                    setIsLoggedIn(true)
                    localStorage.token = res.data
                    successMsg(`Welcome back`)
                    navigate("/")
                } else {
                    errorMsg("Email or password is invalid !")
                }

            }).catch(() =>
                errorMsg("Email or password is invalid !")
            )
        }
    });
    return (
        <>
            <h1 className=" display-2">Login</h1>
            <div className="loginmaindiv ">
                <form className="form loginform" onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-2 w-50 mx-3 ">
                        <input
                            type="text"
                            className="form-control "
                            id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="email">Email</label>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-danger">{formik.errors.email}</p>
                        )}
                    </div>
                    <div className="form-floating mb-2 w-50 mx-3">
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="password">Password</label>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-danger">{formik.errors.password}</p>
                        )}
                    </div>
                    <button
                        className="btn btn-primary  mt-3 w-50"
                        type="submit"
                        disabled={!formik.dirty || !formik.isValid}>
                        <i className="fa-solid fa-key"></i> Login
                    </button>
                </form>
            </div>
        </>
    );
}
export default Login;