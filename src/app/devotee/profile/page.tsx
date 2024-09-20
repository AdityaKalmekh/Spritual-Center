'use client'

import { useEffect, useState } from "react";

const Profile = () => {
    const [user, setUser] = useState<any>();

    const fetchData = async() => {
        const response = await fetch(`/api/devotee/profile`);
        const resolveResponse = await response.json();
        setUser(resolveResponse);
    }

    const dateFormation = (initiationDt: string) => {
        const dt = new Date(initiationDt);
        const formatedInitionationDt = `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`
        return formatedInitionationDt
    }
    
    useEffect(() => {
        fetchData()
    },[])

    return (
        <>
            {
                user && <div className="container mt-4">
                    <div className="card">
                        <div className="text-center my-2 ">
                            <img className="rounded-circle img-thumbnail" style={{ width: "150px", height: "150px" }} src={user.ProfilePic} alt="User Profile" />
                        </div>
                        <div className="card-body" id="body">
                            <div className="row" style={{ marginLeft: "200px" }}>
                                <div className="col">
                                    <p className="card-text"><strong>DevotieeId :</strong> {user.DevoteeId}</p>
                                    <p className="card-text"><strong>FullName : </strong> {user.FirstName} {user.MidleName} {user.LastName}</p>
                                    <p className="card-text"><strong>EmailId :</strong> {user.EmailID}</p>
                                    <p className="card-text"><strong>State :</strong> {user.State}</p>
                                </div>
                                <div className="col">
                                    <p className="card-text"><strong>City :</strong> {user.City}</p>
                                    <p className="card-text"><strong>Area :</strong> {user.Area}</p>
                                    <p className="card-text"><strong>FlatNumber :</strong> {user.FlatNumber}</p>
                                    <p className="card-text"><strong>InitiationDate :</strong> {dateFormation(user.InitiationDate)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Profile