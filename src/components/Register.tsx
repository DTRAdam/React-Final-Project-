import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { createUser } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedback";
import { users } from "../interfaces/users";

interface RegisterProps {

}

const Register: FunctionComponent<RegisterProps> = () => {
    const navigate: NavigateFunction = useNavigate()
    const formik = useFormik<users>({
        initialValues: {
            name: {
                first: "",
                middle: "",
                last: "",
            },
            phone: "",
            email: "",
            password: "",
            image: {
                url: "",
                alt: "",
            },
            address: {
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: 0,
                zip: 0,
            },
            isBusiness: false,
        },
        validationSchema: yup.object({
            name: yup.object({
                first: yup.string().min(2).max(256).required(),
                middle: yup.string().min(2).max(256),
                last: yup.string().min(2).max(256).required(),
            }),
            phone: yup.string().matches(/^\d{9,11}$/,).required(),
            email: yup.string().email().min(5).required(),
            password: yup.string().min(9).max(20).required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/,),
            image: yup.object({
                url: yup.string().url().min(14),
                alt: yup.string().min(2).max(256),
            }),
            address: yup.object({
                state: yup.string().min(2).max(256),
                country: yup.string().min(2).max(256).required(),
                city: yup.string().min(2).max(256).required(),
                street: yup.string().min(2).max(256).required(),
                houseNumber: yup.number().min(2).required(),
                zip: yup.number().min(2).required(),
            }),
            isBusiness: yup.boolean().required(),
        }),
        onSubmit: (values: users) => {
            console.log(values);
            createUser(values).then((res) => {
                successMsg("Thank you for registering! We're excited to have you on board.")
                navigate("/login")

            }).catch((err) => {
                errorMsg("Somethin went wrong")
            })
        }
    })
    return (
        <>
            <h1 className=" display-2">Register</h1>
            <div className="registermaindiv">
                <form className="registerform" onSubmit={formik.handleSubmit}>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="name.first"
                            name="name.first"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="name.first">First name</label>
                        {formik.touched.name?.first && formik.errors.name?.first && (
                            <p className="text-danger">{formik.errors.name.first}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="name.middle"
                            name="name.middle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="name.middle">Middle name</label>
                        {formik.touched.name?.middle && formik.errors.name?.middle && (
                            <p className="text-danger">{formik.errors.name.middle}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="name.last"
                            name="name.last"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="name.last">Last name</label>
                        {formik.touched.name?.last && formik.errors.name?.last && (
                            <p className="text-danger">{formik.errors.name.last}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="phone">Phone</label>
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-danger">{formik.errors.phone}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            autoComplete="@gmail.com"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="email">Email</label>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-danger">{formik.errors.email}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="password">Password</label>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-danger">{formik.errors.password}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="url"
                            className="form-control"
                            id="image.url"
                            name="image.url"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="image.url">Image URL</label>
                        {formik.touched.image?.url && formik.errors.image?.url && (
                            <p className="text-danger">{formik.errors.image.url}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="image.alt"
                            name="image.alt"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="image.alt">Image Alt</label>
                        {formik.touched.image?.alt && formik.errors.image?.alt && (
                            <p className="text-danger">{formik.errors.image.alt}</p>
                        )}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="address.state"
                            name="address.state"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="address.state">State</label>
                        {formik.touched.address?.state && formik.errors.address?.state && (
                            <p className="text-danger">{formik.errors.address.state}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="address.country"
                            name="address.country"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="address.country">Country</label>
                        {formik.touched.address?.country && formik.errors.address?.country && (
                            <p className="text-danger">{formik.errors.address.country}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="address.city"
                            name="address.city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="address.city">City</label>
                        {formik.touched.address?.city && formik.errors.address?.city && (
                            <p className="text-danger">{formik.errors.address.city}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="address.street"
                            name="address.street"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="address.street">Street</label>
                        {formik.touched.address?.street && formik.errors.address?.street && (
                            <p className="text-danger">{formik.errors.address.street}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="address.houseNumber"
                            name="address.houseNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="address.houseNumber">House Number</label>
                        {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && (
                            <p className="text-danger">House number must be more than or equal to 2</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="address.zip"
                            name="address.zip"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="address.zip">Zip Code</label>
                        {formik.touched.address?.zip && formik.errors.address?.zip && (
                            <p className="text-danger">Zip must be greater than or equal to 2</p>
                        )}
                    </div>
                    <div className="form-check mb-3 mx-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="isBusiness"
                            name="isBusiness"
                            checked={formik.values.isBusiness}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label" htmlFor="isBusiness">
                            Signup as Business
                        </label>
                    </div>
                    <div className="mainbtnsdiv ">
                        <div className="btndiv form-floating  w-100">
                            <button
                                className="btn btn-outline-danger fs-5 mt-3 w-100 "
                                type="submit"
                                disabled={!formik.dirty || !formik.isValid}
                            >
                                <i className="fa-regular fa-rectangle-xmark"></i> Cancel
                            </button>
                            <button
                                className="btn btn-outline-primary fs-5 mt-3 w-100  ms-5 "
                                type="submit"
                                disabled={!formik.dirty || !formik.isValid}
                            >
                                <i className="fa-solid fa-arrows-rotate"></i>
                            </button>
                        </div>
                        <div className="form-floating  w-100">
                            <button
                                className="btn btn-outline-primary fs-5 mt-3 w-100"
                                type="submit"
                                disabled={!formik.dirty || !formik.isValid}
                            >
                                <i className="fa-solid fa-user-plus"></i> Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;