from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session
from math import ceil

from app.schemas.user import  UserOut_json 
from app.api.dependencies import SessionDep,get_current_user,CurrentUser,checkyear,checkmonth,checkday,checkhours
from app.schemas.user import  UserOut_json,Update_password, UpdateUser
from app.schemas.order import OrderIn, CancelIn,  responseorder, changetime,CheckIn1,CheckOut1,CheckIn2,CheckOut2,Report
from app.schemas.room import reponse
from app.model import User, OrderRoom, CancelRoom, UsedRoom, Room, Branch, Building, RoomType
from app.cores.security import create_access_token, verify_key
from datetime import datetime, date, time,timedelta

from app.crud.crud_user import change_user_info, change_user_pasword
from app.crud.crud_order import create_cancel_room, create_used_room, get_order_room, create_order_room,check_room_availability,get_all_order_rooms,update_order_room, update_state_order_room
from app.crud.crud_order import  update_used_room,check_overlapping_time_of_room_by_user, find_order_for_checkin,create_used_room, get_used_room_being_used_by_user_id, update_used_room, get_order_room,get_used_room_by_order_id

from app.crud.crud_room import filter_rooms, check_lib_available,get_room_type
from app.crud.crud_order import get_order_rooms_by_filter,checkin_library, checkout_library,get_cancel_room,get_order_room, get_used_room, get_cancel_room_by_user_id,get_cancel_room_by_order_id, get_used_room_being_used_by_user_id, get_used_room_by_order_id, get_used_room_by_user_id


from app.crud.crud_report_noti import create_report, get_report, get_reports, update_report, delete_report
from typing import List

from app.crud.crud_room import  get_all_branches
from app.crud.crud_room import get_buildings_by_branch
from app.crud.crud_room import get_room_type,get_all_rt
from app.crud.crud_room import get_room_type,get_all_rt
from app.crud.crud_room import create_room, get_room, update_room, delete_room, delete_room_device,filter_rooms


router = APIRouter()
# router.include_router(
#     router=APIRouter(),
#     dependencies=Depends(isUser),
# )
# ---- infor user ----
@router.get("/me", response_model=UserOut_json)
def read_users_me(current_user:CurrentUser ):
    return{
        "msg": "Get user successfully",
        "data": current_user
    }

@router.put("/update_infor", response_model=responseorder)
def update_user_info(data:UpdateUser , current_user: CurrentUser, session: SessionDep):
    print(    "data", data.lastname, data.firstname, data.email)
    user= current_user
    db_user = change_user_info(session,user.username, data.lastname, data.firstname, data.email)
    if not db_user:
        raise HTTPException(status_code=404, detail="Cannot update user")
    return {
        "msg": "Update user successfully",
        "data": db_user
    }
# @router.update("/user", response_model=responseorder)
# def update_user_info(data: , current_user: CurrentUser, session: SessionDep):

@router.put("/user/password", response_model=responseorder)
def update_user_password(data: Update_password, current_user: CurrentUser, session: SessionDep):
    db_user = change_user_pasword(session, current_user.username, data.new_password, data.old_password)
    if not db_user:
        raise HTTPException(status_code=404, detail="Cannot update password")
    return {
        "msg": "Update password successfully",
        "data": db_user
    }
#---- search room ----
@router.get("/all_room", response_model=reponse)
def get_all_room_data(session: SessionDep,
                     branch_id: int = Query(default=None),
                     building_id: int = Query(default=None), 
                     room_type_id: int = Query(default=None),
                     page: int = Query(default=1, ge=1, description="Page number (starting from 1)"),  # Thêm query param page
                     limit: int = Query(default=10, ge=0, le=100, description="Number of users per page")  # Thêm limit nếu cần
                     ):
    '''
    Get all rooms with optional filters.
    If want to get all rooms, limit =0
    Args:
        branch_id: ID of the branch to filter rooms (optional).
        building_id: ID of the building to filter rooms (optional).
        room_type_id: ID of the room type to filter rooms (optional).
    '''
    # print("branch_id", branch_id)
    # print("building_id", building_id)
    
    rooms =filter_rooms(session, 
                        branch_id=  branch_id,
                        building_id= building_id,
                        type_id= room_type_id,
                        page=page,
                        limit=limit
                        )
    # rooms = get_room(session, branch_id, building_id, room_type_id)


    
    return {
        "msg": "Get all rooms successfully",
        "data": rooms,
        "metadata": {
            "page": page,
            "perpage": limit,
            "total": len(rooms),
            "total_page": ceil(len(rooms) / limit) if limit > 0 else 1
        }
    }

@router.get("/searchroom", response_model=responseorder)
def filter_room(
    session: SessionDep,
    building_id: int = Query(...,ge=0, title="Building ID", description="ID of the building"),
    branch_id: int = Query(..., ge=0, title="Branch ID", description="ID of the branch"),
    type_id: int = Query(...,ge=0, title="Type ID", description="ID of the type"),
    date_order: int = Query(...,ge=1,le=31, title="Date", description="Date of the month"),
    month_order: int = Query(...,ge=1,le=12, title="Month", description="Month of the year"),
    year_order: int = Query(...,ge=2024, title="Year", description="Year"),
    start_time: int = Query(...,ge=7,le=20, title="Start time", description="Start time of the room"),
    end_time: int = Query(...,ge=7,le=20, title="End time", description="End time of the room"),
    limitation: int = Query(10, ge=1, le=20, title="Limit", description="Limit of the number of rooms")
    ):

    # Current datetime
    now = datetime.now()
    # Create a date object for order date
    order_date = date(year_order, month_order, date_order)
    # Create a time object for start time
    start = time(hour=start_time)

    # Combine date and time for start_order
    start_order = datetime(year_order, month_order, date_order, start_time)

    # Create a time object for end time
    end = time(hour=end_time)
    #Validate start and end times
    if start > end:
        raise HTTPException(status_code=400, detail="Start time must be before end time")

    # Check for past bookings
    if start_order < now:
        raise HTTPException(status_code=400, detail=f"{now}, {start_order} Cannot book in the past")

    # Check for bookings too close to now
    if now < start_order < now + timedelta(minutes=50):
        raise HTTPException(status_code=400, detail=f"{now}, {start_order} Your time is not valid")
    

    rooms= filter_rooms(session, branch_id=branch_id, building_id=building_id, type_id=type_id)
    if not rooms:
        raise HTTPException(status_code=404, detail="No rooms found")
    available_rooms = []

    for room in rooms:
        if check_room_availability(session, room.id, order_date, start, end):
            available_rooms.append(room)
            if len(available_rooms) >= limitation:
                break
    if not available_rooms:
        raise HTTPException(status_code=404, detail="No available rooms found")
    return {
        "msg": "Search room successfully",
        "data": available_rooms
    }
    
@router.get("/searchlibrary", response_model=responseorder)
def search_library(
    session: SessionDep,
    building_id: int = Query(...,ge=0, title="Building ID", description="ID of the building"),
    branch_id: int = Query(..., ge=0, title="Branch ID", description="ID of the branch"),
):
    '''
    Search all library room in branch and building
    '''
    
    type_id = get_room_type(session,type_id= None, room_type="Library")

    rooms= filter_rooms(session, branch_id=branch_id, building_id=building_id, type_id=type_id.id)
    if not rooms:
        raise HTTPException(status_code=404, detail="No library found")
    

    return {
        "msg": "Search library successfully",
        "data": rooms
    }


#---- post to create order, used, cancel
@router.post("/orderroom", response_model=responseorder)
def order_room(data: OrderIn, current_user: CurrentUser, session: SessionDep):
    user = current_user
    #check time is available orr not

    checkyear(data.year)
    checkmonth(data.month)
    checkday(data.date)
    checkhours(data.start_time)
    checkhours(data.end_time)


    time_start = datetime(data.year, data.month, data.date, data.start_time)
    time_end = datetime(data.year, data.month, data.date, data.end_time)

    if time_start > time_end:
        raise HTTPException(status_code=400, detail="Start time must be before end time")
    
    now = datetime.now()
    if time_start-now < timedelta(minutes=50):
        raise HTTPException(status_code=400, detail="You can only order a room 50 minutes in advance")
        
    #check room is available or not
    check_room = check_room_availability(session, data.room_id, date(data.year,data.month, data.date), time(data.start_time), time(data.end_time))
    if not check_room:
        raise HTTPException(status_code=404, detail="Room is not available")


    check_user = check_overlapping_time_of_room_by_user(session, user.id, data.room_id, date(data.year,data.month, data.date), time(data.start_time), time(data.end_time))
    if check_user:
        raise HTTPException(status_code=404, detail="You have already booked this room at this time")
    
    order_room = create_order_room( session, 
                                   room_id=data.room_id,
                                    user_id=user.id,
                                    date=date(data.year,data.month, data.date),
                                    begin=time(data.start_time),
                                    end=time(data.end_time))
    

    return{
        "msg": "Order room successfully",
        "data": order_room
    }


@router.put("/orderroom/{order_id}", response_model=responseorder)
def change_order(data: changetime, current_user: CurrentUser, session: SessionDep):

    ''' 
    Just change time of order room, not change room_id
    '''
    user = current_user

    #check time is available orr not
    checkyear(data.year)
    checkmonth(data.month)
    checkday(data.date)
    checkhours(data.start_time)
    checkhours(data.end_time)


    time_start = datetime(data.year, data.month, data.date, data.start_time)
    time_end = datetime(data.year, data.month, data.date, data.end_time)
    
    if time_start > time_end:
        raise HTTPException(status_code=400, detail="Start time must be before end time")
    
    now = datetime.now()
    if time_start-now < timedelta(minutes=50):
        raise HTTPException(status_code=400, detail="You can only order a room 50 minutes in advance")
        
    #check room is available or not
    check_room = check_room_availability(session, data.room_id, date(data.year,data.month, data.date), time(data.start_time), time(data.end_time))
    if not check_room:
        raise HTTPException(status_code=404, detail="Room is not available")


    check_user = check_overlapping_time_of_room_by_user(session, user.id, data.room_id, date(data.year,data.month, data.date), time(data.start_time), time(data.end_time))
    if check_user:
        raise HTTPException(status_code=404, detail="You have already booked this room at this time")
    
    order= update_order_room(session=session,
                             order_id=data.order_id, 
                             user_id=user.id, 
                             date=date(data.year,data.month, data.date), 
                             begin=time(data.start_time),
                             end=time(data.end_time))
    if not order:
        raise HTTPException(status_code=404, detail="Cannot change order")
    return{
        "msg": "Change order successfully",
        "data": order
    }


@router.post("/cancelroom", response_model=responseorder)
def cancel_room(data: CancelIn, current_user: CurrentUser, session: SessionDep):
    user = current_user
    order= get_order_room(session, data.order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Cannot find order")
    if order.is_used or order.is_cancel:
        raise HTTPException(status_code=404, detail="Cannot cancel order")
    if order.is_cancel:
        raise HTTPException(status_code=404, detail="You have already canceled this order")
    if order.user_id != user.id:
        raise HTTPException(status_code=404, detail="You are not the owner of this order")
    if order.is_used:
        raise HTTPException(status_code=404, detail="You have already checked in this room so you cannot cancel this order")
  # Lấy thời gian hiện tại
    now = datetime.now()
    
    # Kết hợp order.date và order.begin thành datetime
    try:
        order_time_end = datetime.combine(order.date, order.end)
    except (TypeError, ValueError):
        raise HTTPException(status_code=400, detail="Invalid order date or time")
    
    # Tính khoảng cách thời gian
    time_difference = now - order_time_end
    
    # Kiểm tra nếu khoảng cách thời gian lớn hơn 2 ngày
    if time_difference > timedelta(days=2):
        raise HTTPException(
            status_code=400,
            detail="Cannot cancel order after 2 days of the end time"
        )
    
    cancel = create_cancel_room(session, order_id=data.order_id, user_id=user.id,date_cancel=now)
    
    if not cancel:
        raise HTTPException(status_code=404, detail="Cannot cancel order")
    if not update_state_order_room(session, order_id=data.order_id, iscancel=True):
        raise HTTPException(status_code=404, detail="Cannot cancel order")
    return{
        "msg": "Cancel room successfully",
        "data": cancel
    }


@router.post("/checkin1", response_model=responseorder)
def check_in1(session: SessionDep, current_user: CurrentUser, data: CheckIn1):
    user= current_user
    order= find_order_for_checkin(session, data.room_id, user.id)
    if not order:
        raise HTTPException(status_code=404, detail="You check in too early| you have not ordered this room| You have checked in this room")
    


    used_room= create_used_room(session, order_id=order.id,
                                user_id=user.id,
                                room_id=data.room_id,
                                date_checkin=datetime.now().date(),
                                time_checkin=int(datetime.now().time()))
    
    if not used_room:
        raise HTTPException(status_code=404, detail="Cannot check in")
    
    if not update_state_order_room(session, order_id=order.id, isused=True):
        raise HTTPException(status_code=404, detail="Cannot check in")
    
    return{
        "msg": "Check in successfully",
        "data": used_room
    }

@router.post("/checkout1", response_model=responseorder)
def check_out1(session: SessionDep, current_user: CurrentUser, data: CheckOut1):
    user= current_user
    used_order= get_used_room_being_used_by_user_id(session, user.id)

    if used_order.room_id != data.room_id:
        raise HTTPException(status_code=404, detail="You check out wrong room")
    
    used_order= update_used_room(session, used_order.id, user.id, datetime.now().time())
   
    return {
        "msg": "Check out successfully",
        "data": used_order
    }
    
@router.post("/checkin2", response_model=responseorder)
def check_in2( current_user: CurrentUser,
              session: SessionDep,
              data: CheckIn2):
  
    user = current_user
    if not data.order_id:
       raise HTTPException(status_code=404, detail="Please enter order_id")
    order = get_order_room(session, data.order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Cannot find order")
    if order.is_used:
        raise HTTPException(status_code=404, detail="You have already checked in this room")
    if order.is_cancel:
        raise HTTPException(status_code=404, detail="You have already canceled this order")
    
    used_order= create_used_room(session, 
                                 order_id=data.order_id,
                                   user_id=user.id,
                                    room_id= order.room_id,
                                    date= datetime.now().date(),
                                    checkin=datetime.now().time())
 
    update_state_order_room(session=session,order_id=order.id, isused=True, iscancel=False)
    if not used_order:
        raise HTTPException(status_code=404, detail="Cannot check in")
    if not update_state_order_room(session, order_id=data.order_id, isused=True, iscancel=False):
        raise HTTPException(status_code=404, detail="Cannot check in")
    
    return {
        "msg": "Check in successfully",
        "data": used_order
    }

# @router.post("/checkout2", response_model=responseorder)
# def check_out2(current_user: CurrentUser,
#               session: SessionDep):
#     user = current_user
#     used_order= get_used_room_being_used_by_user_id(session, user.id)

#     if used_order is None:
#        raise HTTPException(status_code=404, detail="You have not checked in any room")
    
#     used_room =update_used_room(session, used_room_id=used_order.id, user_id=user.id, checkout=datetime.now().time())
#     if not used_room:
#         raise HTTPException(status_code=404, detail="Cannot check out")

#     return {
#         "msg": "Check out successfully",
#         "data": used_room
#     }
#thay đổi thuộc tính is_cancel thành true trong bảng OrderRoom
@router.post("/checkout2", response_model=responseorder)
def check_out2(current_user: CurrentUser, session: SessionDep):
    user = current_user
    used_order = get_used_room_being_used_by_user_id(session, user.id)

    if used_order is None:
        raise HTTPException(status_code=404, detail="You have not checked in any room")

    # Cập nhật thời gian checkout cho UsedRoom
    try:
        used_room = update_used_room(
            session,
            used_room_id=used_order.id,
            user_id=user.id,
            checkout=datetime.now().time(),
            checkout_date=datetime.now().date()
        )
        if not used_room:
            raise HTTPException(status_code=404, detail="Cannot check out")
    except Exception as e:
        print(f"Error in update_used_room: {str(e)}")  # Log lỗi
        raise HTTPException(status_code=500, detail=f"Failed to update used room: {str(e)}")

    # Cập nhật iscancel = true cho OrderRoom nếu có order_id
    if used_room.order_id:
        try:
            order = get_order_room(session, used_room.order_id)
            if not order:
                raise HTTPException(status_code=404, detail="Cannot find associated order")
            if not update_state_order_room(session, order_id=used_room.order_id, isused=order.is_used, iscancel=True):
                raise HTTPException(status_code=404, detail="Cannot update order status")
        except Exception as e:
            print(f"Error updating OrderRoom: {str(e)}")  # Log lỗi
            raise HTTPException(status_code=500, detail=f"Failed to update order status: {str(e)}")

    return {
        "msg": "Check out successfully",
        "data": used_room
    }

@router.post("/checkinlibrary", response_model=responseorder)
def checkinlibrary(session: SessionDep,current_user:CurrentUser, data: CheckIn1):    
    user= current_user
    if  not checkin_library(session, data.room_id):
        raise HTTPException(status_code=404, detail="Cannot check in library")
    
    used_room= create_used_room(session, 
                                room_id=data.room_id,
                                order_id=None,
                                user_id=user.id,
                                date=datetime.now().date(),
                                checkin=datetime.now().time())
    if not used_room:
        raise HTTPException(status_code=404, detail="Cannot check in")
    return {
        "msg": "Check in library successfully",
        "data": None
    }

@router.post("/checkoutlibrary", response_model=responseorder)
def checkoutlibrary(session: SessionDep,current_user: CurrentUser, data: CheckOut1):
    user= current_user
    used_order= get_used_room_being_used_by_user_id(session, user.id)

    if used_order.room_id != data.room_id:
        raise HTTPException(status_code=404, detail="You check out wrong room")
    
    if not checkout_library(session, data.room_id):
        raise HTTPException(status_code=404, detail="Cannot check out library")
    
    used_order= update_used_room(session, 
                                 used_room_id=used_order.id, 
                                 order_id=None,
                                    user_id=user.id,
                                     checkout=datetime.now().time())
    return {
        "msg": "Check out library successfully",
        "data": None
    }
    
# ----- get some thing
@router.get("/getallorder", response_model=responseorder)
def get_all_order_of_user(current_user: CurrentUser, session: SessionDep):
    user = current_user
    orders = get_all_order_rooms(session, user.id)
    if not orders:
        raise HTTPException(status_code=404, detail="Cannot find order")
    return {
        "msg": "Get all order successfully",
        "data": orders
    }
#------------------------sau khi bổ sung sort theo week, day, month
# def get_all_order_rooms(session: Session, userid: int) -> List[OrderRoom]:
#     """
#     Retrieve all OrderRoom entries.
    
#     Args:
#         session (Session): The database session.
    
#     Returns:
#         List[OrderRoom]: A list of all OrderRoom objects.
    
#     Raises:
#         HTTPException: If no OrderRooms are found.
#     """

#     order_rooms = session.exec(select(OrderRoom).where(OrderRoom.user_id == userid)).all()
#     if not order_rooms:
#         raise HTTPException(status_code=404, detail="No OrderRooms found")
#     return order_rooms


@router.get("/getorrderbyfilter", response_model=responseorder)
def get_order_by_filter(session: SessionDep,
                         current_user: CurrentUser,
                         year: int = Query(...,ge=2024, title="Year", description="Year"),
                         date_start: int = Query(...,ge=1,le=31, title="Start date", description="Start date of filter"),
                         date_end: int = Query(...,ge=1,le=31, title="End date", description="End date of filter"),
                            month_start: int = Query(...,ge=1,le=12, title="Month", description="Month of filter"),
                            month_end: int = Query(...,ge=1,le=12, title="Month", description="Month of filter")
                        ):
    user = current_user
    #check time is available orr not
    checkyear(year)
    checkmonth(month_start)
    checkmonth(month_end)
    checkday(date_start)
    checkday(date_end)

    orders= get_order_rooms_by_filter(session=session,
                                      user_id= user.id,
                                       year= year,
                                        month_start= month_start,
                                         date_start= date_start,
                                          month_end= month_end,
                                           date_end= date_end)
    if not orders:
        raise HTTPException(status_code=404, detail="Cannot find order")
    return {
        "msg": "Get order successfully",
        "data": orders
    }



@router.get("/getorder/{order_id}", response_model=responseorder)
def get_order(session: SessionDep, order_id: int):
    order = get_order_room(session, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Cannot find order")
    return {
        "msg": "Get order successfully",
        "data": order
    }

    
@router.get("/getallCancel", response_model=responseorder)
def get_all_cancel(session: SessionDep, current_user: CurrentUser):
    user = current_user
    cancels =get_cancel_room_by_user_id(session, user.id)
    if not cancels:
        raise HTTPException(status_code=404, detail="Cannot find order")
    return {
        "msg": "Get all cancel successfully",
        "data": cancels
    }


@router.get("/getallUsed", response_model=responseorder)
def get_all_used(session: SessionDep, current_user: CurrentUser):
    user = current_user
    used = get_used_room_by_user_id(session, user.id)
    if not used:
        raise HTTPException(status_code=404, detail="Cannot find any room has been used")
    return {
        "msg": "Get all used successfully",
        "data": used
    }

@router.get("/getcancel/{order_id}", response_model=responseorder)
def get_cancel(session: SessionDep, order_id: int):
    cancel = get_cancel_room_by_order_id(session, order_id)
    if not cancel:
        raise HTTPException(status_code=404, detail="Cannot find cancel")
    return {
        "msg": "Get cancel successfully",
        "data": cancel
    }

@router.get("/getused/{order_id}", response_model=responseorder)
def get_used(session: SessionDep, order_id: int):
    used = get_used_room_by_order_id(session, order_id)
    if not used:
        raise HTTPException(status_code=404, detail="Cannot find used")
    return {
        "msg": "Get used successfully",
        "data": used
    }


#----- report ----
@router.post("/report", response_model=responseorder)
def report(session: SessionDep, current_user: CurrentUser, data: Report):
    user = current_user
    used_order= get_used_room_being_used_by_user_id(session, user.id)

    report= create_report(session, 
                          used_room_id=used_order.id, 
                          user_id=user.id, 
                          room_id=used_order.room_id,
                          led=data.led,
                          air_conditioner=data.air_conditioner,
                          socket=data.socket,
                          projector=data.projector,
                          interactive_display=data.interactive_display,
                          online_meeting_devices=data.online_meeting_devices,
                          description=data.description)
    if not report:
        raise HTTPException(status_code=404, detail="Cannot report")
    return{
        "msg": "Report successfully",
        "data": None
    }

@router.get("/getreport/{report_id}", response_model=responseorder)
def get_report_by_id(session: SessionDep, report_id: int):
    report = get_report(session, report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Cannot find report")
    return {
        "msg": "Get report successfully",
        "data": report
    }

@router.get("/getallreport", response_model=responseorder)
def get_all_report(session: SessionDep, current_user: CurrentUser):
    user = current_user
    reports = get_reports(session, user.id)
    if not reports:
        raise HTTPException(status_code=404, detail="Cannot find report")
    return {
        "msg": "Get all report successfully",
        "data": reports
    }

#--- Notification----

@router.get("/getallnoti", response_model=responseorder)
def get_all_noti(session: SessionDep, current_user: CurrentUser):
    user = current_user
    notis = get_cancel_room_by_user_id(session, user.id)
    if not notis:
        raise HTTPException(status_code=404, detail="Cannot find notification")
    return {
        "msg": "Get all notification successfully",
        "data": notis
    }


# bổ sung user
@router.get("/all_branch", response_model=reponse)
def get_all_branch_data(session: SessionDep):
    '''
    Get all branches.

    '''
    branches = get_all_branches(session)
    if not branches:
        raise HTTPException(status_code=404, detail="No branch found")
    return {
        "msg": "Get all branches successfully",
        "data": branches
    }

@router.get("/all_building1", response_model=reponse)
def get_all_building_data(session: SessionDep, branch_id: int):
    '''
    Get all buildings by branch ID.

    Args:
        branch_id: ID of the branch to filter buildings.
    '''
    buildings = get_buildings_by_branch(session, branch_id, None)
    if not buildings:
        raise HTTPException(status_code=404, detail="No building found")
    return {
        "msg": "Get all buildings successfully",
        "data": buildings
    }


@router.get("/all_room_type", response_model=reponse)
def get_all_room_type(session: SessionDep):
    '''
    Get all room types.

    '''
    room_types = get_all_rt(session)
    if not room_types:
        raise HTTPException(status_code=404, detail="No room type found")
    return {
        "msg": "Get all room types successfully",
        "data": room_types
    }

@router.get("/room1/{room_id}", response_model=reponse)
def get_room_data(room_id: int, session: SessionDep):
    '''
    Get a room by ID.

    Args:
        room_id: ID of the room to retrieve.
    '''
    room = get_room(session, room_id, None)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return {
        "msg": "Get room successfully",
        "data": room
    }