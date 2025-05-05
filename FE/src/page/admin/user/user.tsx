import Sidebar from "../components/sidebar";
import Header_admin from "../components/header_admin";
import { useState, useEffect } from "react";
import { FaSort, FaSearch } from "react-icons/fa";
import { useAuth } from "../../../AuthContext";
import api from "../../../api/axiosConfig";
import { changeUserStatus } from "../../../api/apiService";

interface User {
  id?: number;
  username: string;
  MSSV: number | null;
  lastname: string;
  firstname: string;
  email: string;
  isActive: boolean;
  fullName?: string;
  status?: string;
}

function User() {
  const { token } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/v1/admin/all_user', {
          params: { page: 1, limit: 100 },
          headers: { Authorization: `Bearer ${token}` },
        });
        const apiUsers = response.data.data;
        const filteredUsers = apiUsers
          .filter((user: User) => user.MSSV !== null)
          .map((user: User, index: number) => ({
            id: index + 1,
            username: user.username,
            MSSV: user.MSSV,
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            isActive: user.isActive,
            fullName: `${user.lastname} ${user.firstname}`,
            status: user.isActive ? "Hoạt động" : "Bị khóa",
          }));
        setUsersList(filteredUsers);
      } catch (err: any) {
        console.error("Error fetching users:", err);
        setError("Không thể tải danh sách người dùng. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleChangeUserStatus = async (username: string, isActive: boolean) => {
    try {
      console.log(`Calling changeUserStatus for ${username} with isActive: ${isActive}`);
      await changeUserStatus(username, isActive);
      // Cập nhật danh sách user sau khi API thành công
      setUsersList((prevUsers) =>
        prevUsers.map((user) =>
          user.username === username
            ? { ...user, isActive, status: isActive ? "Hoạt động" : "Bị khóa" }
            : user
        )
      );
      alert(`Đã ${isActive ? "mở khóa" : "xóa quyền"} user ${username} thành công!`);
    } catch (err: any) {
      console.error("Detailed error:", err);
      // Hiển thị lỗi chi tiết từ backend
      const errorDetail = err?.detail?.[0]?.msg || err?.message || "Lỗi không xác định";
      alert(`Lỗi: Không thể ${isActive ? "mở khóa" : "xóa quyền"} user ${username}. Chi tiết: ${errorDetail}`);
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedDevices = [...usersList].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const order = direction === "asc" ? 1 : -1;
    const valA = a[key as keyof typeof a] ?? "";
    const valB = b[key as keyof typeof b] ?? "";
    return (valA < valB ? -1 : valA > valB ? 1 : 0) * order;
  });

  const totalPages = Math.ceil(sortedDevices.length / entriesPerPage);
  const paginatedDevices = sortedDevices.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredUsers = usersList.filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setUsersList(filteredUsers);
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;

  return (
    <>
      <div className="flex min-h-screen">
        <div
          className={`bg-black_admin text-white_admin transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0"
            } overflow-hidden`}
        >
          <Sidebar />
        </div>

        <div className={`flex-1 flex flex-col min-h-screen overflow-auto transition-all duration-300 `}>
          <Header_admin onToggleSidebar={handleToggleSidebar} />
          <div className="pb-4 pl-8 pr-8 font-sans">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">Danh sách người dùng</h1>
              </div>

              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm"
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[330px] pl-12 pt-3 pb-3 border border-gray-300 rounded-full text-black text-base"
                  />
                  <i className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">
                    <FaSearch />
                  </i>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-grow pl-8 pr-8 justify-center items-start font-sans">
            <div className="flex flex-col md:flex-row gap-8 items-start font-sans w-full max-w-[1200px]">
              <div className="flex-grow flex flex-col">
                <div className="grid grid-cols-8 gap-4 p-4 h-16 text-sm font-semibold bg-[#F8FAFC] rounded-t-lg border border-gray-300 text-gray-600 items-center">
                  <div className="text-center">Tên ID</div>
                  <div
                    onClick={() => handleSort("fullName")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Họ và tên <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("MSSV")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Mã số sinh viên <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("email")}
                    className="cursor-pointer flex items-center justify-center col-span-2"
                  >
                    Địa chỉ email <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("status")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Trạng thái <FaSort className="ml-2" />
                  </div>
                  <div className="cursor-pointer flex items-center justify-center col-span-2">
                    Thao tác
                  </div>
                </div>

                <div className="pl-4 pr-4 bg-white rounded-b-lg shadow-md border border-gray-300 border-t-0">
                  {paginatedDevices.map((user) => (
                    <div
                      key={user.id}
                      className="grid grid-cols-8 gap-4 py-4 border-b last:border-b-0 items-center"
                    >
                      <div className="text-center font-medium"> {user.id}</div>
                      <div className="text-left">{user.fullName}</div>
                      <div className="text-center">{user.MSSV}</div>
                      <div className="text-center col-span-2">{user.email}</div>
                      <div className="text-center">
                        <button
                          className={`px-2 py-1 rounded-md text-sm font-medium`}
                          style={{
                            backgroundColor: user.status === "Hoạt động" ? "#E9FAEF" : "#FDEDF5",
                            color: user.status === "Hoạt động" ? "#24D164" : "#ED4F9D",
                            cursor: "not-allowed",
                            opacity: 0.7,
                          }}
                          disabled
                        >
                          {user.status}
                        </button>
                      </div>
                      <div className="flex justify-center items-center gap-2 col-span-2">
                        <button
                          className="button3"
                          style={{
                            padding: "8px 16px",
                            height: "40px",
                            width: "90px",
                            backgroundColor: "rgb(37, 99, 235)",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleChangeUserStatus(user.username, true)}
                        >
                          Mở khóa
                        </button>
                        <button
                          className="button3"
                          style={{
                            padding: "8px 16px",
                            height: "40px",
                            width: "90px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleChangeUserStatus(user.username, false)}
                        >
                          Xóa quyền
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-5 px-2 text-sm text-gray-600">
                  <div>
                    Show{" "}
                    {Math.min(
                      (currentPage - 1) * entriesPerPage + 1,
                      sortedDevices.length
                    )}{" "}
                    to {Math.min(currentPage * entriesPerPage, sortedDevices.length)}{" "}
                    of {sortedDevices.length} entries
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 border rounded-md ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white"
                        }`}
                    >
                      
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-white"
                        }`}
                    >
                      
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;