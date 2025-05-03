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

interface RoomFromApi {
  branch_id: number;
  building_id: number;
  no_room: string;
  quantity: number;
  id: number;
  type_id: number;
  max_quantity: number;
  active: boolean;
}

interface ApiResponse {
  user: User | null;
  facilities: Facility[];
}

interface OrderRoomResponse {
  msg: string;
  data: {
    id: number;
    date: string;
    end: string;
    is_cancel: boolean;
    room_id: number;
    user_id: number;
    begin: string;
    is_used: boolean;
  };
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
    const response = await api.get(`/api/v1/user/all_building1?branch_id=${branchId}`);
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

export const searchRooms = async (params: {
  building_id: number;
  branch_id: number;
  type_id: number;
  date_order: number;
  month_order: number;
  year_order: number;
  start_time: number;
  end_time: number;
  limitation?: number;
}): Promise<RoomFromApi[]> => {
  try {
    const response = await api.get('/api/v1/user/searchroom', { params });
    return response.data.data || [];
  } catch (error: any) {
    console.error('Error searching rooms:', error);
    throw error;
  }
};

export const orderRoom = async (params: {
  room_id: number;
  date: number;
  month: number;
  year: number;
  start_time: number;
  end_time: number;
}): Promise<OrderRoomResponse> => {
  try {
    const response = await api.post('/api/v1/user/orderroom', params);
    return response.data;
  } catch (error: any) {
    console.error('Error ordering room:', error.response?.data || error.message);
    throw error;
  }
};