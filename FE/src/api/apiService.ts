import api from './axiosConfig';

interface User {
  id: number;
  username: string;
  password: string;
  MSSV: number;
  lastname: string;
  firstname: string;
  email: string;
  isUser: boolean;
  isAdmin: boolean;
  isActive: boolean;
}

interface Facility {
  branch_name: string;
  id: number;
}

interface ApiResponse {
  user: User | null;
  facilities: Facility[];
}

export const fetchInitialData = async (): Promise<ApiResponse> => {
  try {
    // Gọi đồng thời các API bằng Promise.all
    const [userResponse, facilitiesResponse] = await Promise.all([
      api.get('/api/v1/user/me'), // Lấy thông tin user
      api.get('/api/v1/user/all_branch'), // Lấy danh sách cơ sở
    ]);

    // Xử lý dữ liệu
    const user = userResponse.data?.data || null;
    const facilities = Array.isArray(facilitiesResponse.data?.data) ? facilitiesResponse.data.data : [];

    return {
      user,
      facilities,
    };
  } catch (error: any) {
    console.error('Error fetching initial data:', error);
    throw error; // Ném lỗi để AuthContext xử lý
  }
};


// import api from './axiosConfig';

// interface User {
//   id: number;
//   username: string;
//   password: string;
//   MSSV: number;
//   lastname: string;
//   firstname: string;
//   email: string;
//   isUser: boolean;
//   isAdmin: boolean;
//   isActive: boolean;
// }

// interface Facility {
//   branch_name: string;
//   id: number;
// }

// interface Building {
//   id: number;
//   building_name: string;
//   branch_id: number;
// }

// interface ApiResponse {
//   user: User | null;
//   facilities: Facility[];
// }

// export const fetchInitialData = async (): Promise<ApiResponse> => {
//   try {
//     const [userResponse, facilitiesResponse] = await Promise.all([
//       api.get('/api/v1/user/me'),
//       api.get('/api/v1/user/all_branch'),
//     ]);

//     const user = userResponse.data || null;
//     const facilities = Array.isArray(facilitiesResponse.data.data) ? facilitiesResponse.data.data : [];

//     return {
//       user,
//       facilities,
//     };
//   } catch (error: any) {
//     console.error('Error fetching initial data:', error);
//     throw error;
//   }
// };

// export const fetchBuildings = async (branchId: number): Promise<Building[]> => {
//   try {
//     const response = await api.get(`/api/v1/user/all_building1?branch_id=${branchId}`);
//     const buildings = Array.isArray(response.data.data) ? response.data.data : [];
//     if (buildings.length === 0) {
//       console.warn(`No buildings found for branch_id ${branchId}`);
//     }
//     return buildings;
//   } catch (error: any) {
//     console.error(`Error fetching buildings for branch_id ${branchId}:`, error);
//     throw error;
//   }
// };