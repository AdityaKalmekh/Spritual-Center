"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Sidebar = ({ user }: any) => {
  const [initialUsers, setInitialUsers] = useState<any>([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const router = useRouter();

  const getAllUser = async () => {
    const response = await fetch("/api/devotee/devoteeList", {
      cache: "no-store",
    });
    const resolveResponse = await response.json();
    setInitialUsers(resolveResponse);
  };

  const getChatUsers = async () => {
    const Token = Cookies.get("Token");
    const {Role, DevoteeId} : any = jwtDecode(Token);
    if (Role === "Admin") {
      const response = await fetch(`/api/message/getChatMembers/${Role}`, {
        method: "GET",
      });
      const resolveResponse = await response.json();      
      setMembers(resolveResponse);
    } else {
      const response = await fetch(`/api/message/getChatMembers/${DevoteeId}`);
      const resolveResponse = await response.json();
      setMembers(resolveResponse);
    }
  };
  
  useEffect(() => {
    getAllUser();
    getChatUsers();
  }, []);

  const usersHandler = (inp: any) => {
    if (inp !== "") {
      const userFilter = initialUsers.filter(
        (devotee: any) =>
          devotee.FirstName.toLowerCase().includes(inp.toLowerCase()) ||
          devotee.MidleName.toLowerCase().includes(inp.toLowerCase())
      );
      setCurrentUsers(userFilter);
    } else {
      setCurrentUsers([]);
    }
  };

  return (
    <>
      <div className="card shadow p-3">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => usersHandler(e.target.value)}
          className="form-control border border-dark rounded mb-2"
        />
        <div
          className="list-group"
          style={{ overflowY: "scroll", height: "70vh", maxHeight: "70vh" }}
        >
          <button
            className="list-group-item list-group-item-action"
            onClick={() =>
              router.push(`/${user.role?.toLowerCase()}/message/community`)
            }
          >
            Community
          </button>
          {currentUsers.map((iter: any) => (
            <button
              className="list-group-item list-group-item-action"
              onClick={() =>
                router.push(
                  `/${user.role?.toLowerCase()}/message/${iter.DevoteeId}`
                )
              }
            >
              {iter.FirstName}
            </button>
          ))}
          {currentUsers.length === 0 &&
            members.map((iter: any) => (
              <button
                className="list-group-item list-group-item-action"
                onClick={() => router.push(`/${user.role?.toLowerCase()}/message/${iter.id}`)}
              >
                {iter.user}
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
