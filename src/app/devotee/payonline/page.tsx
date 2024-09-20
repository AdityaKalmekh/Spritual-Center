'use client'

import { paymentHandler } from "../../actions.ts";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import PayOnline_interface from "../../../../interface/Payment.js";

const PayOnline = () => {
    const { setError, register, formState: { errors }, setValue} = useForm<PayOnline_interface>({ mode: "onBlur" });
    const devotieeId = useSelector((state:any) => state.devotees.devoteeId);
    setValue("DevoteeId",devotieeId);

    return (
        <>
            <div className="container w-50 mt-4 card shadow p-3">
                <form action={paymentHandler}>
                    <label htmlFor="year">Year</label>
                    <select className="form-control border border-dark" id="year" {...register("Year", {
                        required: { value: true, message: "Year is required" }
                    })}>
                        <option value="">Select Year</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                    {errors.Year && <p className="text-danger" id="yearErr">{errors.Year.message}</p>}
                    <br />
                    <label htmlFor="month">Month</label>
                    <select className="form-control border border-dark" id="month" {...register("Month", {
                        required: { value: true, message: "Month is required" }
                    })}>
                        <option value="">Select Month</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    {errors.Month && <p className="text-danger" id="monthErr">{errors.Month.message}</p>}
                    <br />
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        {...register("Amount", {
                            required: { value: true, message: "Amount is required" }
                        })}
                        className="form-control border border-dark"
                        onChange={(e) => {
                            const { value } = e.target
                            if (Number(value) < 100) {
                                setError("Amount", { message: "Amount should not be less than 100" })
                            }
                            else {
                                setError("Amount", { message: "" })
                            }
                        }}
                    />
                    {errors.Amount && <p className="text-danger" id="amountErr">{errors.Amount.message}</p>}
                    <br />
                    <input type="text" hidden {...register("DevoteeId")}/>
                    <div className="text-center">
                        <button className="btn btn-success w-25" id="submit">Make Donation</button>
                    </div>
                    <span className="text-center text-danger" id="invalidDate" style={{ display: "none" }}>Donation Date Should Be Greater Then Initiation Date</span>
                </form>
            </div>
        </>
    )
} 

export default PayOnline