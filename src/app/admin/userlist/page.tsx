'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../../../lib/features/userslice.tsx";

const UserList = () => {
    const dispatch = useDispatch();
    const [searchState, setSearchState] = useState('');
    let devoteeList = useSelector((state: any) => state.devotee.users);
    const [filterDevotee, setfilterDevotee]: any = useState([]);
    
    async function fetchData() {
        const response = await fetch("/api/devotee/devoteeList", {
            cache: "no-store"
        });
        const resolveResponse = await response.json();
        dispatch(userAction.addUsers(resolveResponse));
    }

    useEffect(() => {
        fetchData();
    }, [])

    const deleteHandler = async (devoteeId: string) => {
        const response = await fetch("/api/devotee/devoteeList", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ "id": devoteeId })
        })
        if (response.status === 200) {
            dispatch(userAction.deleteUser(devoteeId));
        }
    }

    const searchHandler = () => {
        if (searchState != "") {
            const filter = devoteeList.filter((dv: any) => dv.Role === "Devotee" ? dv.DevoteeId.toLowerCase().includes(searchState.trim().toLowerCase()) || dv.Area.toLowerCase().includes(searchState.trim().toLowerCase()) : "");
            setfilterDevotee(filter);
        }
        else {
            setfilterDevotee([]);
        }
    }

    const sortByAsc = () => {
        const tempStor = filterDevotee.length > 0 ? [...filterDevotee] : [...devoteeList];
        const asc = tempStor.sort((a: any, b: any) => {
            if (a.FirstName.toUpperCase() < b.FirstName.toUpperCase()) {
                return -1;
            } if (a.FirstName.toUpperCase() < b.FirstName.toUpperCase()) {
                return 1
            }
            return 0
        })
        setfilterDevotee(asc);
    }

    const sortByDesc = () => {
        const tempStor = filterDevotee.length > 0 ? [...filterDevotee] : [...devoteeList];
        const desc = tempStor.sort((a: any, b: any) => {
            if (a.FirstName.toUpperCase() > b.FirstName.toUpperCase()) {
                return -1;
            } if (a.FirstName.toUpperCase() > b.FirstName.toUpperCase()) {
                return 1;
            }
            return 0
        })
        setfilterDevotee(desc);
    }


    return (
        <>
            <div className="container-fluid">
                <div className="container mt-4 d-flex justify-content center">
                    <button id="sortByAsc" className="btn btn-warning mr-2" onClick={() => sortByAsc()}>Sort by Asc</button>
                    <button id="sortByDesc" className="btn btn-warning" onClick={() => sortByDesc()}>Sort by Desc</button>

                    <input
                        id="searchInput"
                        type="text"
                        className="form control border border-dark ml-5"
                        onChange={(e) => setSearchState(e.target.value)}
                    />
                    <button
                        id="searchBtn"
                        className="btn btn-success ml-2"
                        onClick={() => searchHandler()}
                    >search</button>
                </div>
                <PaginatedItems deleteHandler={deleteHandler} itemsPerPage={2} items={filterDevotee.length > 0 ? filterDevotee : devoteeList} />
            </div>
        </>
    )
}


function PaginatedItems({ deleteHandler, itemsPerPage, items }: { deleteHandler: any, itemsPerPage: number, items: any }) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    const previousBtn = () => <button className="btn">Previous</button>

    const nextBtn = () => <button className="btn">Next</button>;


    return (
        <>
            <Items deleteHandler={deleteHandler} currentItems={currentItems} />
            <div className="d-flex justify-content-center mt-3">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={nextBtn()}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel={previousBtn()}
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item previous"
                    nextClassName="page-item next"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    activeClassName="active"
                    disabledClassName="disabled"
                />
            </div>
        </>
    );
}


function Items({ deleteHandler, currentItems }: { deleteHandler: any, currentItems: any }) {
    const route = useRouter();
    const dispatch = useDispatch();
    const dateFormation = (initiationDt: string) => {
        const dt = new Date(initiationDt);
        const formatedInitionationDt = `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`
        return formatedInitionationDt
    }
    return (
        <>
            <div className="container-fluid mt-4 table-responsive">
                <table className="table table-striped table-bordered" id="devoteeList">
                    <thead className="table-header">
                        <tr className="text-center">
                            <th>DevoteeId</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>EmailId</th>
                            <th>Flat No</th>
                            <th>Area</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Pincode</th>
                            <th>Initiation Date</th>
                            <th>Profile</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((iter: any) => (
                                iter.Role !== 'Admin' && (
                                    <tr key={iter.DevoteeId}>
                                        <td>{iter.DevoteeId}</td>
                                        <td>{iter.FirstName}</td>
                                        <td>{iter.MidleName}</td>
                                        <td>{iter.LastName}</td>
                                        <td>{iter.EmailID}</td>
                                        <td>{iter.FlatNumber}</td>
                                        <td>{iter.Area}</td>
                                        <td>{iter.City}</td>
                                        <td>{iter.State}</td>
                                        <td>{iter.PinCode}</td>
                                        <td className="text-center">{dateFormation(iter.InitiationDate)}</td>
                                        <td>
                                            <img src={iter.ProfilePic} className="rounded mx-auto d-block" alt="Profile Pic" height="50" width="50" />
                                        </td>
                                        <td>
                                            <button className="btn btn-dark mb-2" id={`editBtn-${iter.DevotieeId}`} onClick={() => { dispatch(userAction.editUser(iter)); route.push("/admin/edituser") }}>Edit</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger mb-2" id={`deleteBtn-${iter.DevotieeId}`} onClick={() => deleteHandler(iter._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserList