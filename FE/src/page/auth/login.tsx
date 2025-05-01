// import { useAuth } from "../../AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import mockUsers from "./mockUsers";
// import React from "react";

// function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const foundUser = mockUsers.find(
//       (user) => user.email === email && user.password === password
//     );

//     if (foundUser?.role === "Admin") {
//       login(foundUser);
//       navigate("/dashboard");
//     } else if (foundUser) {
//       login(foundUser);
//       navigate("/");
//     } else {
//       alert("Sai email hoặc mật khẩu!");
//     }
//   };

//   return (
//     <div className="bg-[url('/src/assets/images/27257016.jpg')] bg-no-repeat bg-center bg-cover h-screen flex justify-end items-center">
//       <div className="hidden md:block md:w-2/3"></div>

//       <div className="bg-white w-full max-w-[500px] h-screen flex justify-center items-center">
//         <div className="w-[450px] text-center font-sans">
//           <h2 className="font-bold mb-5 mt-5 text-2xl text-blue-600">
//             Đăng nhập tài khoản
//           </h2>
//           <form onSubmit={handleLogin}>
//             <div className="text-left mb-2">Email:</div>
//             <div className="relative mb-4">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full  pl-12 pt-3 pb-3 border border-gray-300 rounded-lg text-black text-base"
//               />
//               <i className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base fa-solid fa-envelope"></i>
//             </div>
//             <div className="text-left mb-2">Mật khẩu:</div>
//             <div className="relative mb-4">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pt-3 pb-3 pl-12 border border-gray-300 rounded-lg text-black text-base"
//               />
//               <i className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base fa-solid fa-lock"></i>
//             </div>
//             <div className="flex flex-col gap-5">
//               <button className="button1 w-2/3 mx-auto" type="submit">
//                 Đăng nhập
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axiosConfig";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/api/v1/auth/login", {
        username: username,
        password: password,
      });

      console.log("API response:", JSON.stringify(response.data, null, 2));

      if (response.data.access_token && response.data.data) {
        const userData = response.data.data;
        const token = response.data.access_token;

        console.log("userData:", userData);
        console.log("token:", token);

        login(userData, token);

        console.log("Token in localStorage:", localStorage.getItem("token"));
        console.log("User in localStorage:", localStorage.getItem("user"));

        // Thêm delay nhỏ để đảm bảo token được lưu
        setTimeout(() => {
          if (userData.isAdmin) {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }, 100); // Delay 100ms
      } else {
        setError("Response thiếu access_token hoặc data");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.response?.data?.detail || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[url('/src/assets/images/27257016.jpg')] bg-no-repeat bg-center bg-cover h-screen flex justify-end items-center">
      <div className="hidden md:block md:w-2/3"></div>
      <div className="bg-white w-full max-w-[500px] h-screen flex justify-center items-center">
        <div className="w-[450px] text-center font-sans">
          <h2 className="font-bold mb-5 mt-5 text-2xl text-blue-600">
            Đăng nhập tài khoản
          </h2>

          <form onSubmit={handleLogin}>
            <div className="text-left mb-2">Email/MSSV:</div>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Email/MSSV"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pt-3 pb-3 border border-gray-300 rounded-lg text-black text-base"
              />
              <i className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base fa-solid fa-envelope"></i>
            </div>

            <div className="text-left mb-2">Mật khẩu:</div>
            <div className="relative mb-4">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pt-3 pb-3 pl-12 border border-gray-300 rounded-lg text-black text-base"
              />
              <i className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base fa-solid fa-lock"></i>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="flex flex-col gap-5">
              <button
                className="button1 w-2/3 mx-auto"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;