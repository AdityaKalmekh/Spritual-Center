'use client'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation.js";
const AdminNav = ({ children, }: {
    children: React.ReactNode
}) => {
    const route = useRouter();
    
    return (
        <>
            <section>
                <div>
                    <div>
                        <nav className='navbar navbar-expand-lg navbar-light' style={{ backgroundColor: "#F5F5F5" }}>
                            <div className='container-fluid'>
                                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
                                    <span className='navbar-toggler-icon'></span>
                                </button>
                                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                                    <ul className='navbar-nav me-auto'>
                                        <li className='nav-item mr-2 my-1'>
                                            <button className="btn me-2 btn-grey" id="devoteeList" onClick={() => route.push("/admin/userlist")}>User List</button>
                                        </li>
                                        <li className='nav-item mr-2 my-1'>
                                            <button className="btn btn-grey me-2" id="userCreateBtn" onClick={() => route.push("/admin/createuser")}>User Create</button>
                                        </li>
                                        <li className='nav-item mr-2 my-1'>
                                            <button className="btn btn-grey me-2" id="donationBtn" onClick={() => route.push("/admin/donation")}>Donation</button>
                                        </li>
                                        <li className='nav-item mr-2 my-1'>
                                            <button className="btn btn-grey me-2" id="donationBtn" onClick={() => route.push("/admin/message")}>Message</button>
                                        </li>
                                        <li className='nav-item mr-2 my-1'>
                                            <button className="btn btn-grey" id="logoutBtn" onClick={() => { Cookies.remove("Token"); route.push("/login") }}>Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                {children}
            </section>
        </>
    )
}

export default AdminNav