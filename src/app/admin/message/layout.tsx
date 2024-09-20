"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/SidebarMessage.tsx";
import Cookies from "js-cookie";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState();
  useEffect(() => {
    const Token = Cookies.get("Token");
    const { role, DevoteeId }: any = jwtDecode(Token);
    const data = {
      role,
      DevoteeId,
    };
    setUser(data);
  }, []);

  return (
    <section>
      <div className="container-fluid mt-5">
        <div className="row" style={{ height: "75vh" }}>
          <div className="col-md-3">
            <Sidebar user={user} />
          </div>
          <div className="col-md p-3 ml-4 card shadow" style={{height:"auto"}}>{children}</div>
        </div>
      </div>
    </section>
  );
}