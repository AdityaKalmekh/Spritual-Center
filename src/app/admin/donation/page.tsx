'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DevoteeAction } from "../../../../lib/features/DevoteeSlice.tsx";

const Donation = () => {
    const dispatch = useDispatch();
    const donation = useSelector((state:any) => state.devotees.donation);
    const unpaidList = useSelector((state:any) => state.devotees.unpaidDonation)
    const [handler,setHandler] = useState(true);

    const getDonation = async() => {
        const response = await fetch("/api/payment/donation");
        const resolveResponse = await response.json();
        console.log(resolveResponse);
        dispatch(DevoteeAction.setDonation(resolveResponse));
    } 

    const getUnpaidDonation = async() => {
        const response = await fetch("/api/payment/unpaidDonation");
        const resolveResponse = await response.json();
        console.log(resolveResponse);
        dispatch(DevoteeAction.setUnpaidDonation(resolveResponse));
    }

    useEffect(() => {
        getDonation();
        getUnpaidDonation();
    },[])


    return (
        <>
        <select id="donationMenu" className="form-control border border-dark w-25 m-3" onChange={() => setHandler(!handler)}>
                <option value="allPayments">All Payments</option>
                <option value="unpaid">Unpaid Donation</option>
            </select>
            <div className="container-fluid mt-3 table-responsive">
                {handler ?
                    (

                        <table id="allPaymentList" className="table table-striped table-bordered">
                            <thead className="table-header">
                                <th>DevotieeId</th>
                                <th>Year</th>
                                <th>Month</th>
                                <th>Total Amount</th>
                            </thead>
                            <tbody>
                                {
                                    donation.map((iter: any, idx: number) => (
                                        <tr id={`payment-${idx}`}>
                                            <td>{iter._id.devotieeId}</td>
                                            <td>{iter._id.year}</td>
                                            <td>{iter._id.month}</td>
                                            <td>{iter.totalDonation}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                    :
                    <table id="allUnpaidList" className="table table-striped table-bordered">
                        <thead className="table-header">
                            <th scope="col">DevoteeId</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Middle Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">EmailId</th>
                            <th scope="col">Flat No</th>
                            <th scope="col">Area</th>
                            <th scope="col">Pincode</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Initiation Date</th>
                        </thead>
                        <tbody>
                            {
                                unpaidList.map((iter: any) => (
                                    <tr id={`${iter.DevoteeId}`}>
                                        <td>{iter.dt[0].DevoteeId}</td>
                                        <td>{iter.dt[0].FirstName}</td>
                                        <td>{iter.dt[0].MidleName}</td>
                                        <td>{iter.dt[0].LastName}</td>
                                        <td>{iter.dt[0].EmailID}</td>
                                        <td>{iter.dt[0].FlatNumber}</td>
                                        <td>{iter.dt[0].Area}</td>
                                        <td>{iter.dt[0].PinCode}</td>
                                        <td>{iter.dt[0].City}</td>
                                        <td>{iter.dt[0].State}</td>
                                        <td>{iter.dt[0].InitiationDate}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </div>
        </>
    )
}

export default Donation