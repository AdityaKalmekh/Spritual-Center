import { NextRequest, NextResponse } from "next/server.js";
import messageModel from "../../../../../../model/messageModel.ts";
import { getDevotees } from "../../../../../../lib/devotee.ts";

export async function GET(req: NextRequest, { params }: any) {
  const { userId } = params;
  console.log("user id", userId);

  try {
    const response = await messageModel.find({ UserId: userId });
    if (response) {
      const members = new Set();
      response.map((user: any) => {
        const roomName = user.Room;
        const memberName = roomName.replace(userId, "").trim();
        members.add(memberName);
      });
      const membersArr: any = Array.from(members);
      const devoteeArr = await getDevotees(membersArr);
      const filterMembersArr = membersArr.filter(
        (member: any) => member !== "community"
      );
      const filterDevotees: any = [];
      devoteeArr?.map((devotee: any) => {
        filterMembersArr?.map((member: any) => {
          if (devotee.DevoteeId === member) {
            const users = {
              user: `${devotee.FirstName} ${devotee.MidleName}`,
              id: member,
            };
            filterDevotees.push(users);
          } else if (member === "Admin") {
            const users = {
              user: member,
              id: member,
            };
            filterDevotees.push(users);
          }
        });
      });
      return NextResponse.json(filterDevotees);
      // return res.status(201).json(filterDevotees);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
