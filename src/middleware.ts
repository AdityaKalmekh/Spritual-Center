import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
    const jwtData = request.cookies.get("Token")?.value;
    const path = request.nextUrl.pathname;
    
    if (!jwtData && path === "/login" || path === "/api/login") {
        return NextResponse.next();
    }
    else {
        try {
            const { role, DevoteeId} : any = jwt.decode(jwtData);
            if (role === "Admin" && path.startsWith("/login")){
                return NextResponse.redirect(new URL("/admin/userlist", request.url));
            }
            else if (role === "Devotee" && path.startsWith("/login")){
                return NextResponse.redirect(new URL("/devotee/mypayments", request.url));
            }
            else if (role === "Admin" && path.startsWith("/admin")){
                return NextResponse.next();
            }
            else if (role === "Devotee" && path.startsWith("/devotee")){
                return NextResponse.next();
            }
            else if (path.startsWith("/api")){
                const response = NextResponse.next();
                if (role){
                    response.headers.set("userId",role);
                }else{
                    response.headers.set("userId",DevoteeId);
                }
                response.headers.set("devoteeId",DevoteeId);
                return response;
            }
            else {
                return NextResponse.redirect(new URL("/unauthorized", request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
}

export const config = {
    matcher: [
        "/login",
        "/admin/:path*",
        "/devotee/:path*",
        "/api/:path*"
    ],
};