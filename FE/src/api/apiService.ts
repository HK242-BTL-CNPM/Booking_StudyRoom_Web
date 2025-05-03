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

interface Building {
  id: number;
  building_name: string;
  branch_id: number;
}

interface RoomType {
  id: number;
  type_name: string;
  max_capacity: number | null;
}

interface ApiResponse {
  user: User | null;
  facilities: Facility[];
}

export const fetchInitialData = async (): Promise<ApiResponse> => {
  try {
    const [userResponse, facilitiesResponse] = await Promise.all([
      api.get('/api/v1/user/me'),
      api.get('/api/v1/user/all_branch'),
    ]);

    const user = userResponse.data?.data || null;
    const facilities = Array.isArray(facilitiesResponse.data?.data) ? facilitiesResponse.data.data : [];

    return {
      user,
      facilities,
    };
  } catch (error: any) {
    console.error('Error fetching initial data:', error);
    throw error;
  }
};

export const fetchBuildings = async (branchId: number): Promise<Building[]> => {
  try {
    const response = await api.get(`/api/v1/user/all_building1?branch_id=${branchId}`); // Sửa endpoint thành đúng giá trị
    return response.data.data || [];
  } catch (error: any) {
    console.error(`Error fetching buildings for branch_id ${branchId}:`, error);
    throw error;
  }
};

export const fetchRoomTypes = async (): Promise<RoomType[]> => {
  try {
    const response = await api.get('/api/v1/user/all_room_type');
    return response.data.data || [];
  } catch (error: any) {
    console.error('Error fetching room types:', error);
    throw error;
  }
};