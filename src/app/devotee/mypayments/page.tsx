'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DevoteeAction } from "../../../../lib/features/DevoteeSlice.tsx"

const MyPayments = () => {
    const devoteeId = useSelector((state: any) => state.devotees.devoteeId);
    const payments = useSelector((state: any) => state.devotees.payments);
    const dispatch = useDispatch();

    async function fetchData() {
        const response = await fetch(`/api/payment/mypayments`);
        const resolveResponse = await response.json();
        dispatch(DevoteeAction.setPayment(resolveResponse));
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className="container-fluid mt-3 table-responsive">
                <table className="table table-bordered" id="allMyPaymentList">
                    <tr>
                        <td>DevotieeId</td>
                        <td>Year</td>
                        <td>Month</td>
                        <td>Amount</td>
                    </tr>
                    <tbody>
                        {
                            payments.map((key: any, value: any) => (
                                <>
                                    <tr id={`payment-${value}`} className={parseInt(key.totalDonation) > 10000 ? "bg-green" : ""}>
                                        <td>{key._id.devotieeId}</td>
                                        <td>{key._id.year}</td>
                                        <td>{key._id.month}</td>
                                        <td>{key.totalDonation}</td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MyPayments