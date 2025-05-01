# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlmodel import Session
# from app.schemas.user import UserIn, UserOut, Token, UserOut_json, Token_json, Register_In
# from app.schemas.admin import AdminIn
# from app.crud.crud_user import create_user, authenticate_user,register_user
# #from app.schemas.metadata import Metadata
# from app.api.dependencies import SessionDep,get_current_user,CurrentUser,isUser
# from sqlmodel import select
# from app.model import User
# from app.cores.security import create_access_token, verify_key

# router = APIRouter(
#     prefix="/api/v1/auth",  # Thêm prefix
#     tags=["auth"]
# )

# # @router.get("/me", response_model=UserOut_json)
# # def read_users_me(current_user:CurrentUser ):
# #     return{
# #         "message": "Get user successfu ly",
# #         "data": current_user
# #     }


# # @router.post("/login", response_model=Token_json)
# # def login(data: UserIn, session: SessionDep):
# #     user = authenticate_user(session, data.username, data.password)
# #     if not user:
# #         user= create_user(session, data)
# #         if not user:
# #             raise HTTPException(status_code=400, detail="Incorrect username or password")
        
# #         #     return {
# #         #     "status": 400,
# #         #     "message": "Your mail or password is incorrect",
# #         #     "data": None
# #         # }
    
# #     access_token = create_access_token (
# #         data= { "sub": user.username,
# #                 "isuser": user.isUser,
# #                 "isadmin": user.isAdmin,
# #                 "isactive": user.isActive
# #               }
# #         )

# #     return {
# #         "msg": "login successfully",
# #         "access_token": access_token
# #     }

# @router.post("/login", response_model=Token_json)
# def login(data: UserIn, session: SessionDep):
#     try:
#         print(f"Login attempt for username: {data.username}")
        
#         user = authenticate_user(session, data.username, data.password)
#         print(f"Authentication result: {user}")
        
#         if not user:
#             raise HTTPException(status_code=400, detail="Incorrect username or password")
        
#         access_token = create_access_token(
#             data={
#                 "sub": user.username,
#                 "isuser": user.isUser,
#                 "isadmin": user.isAdmin,  
#                 "isactive": user.isActive
#             }
#         )
#         print(f"Token generated successfully for user: {user.username}")

#         return {
#             "msg": "login successfully",
#             "access_token": access_token,
#             "data": user
#         }
#     except Exception as e:
#         print(f"Login error: {str(e)}")
#         import traceback
#         print(f"Traceback: {traceback.format_exc()}")
#         raise HTTPException(status_code=500, detail=str(e))

# @router.post("/register", response_model=UserOut_json)
# def register(data: Register_In, session: SessionDep):
#     user = authenticate_user(session, data.username, data.password)
#     if user:
#         raise HTTPException(status_code=400, detail="Username already exists")
#         return {
#             "message": "User already exists",
#             "data": None
#         }
#     db_user = register_user(session, data)
#     if not db_user:
#         raise HTTPException(status_code=400, detail="register failed")
    
#     return {
#         "msg": "Register successfully",
#         "data": None
#     }


# @router.post("/register_admin", response_model=UserOut_json)
# def register_admin(data: AdminIn , session: SessionDep):
#     user = authenticate_user(session, data.username, data.password)
#     if user:
#         raise HTTPException(status_code=400, detail="Username already exists")
#         # return {
#         #     "message": "Username already exists",
#         #     "data": None
#         # }
#     if verify_key(data.key) == False:
#         raise HTTPException(status_code=400, detail="Key is incorrect")
#         # return {
#         #     "message": "Key is incorrect",
#         #     "data": None
#         # }
#     db_user = register_user(session, data, isAdmin=True)
#     if not db_user:
#         raise HTTPException(status_code=400, detail="Incorrect username or password")
    
#     return {
#         "msg": "Register successfully",
#         "data": None
#     }


from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.schemas.user import UserIn, UserOut, Token, UserOut_json, Token_json, Register_In
from app.schemas.admin import AdminIn
from app.crud.crud_user import create_user, authenticate_user, register_user
from app.api.dependencies import SessionDep, get_current_user, CurrentUser, isUser
from sqlmodel import select
from app.model import User
from app.cores.security import create_access_token, verify_key
import logging

# Cấu hình logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/login", response_model=Token_json)
def login(data: UserIn, session: SessionDep):
    try:
        logger.debug(f"Login attempt for username: {data.username}")
        
        user = authenticate_user(session, data.username, data.password)
        logger.debug(f"Authentication result: {user}")
        
        if not user:
            # Trong file cũ, nếu user không tồn tại, gọi create_user
            user = create_user(session, data)
            if not user:
                logger.warning(f"Authentication failed for username: {data.username}")
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Incorrect username or password"
                )
        
        if not user.isActive:
            logger.warning(f"Inactive user attempted login: {data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User account is inactive"
            )
        
        access_token = create_access_token(
            data={
                "sub": user.username,
                "isuser": user.isUser,
                "isadmin": user.isAdmin,
                "isactive": user.isActive
            }
        )
        logger.info(f"Token generated successfully for user: {user.username}")

        return {
            "msg": "Login successfully",
            "access_token": access_token,
            "data": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "isUser": user.isUser,
                "isAdmin": user.isAdmin,
                "isActive": user.isActive,
                # Các trường sau không bắt buộc trong schema UserOut
                "password": None,
                "MSSV": None,
                "lastname": None,
                "firstname": None
            }
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Login error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )

@router.post("/register", response_model=UserOut_json)
def register(data: Register_In, session: SessionDep):
    try:
        logger.debug(f"Register attempt for username: {data.username}")
        
        existing_user = authenticate_user(session, data.username, data.password)
        if existing_user:
            logger.warning(f"Registration failed - username already exists: {data.username}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already exists"
            )
        
        db_user = register_user(session, data)
        if not db_user:
            logger.error(f"Registration failed for username: {data.username}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Registration failed"
            )
        
        logger.info(f"User registered successfully: {data.username}")
        return {
            "msg": "Register successfully",
            "data": {
                "id": db_user.id,
                "username": db_user.username,
                "email": db_user.email,
                # Các trường sau không bắt buộc trong schema UserOut
                "password": None,
                "MSSV": None,
                "lastname": None,
                "firstname": None
            }
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Registration error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )

@router.post("/register_admin", response_model=UserOut_json)
def register_admin(data: AdminIn , session: SessionDep):
    user = authenticate_user(session, data.username, data.password)
    if user:
        raise HTTPException(status_code=400, detail="Username already exists")
        # return {
        #     "message": "Username already exists",
        #     "data": None
        # }
    if verify_key(data.key) == False:
        raise HTTPException(status_code=400, detail="Key is incorrect")
        # return {
        #     "message": "Key is incorrect",
        #     "data": None
        # }
    db_user = register_user(session, data, isAdmin=True)
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    return {
        "msg": "Register successfully",
        "data": None
    }