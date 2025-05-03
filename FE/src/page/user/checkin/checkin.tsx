import Header from "../component/header";
import Footer from "../component/footer";
import { useState } from "react";
import { rooms } from "./const_checkin";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Room = (typeof rooms)[number];

function Checkin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(3);

  const [roomList, setRoomList] = useState(rooms);
  const [checkoutList, setCheckoutList] = useState<Room[]>([]);
  const [showMessageDel, setShowMessageDel] = useState(false);

  const navigate = useNavigate();

  const sortedRooms = roomList;

  const totalPages = Math.ceil(sortedRooms.length / entriesPerPage);
  const paginatedRooms = sortedRooms.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleDelete = (roomId: number) => {
    const updatedRooms = roomList.filter((room) => room.id !== roomId);
    setRoomList(updatedRooms);
    setShowMessageDel(true);
    setTimeout(() => setShowMessageDel(false), 2000);
  };

  const handleCheckin = (roomId: number) => {
    const roomToCheckin = roomList.find((room) => room.id === roomId);
    if (roomToCheckin) {
      setCheckoutList([...checkoutList, roomToCheckin]);
      setRoomList(roomList.filter((room) => room.id !== roomId));
    }
  };

  const TableHeader = () => (
    <div className="hidden md:grid grid-cols-7 gap-4 p-4 h-16 text-sm font-semibold bg-[#F8FAFC] rounded-t-lg border border-gray-300 text-gray-600 items-center">
      {[
        "Loại phòng",
        "Cơ sở",
        "Tòa",
        "Số phòng",
        "Thời gian đặt",
        "Ngày đặt",
        "Thao tác",
      ].map((title, i) => (
        <div key={i} className="flex items-center justify-center">
          {title}
        </div>
      ))}
    </div>
  );

  const TableRow = ({
    room,
    onCheckin,
    onDelete,
    isCheckout = false,
  }: {
    room: Room;
    onCheckin?: (id: number) => void;
    onDelete: (id: number) => void;
    isCheckout?: boolean;
  }) => (
    <div className="grid grid-cols-2 md:grid-cols-7 gap-4 py-4 px-4 border-b last:border-b-0 items-center">
      <div className="text-center">{room.roomType}</div>
      <div className="text-center">{room.cs}</div>
      <div className="text-center">{room.toa}</div>
      <div className="text-center">{room.roomNumber}</div>
      <div className="text-center">{room.time}</div>
      <div className="text-center">{room.date}</div>
      <div className="flex justify-center items-center gap-2 col-span-2 md:col-span-1">
        {!isCheckout && onCheckin && (
          <button
            onClick={() => onCheckin(room.id)}
            className="button3"
            style={{
              padding: "8px 16px",
              height: "40px",
              width: "80px",
              backgroundColor: "rgb(37, 99, 235)",
              color: "white",
            }}
          >
            Checkin
          </button>
        )}
        <button
          onClick={() => onDelete(room.id)}
          className="button3"
          style={{
            padding: "8px 16px",
            height: "40px",
            width: "80px",
            backgroundColor: "#DC2626",
            color: "white",
          }}
        >
          {isCheckout ? "Checkout" : "Xóa"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 px-4 md:px-8 py-4">
          <section className="max-w-7xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Checkin</h1>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <TableHeader />
              <div className="px-4 md:px-0">
                {paginatedRooms.length ? (
                  paginatedRooms.map((room) => (
                    <TableRow
                      key={room.id}
                      room={room}
                      onCheckin={handleCheckin}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Không có dữ liệu
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-5 px-2 text-sm text-gray-600">
              <div>
                Show{" "}
                {Math.min(
                  (currentPage - 1) * entriesPerPage + 1,
                  sortedRooms.length
                )}{" "}
                to {Math.min(currentPage * entriesPerPage, sortedRooms.length)}{" "}
                of {sortedRooms.length} entries
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: currentPage === 1 ? "#f1f1f1" : "#fff",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    style={{
                      padding: "5px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      backgroundColor:
                        currentPage === index + 1 ? "#2563EB" : "#fff",
                      color: currentPage === index + 1 ? "#fff" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor:
                      currentPage === totalPages ? "#f1f1f1" : "#fff",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  &gt;
                </button>
              </div>
              <div>
                Show
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-1 py-0.5 mx-1 border border-gray-300 rounded-md"
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
                entries
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto mt-10">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Checkout</h1>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <TableHeader />
              <div className="px-4 md:px-0">
                {checkoutList.length ? (
                  checkoutList.map((room) => (
                    <TableRow
                      key={room.id}
                      room={room}
                      isCheckout
                      onDelete={(id) => {
                        setCheckoutList(
                          checkoutList.filter((r) => r.id !== id)
                        );
                        navigate("/report"); // <-- thay bằng route đúng nếu khác
                      }}
                    />
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Chưa có phòng nào được checkin
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>

      <AnimatePresence>
        {showMessageDel && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded shadow z-50"
          >
            Đã xoá phòng thành công 🗑️
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default Checkin;
