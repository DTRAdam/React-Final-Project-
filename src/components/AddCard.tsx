import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import { Card } from "../interfaces/cards";
import * as yup from "yup"
import { addCard } from "../services/cardsService";
interface AddCardProps {
    onHide: Function
    refresh: Function
}
const AddCard: FunctionComponent<AddCardProps> = ({ onHide, refresh }) => {
    const formik: FormikValues = useFormik<Card>({
        initialValues: {
            title: "",
            subtitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
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
        },
        validationSchema: yup.object({
            title: yup.string().required().min(2).max(256),
            subtitle: yup.string().required().min(2).max(256),
            description: yup.string().required().min(2).max(1024),
            phone: yup.string().required().min(9).max(11),
            email: yup.string().required().min(5).email(),
            web: yup.string().min(14),
            image: yup.object({
                url: yup.string().min(14).url(),
                alt: yup.string().min(2).max(256),
            }),
            address: yup.object({
                state: yup.string(),
                country: yup.string().required(),
                city: yup.string().required(),
                street: yup.string().required(),
                houseNumber: yup.number().required(),
                zip: yup.number(),
            }),
        }),
        onSubmit: (values) => {
            addCard(values).then(() => {
                onHide()
                refresh()
            }).catch((err) => console.log(err)
            )
        },
    });
    return (
        <>
            <div className="container w-100 ">
                <form className="addmodalform" onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
                            id="title"
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="title">Title</label>
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-danger">{formik.errors.title}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
                            id="subtitle"
                            name="subtitle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="subtitle">Subtitle</label>
                        {formik.touched.subtitle && formik.errors.subtitle && (
                            <p className="text-danger">{formik.errors.subtitle}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
                            id="description"
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="description">Description</label>
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-danger">{formik.errors.description}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
                            id="phone"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="phone">Phone</label>
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-danger">{formik.errors.phone}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="email"
                            className="form-control w-100"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="email">Email</label>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-danger">{formik.errors.email}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
                            id="web"
                            name="web"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="web">Website</label>
                        {formik.touched.web && formik.errors.web && (
                            <p className="text-danger">{formik.errors.web}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
                            id="image.url"
                            name="image.url"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="image.url">Image URL</label>
                        {formik.touched.image?.url && formik.errors.image?.url && (
                            <p className="text-danger">{formik.errors.image.url}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
                            id="image.alt"
                            name="image.alt"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="image.alt">Image Alt</label>
                        {formik.touched.image?.alt && formik.errors.image?.alt && (
                            <p className="text-danger">{formik.errors.image.alt}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
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
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
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
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
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
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
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
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
                            id="address.houseNumber"
                            name="address.houseNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="address.houseNumber">House Number</label>
                        {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && (
                            <p className="text-danger">{formik.errors.address.houseNumber}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 mx-2">
                        <input
                            type="text"
                            className="form-control w-100"
                            id="address.zip"
                            name="address.zip"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="address.zip">Zip Code</label>
                        {formik.touched.address?.zip && formik.errors.address?.zip && (
                            <p className="text-danger">{formik.errors.address.zip}</p>
                        )}
                    </div>
                    <button
                        className="btn btn-primary fs-5 mt-3 w-100"
                        type="submit"
                        disabled={!formik.dirty || !formik.isValid}
                    >
                        <i className="fa-solid fa-plus"></i>Add <i className="fa-regular fa-id-card"></i>
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddCard;