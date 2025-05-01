import Banner from "./banner";
import Description from "./description";
import Header from "../../user/component/header";
import Footer from "../../user/component/footer";
function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Description />
      <Footer />
    </>
  );
}

export default Home;

// import { useEffect, useState } from "react";
// import api from "../../../api/axiosConfig";

// function Home() {
//   interface User {
//     username: string;
//     email: string;
//   }

//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await api.get("/api/v1/user/me"); // Gọi API /api/v1/user/me
//         setUser(response.data.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   return (
//     <div>
//       <h1>Trang Chủ</h1>
//       {user && (
//         <div>
//           <p>Welcome, {user.username}</p>
//           <p>Email: {user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;