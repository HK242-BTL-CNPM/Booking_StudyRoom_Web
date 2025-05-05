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

interface Order {
  id: number;
  date: string;
  end: string;
  is_cancel: boolean;
  room_id: number;
  user_id: number;
  begin: string;
  is_used: boolean;
}

interface GetAllOrderResponse {
  msg: string;
  data: Order[];
}

interface GetRoomResponse {
  msg: string;
  data: RoomFromApi;
  metadata: null;
}

interface CancelRoomResponse {
  msg: string;
  data: {
    user_id: number;
    order_id: number;
    date_cancel: string;
    id: number;
  };
}

interface RoomResponse {
  msg: string;
  data: RoomFromApi[];
  metadata: {
    page: number;
    perpage: number;
    total: number;
    total_page: number;
  };
}

interface CheckinResponse {
  msg: string;
  data: {
    id: number;
    room_id: number;
    user_id: number;
    date: string;
    checkin: string;
    checkout: string;
    order_id: number;
  };
}

interface CheckoutResponse {
  msg: string;
  data: {
    id: number;
    room_id: number;
    user_id: number;
    date: string;
    checkin: string;
    checkout: string;
    order_id: number;
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

export const fetchRoomById = async (roomId: number): Promise<RoomFromApi> => {
  try {
    const response = await api.get(`/api/v1/user/room1/${roomId}`);
    return response.data.data || {};
  } catch (error: any) {
    console.error(`Error fetching room with ID ${roomId}:`, error);
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

export const getAllOrders = async (): Promise<GetAllOrderResponse> => {
  try {
    const response = await api.get('/api/v1/user/getallorder');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching all orders:', error.response?.data || error.message);
    throw error;
  }
};

export const cancelRoom = async (orderId: number): Promise<CancelRoomResponse> => {
  try {
    const response = await api.post('/api/v1/user/cancelroom', { order_id: orderId });
    return response.data;
  } catch (error: any) {
    console.error('Error canceling room:', error.response?.data || error.message);
    throw error;
  }
};

export const checkinRoom = async (orderId: number): Promise<CheckinResponse> => {
  try {
    const response = await api.post('/api/v1/user/checkin2', { order_id: orderId });
    return response.data;
  } catch (error: any) {
    console.error('Error checking in room:', error.response?.data || error.message);
    throw error;
  }
};

export const checkoutRoom = async (): Promise<CheckoutResponse> => {
  try {
    const response = await api.post('/api/v1/user/checkout2');
    return response.data;
  } catch (error: any) {
    console.error('Error checking out room:', error.response?.data || error.message);
    throw error;
  }
};

export const changeUserStatus = async (username: string, isActive: boolean): Promise<any> => {
  try {
    console.log(`Sending request to /api/v1/admin/change_user_status/${username}?isActive=${isActive} with query params`);
    const response = await api.put(`/api/v1/admin/change_user_status/${username}`, null, {
      params: {
        isActive: isActive,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Response from server:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(`Error changing user status for ${username}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const getAllRooms = async (params: {
  branch_id?: number;
  building_id?: number;
  room_type_id?: number;
  page?: number;
  limit?: number;
}): Promise<RoomResponse> => {
  try {
    const response = await api.get('/api/v1/admin/all_room', { params });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching all rooms:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Thêm hàm gọi API getorrderbyfilter
export const getOrdersByFilter = async (params: {
  room_id?: number;
  year: number;
  date_start: number;
  date_end: number;
  month_start: number;
  month_end: number;
}): Promise<GetAllOrderResponse> => {
  try {
    const response = await api.get('/api/v1/admin/getorrderbyfilter', { params });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching orders by filter:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};