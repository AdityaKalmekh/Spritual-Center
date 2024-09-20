'use client'

import { useForm } from "react-hook-form";
import { Devotiee_interface } from "../../../../interface/Devotee.js";
import { handleSubmition } from "../../actions.ts";

const CreateUser = () => {
    const { register, formState: { errors }, handleSubmit, setValue } = useForm<Devotiee_interface>({ mode : "onBlur"});

    function verifyInitiaionDate(initiationDate: Date) {
        const initDate = initiationDate
        let months = Number((new Date().getFullYear() - new Date(initDate).getFullYear()) * 12)
        months -= new Date(initDate).getMonth()
        months += new Date().getMonth()
        if (months > 2) {
            return "Initiation Date should be not be less than of last 2 month"
        }
        else if (new Date(initDate) > new Date()){
            return "Initiation should not be future date"
        }
    }

    return (
        <>
            <div className="container mt-5 p-4 w-50 shadow card">
                <form action={handleSubmition} encType="multipart/form-data">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mt-3">
                                <label className="form-label">FirstName</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    {...register("FirstName", {
                                        required: { value: true, message: "First Name is required" },
                                        minLength: { value: 3, message: " For First Name minimum 3 char required" },
                                        maxLength: { value: 15, message: " For First Name maximum 15 char allowed" }
                                    })}
                                    className="form-control border border-dark"
                                />
                                {errors.FirstName && <p className="text-danger" id="firstNameErr">{errors.FirstName.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mt-3">
                                <label className="form-label">MiddleName</label>
                                <input
                                    type="text"
                                    id="middleName"
                                    {...register("MidleName", {
                                        required: { value: true, message: "Middle Name is required" },
                                        minLength: { value: 3, message: " For Middle Name minimum 3 char required" },
                                        maxLength: { value: 15, message: " For Middle Name maximum 15 char allowed" }
                                    })}
                                    className="form-control border border-dark"
                                />
                                {errors.MidleName && <p className="text-danger" id="middleNameErr">{errors.MidleName.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">

                            <div className="form-group mt-3">
                                <label>LastName</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    {...register("LastName", {
                                        required: { value: true, message: "Last Name is required" },
                                        minLength: { value: 3, message: " For Last Name minimum 3 char required" },
                                        maxLength: { value: 15, message: " For Last Name maximum 15 char allowed" }
                                    })}
                                    className="form-control border border-dark"
                                />
                                {errors.LastName && <p className="text-danger" id="lastNameErr">{errors.LastName.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mt-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    id="emailId"
                                    {...register("EmailID", {
                                        required: { value: true, message: "Email is required" },
                                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Pleae enter valid email" },
                                    })}
                                    className="form-control border border-dark"
                                />
                                {errors.EmailID && <p className="text-danger" id="emailIdErr">{errors.EmailID.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mt-3">
                                <label htmlFor="imageUrl">Photo</label>
                                <input
                                    type="file"
                                    id="imageUrl"
                                    {...register("ProfilePic")}
                                    className="form-control border border-dark"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mt-3">
                                <label>Initial Date</label>
                                <input
                                    type="date"
                                    id="initiationDate"
                                    {...register("InitiationDate", {
                                        required: { value: true, message: "Initiation Date is required" },
                                        validate: verifyInitiaionDate
                                    })}
                                    className="form-control border border-dark"
                                />
                                {errors.InitiationDate && <p className="text-danger" id="initiationDateErr">{errors.InitiationDate.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mt-3">
                                <label>Flat Number</label>
                                <input
                                    type="number"
                                    id="flatNumber"
                                    {...register("FlatNumber", {
                                        required: { value: true, message: "FlatNumber is required" }
                                    })}
                                    className="form-control border border-dark"
                                />
                                {errors.FlatNumber && <p className="text-danger" id="flatNumberErr">{errors.FlatNumber.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mt-3">
                                <label>Area</label>
                                <input
                                    type="text"
                                    id="area"
                                    {...register("Area", {
                                        required: { value: true, message: "Area is required" }
                                    })}
                                    className="form-control border border-dark"
                                />
                                {errors.Area && <p className="text-danger" id="areaErr">{errors.Area.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mt-3">
                                <label>City</label>
                                <input
                                    type="text"
                                    id="city"
                                    {...register("City", {
                                        required: { value: true, message: "City is required" }
                                    })}
                                    className="form-control border border-dark"
                                />
                                {errors.City && <p className="text-danger" id="cityErr">{errors.City.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mt-3">
                                <label>State</label>
                                <input
                                    type="text"
                                    id="state"
                                    {...register("State", {
                                        required: { value: true, message: "State is required" }
                                    })}
                                    className="form-control border border-dark"
                                />
                                {errors.State && <p className="text-danger" id="stateErr">{errors.State.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mt-3">
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    id="pinCode"
                                    {...register("PinCode", {
                                        required: { value: true, message: "Pincode is required" },
                                        pattern: { value: /^[0-9]{6}$/, message: "Pincode should not contain non digit characters" },
                                        maxLength: { value: 6, message: "For Pincode maximum 6 digit allowed" },
                                        minLength: { value: 6, message: "For Pincode maximum 6 digit allowed" }
                                    })}
                                    className="form-control border border-dark"
                                />
                                {errors.PinCode && <p className="text-danger" id="pinCodeErr">{errors.PinCode.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-grey w-50 btn-lg" id="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateUser