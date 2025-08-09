"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar/navbar";
import FiltersPanel from "../components/filtersPanel/filtersPanel";
import Sidebar from "../components/sidebar/sidebar";
import Block from "../components/block/block";
import Pagination from "../components/pagination/pagination";
import PrivateRoute from "../components/context/PrivateRoute";
import { toast, ToastContainer } from "react-toastify";

function ProtectedPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [pageSize] = useState(6);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  type Announcement = {
    id: number;
    name: string;
    number: string | null;
    location: string | null;
    info: string | null;
    type: "room" | "hotel" | "other";
    flavors: string[];
    images?: string[];
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/objects?page=${currentPage}&limit=${pageSize}`
        );
        if (!res.ok) throw new Error("Failed to load announcements");
        const data = await res.json();
        setAnnouncements(Array.isArray(data?.items) ? data.items : []);
        const total = data?.pagination?.total ?? 0;
        setTotalPages(Math.max(1, Math.ceil(total / pageSize)));
      } catch (err) {
        setAnnouncements([]);
        toast.error(String(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentPage, pageSize]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col xl:flex-row w-full gap-4 container">
        <div className="w-100% xl:w-[20%]">
          <FiltersPanel />
        </div>
        <div className="w-100% xl:w-[80%]">
          <Sidebar />
          <div className="pt-4 flex flex-col gap-4">
            {loading && <p className="text-gray-500">Loading…</p>}
            {!loading && announcements.length === 0 && (
              <p className="text-gray-500">No announcements yet</p>
            )}

            {!loading &&
              announcements.map((a) => (
                <Link href={`/object/${a.id}`} key={a.id}>
                  <Block
                    isDeletemode={false}
                    discription={a.info || ""}
                    title={a.name}
                    tags={a.flavors || []}
                    image={a.images?.[0]}
                    imgWidth="w-56"
                  />
                </Link>
              ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default function Page() {
  return (
    <PrivateRoute>
      <ProtectedPageContent />
    </PrivateRoute>
  );
}
