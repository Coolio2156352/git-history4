"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
// import { role, studentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type Student = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  status?: string;
  createdAt?: string;
};

const columns = [
  {
    header: "Name",
    accessor: "name",
    className: "text-center",
  },
  {
    header: "Email",
    accessor: "Email",
    className: "hidden md:table-cell text-center",
  },
  {
    header: "Created At",
    accessor: "grade",
    className: "hidden md:table-cell text-center",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden lg:table-cell text-center",
  },
  {
    header: "Action",
    accessor: "phone",
    className: "hidden lg:table-cell text-center",
  },
];

const MemberListPage = () => {
  const { user, loading, isAuthenticated, getAuthToken } = useAuth();
  const [teamMembers, setTeamMembers] = useState<Student[]>([]);
  const router = useRouter();

  const convertDateFormat = (date: any) => {
    const newdate = new Date(date);
    const formattedDate = newdate.toLocaleDateString("en-US");
    return formattedDate;
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/team/admin/member/all`,
          {
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          }
        );
        setTeamMembers(response.data?.members || []);
      } catch (error) {
        console.log("fetch members data failed=>", error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteMemberClick = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/team/admin/member/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      const message = response.data.message;
      alert(message);
      setTeamMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== id)
      );
    } catch (error) {
      console.log("delete member failed", error);
    }
  };

  const renderRow = (item: Student) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight text-center"
    >
      <td className="table-cell">
        {item.firstName} {item.lastName}
      </td>
      <td className="table-cell p-4">{item.email}</td>
      <td className="table-cell">{convertDateFormat(item.createdAt)}</td>
      <td className="table-cell">{item.status}</td>
      <td>
        <div className="flex items-center justify-center gap-2">
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <Image alt="" src="/view.png" width={16} height={16} />
          </button>
          {user?.role === "admin" && (
            <button
              onClick={() => handleDeleteMemberClick(item._id)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"
            >
              <Image alt="" src="/delete.png" width={16} height={16} />
            </button>
          )}
        </div>
      </td>
      {/* actions */}
      {/* <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image alt="" src="/view.png" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
              <Image alt="" src="/delete.png" width={16} height={16} />
            </button>
          )}
        </div>
      </td> */}
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Members</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            {user?.role === "admin" && (
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/plus.png" alt="" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={teamMembers} />
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default MemberListPage;
