# from fastapi import FastAPI, Depends, Request, HTTPException
# from fastapi.middleware.cors import CORSMiddleware  # Thêm import này
# from typing import Annotated
# from app.model import User
# from fastapi.responses import JSONResponse
# from app.api.routers.auth import router as auth_router
# from app.api.routers.admin import router as admin_router
# from app.api.routers.user import router as user_router
# from app.api.dependencies import check_user_role, check_admin_role, get_current_user, oauth2_scheme, CurrentUser
# from app.cores.config import DATABASE_URL, API_V1_STR
# import jwt
# from sqlmodel import SQLModel
# from fastapi import FastAPI
# from app.api.routers import auth 

# # app = FastAPI(title="CNPM API", dependencies=[])

# # # Thêm middleware CORS
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["http://localhost:5173"],  # Cho phép origin của React
# #     allow_credentials=True,                   # Cho phép gửi cookie/credentials
# #     allow_methods=["*"],                      # Cho phép tất cả phương thức (GET, POST, OPTIONS, ...)
# #     allow_headers=["*"],                      # Cho phép tất cả header
# # )

# app = FastAPI()

# # Cấu hình CORS - đặt ngay sau khi khởi tạo app
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # URL của Frontend
#     allow_credentials=True, 
#     allow_methods=["*"],
#     allow_headers=["*"],
#     expose_headers=["*"]
# )

# # Middleware kiểm tra JWT
# @app.middleware("http")
# async def jwt_middleware(request: Request, call_next):
#     print(f"🚀 Middleware chạy!")
#     print(f"👉 Path: {request.url.path}")
#     print(f"👉 Authorization: {request.headers.get('Authorization')}")
    
#     # Các route công khai không cần kiểm tra JWT
#     public_paths = [f"{API_V1_STR}/auth", "/default", "/docs", "/openapi.json"]
#     print(f"Public paths: {public_paths}")
    
#     if any(request.url.path.startswith(path) for path in public_paths):
#         print("👉 Bỏ qua middleware cho route công khai")
#         return await call_next(request)

#     # Lấy token từ header Authorization
#     token = request.headers.get("Authorization", "").replace("Bearer ", "")
#     print(f"Token: {token}")
    
#     if not token:
#         print("👉 Thiếu token")
#         return JSONResponse(status_code=401, content={"detail": "Missing token"})

#     try:
#         # Gọi get_current_user để lấy thông tin user từ token
#         # Phân quyền dựa trên đường dẫn
#         if request.url.path.startswith(f"{API_V1_STR}/admin"):
#             isadmin = check_admin_role(token)
#             if not isadmin:
#                 print("👉 Không có quyền admin")
#                 return JSONResponse(status_code=403, content={"detail": "Admin role required"})
#             pass
#         elif request.url.path.startswith(f"{API_V1_STR}/user"):
#             isuser = check_user_role(token)
#             if not isuser:
#                 print("👉 Không có quyền user")
#                 return JSONResponse(status_code=403, content={"detail": "User role required"})
#     except jwt.ExpiredSignatureError:
#         print("👉 Token hết hạn")
#         return JSONResponse(status_code=401, content={"detail": "Token has expired"})
#     except jwt.PyJWTError:
#         print("👉 Token không hợp lệ")
#         return JSONResponse(status_code=401, content={"detail": "Invalid token"})
#     except Exception as e:
#         print(f"👉 Lỗi khác: {str(e)}")
#         return JSONResponse(status_code=401, content={"detail": str(e)})

#     print("👉 Token hợp lệ, tiếp tục xử lý request")
#     response = await call_next(request)
#     return response

# app.include_router(auth_router, 
#                    prefix=f"{API_V1_STR}/auth",
#                    tags=["auth"]
#                    )
# app.include_router(admin_router, 
#                    prefix=f"{API_V1_STR}/admin",
#                    tags=["admin"],
#                    dependencies=[Depends(oauth2_scheme)]
#                    )
# app.include_router(user_router, 
#                    prefix=f"{API_V1_STR}/user",
#                    tags=["user"],
#                    dependencies=[Depends(oauth2_scheme)]
#                    )
# app.include_router(auth.router)
                   
# @app.get("/default", tags=["default"])
# def on_startup():
#     return {"message": "Welcome to the Fast API"}


# from fastapi import FastAPI, Depends, Request, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from typing import Annotated
# from app.model import User
# from fastapi.responses import JSONResponse
# from app.api.routers.auth import router as auth_router
# from app.api.routers.admin import router as admin_router
# from app.api.routers.user import router as user_router
# from app.api.dependencies import check_user_role, check_admin_role, get_current_user, oauth2_scheme, CurrentUser
# from app.cores.config import DATABASE_URL, API_V1_STR
# import jwt
# from sqlmodel import SQLModel
# from fastapi import FastAPI
# from app.api.routers import auth

# app = FastAPI()

# # Cấu hình CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
#     expose_headers=["*"]
# )

# # Middleware kiểm tra JWT
# @app.middleware("http")
# async def jwt_middleware(request: Request, call_next):
#     print(f"🚀 Middleware chạy!")
#     print(f"👉 Path: {request.url.path}")
#     print(f"👉 Method: {request.method}")  # Debug method
#     print(f"👉 Authorization: {request.headers.get('Authorization')}")
    
#     # Bỏ qua yêu cầu OPTIONS để CORS middleware xử lý
#     if request.method == "OPTIONS":
#         print("👉 Bỏ qua middleware cho yêu cầu OPTIONS")
#         return await call_next(request)

#     # Các route công khai không cần kiểm tra JWT
#     public_paths = [f"{API_V1_STR}/auth", "/default", "/docs", "/openapi.json"]
#     print(f"Public paths: {public_paths}")
    
#     if any(request.url.path.startswith(path) for path in public_paths):
#         print("👉 Bỏ qua middleware cho route công khai")
#         return await call_next(request)

#     # Lấy token từ header Authorization
#     token = request.headers.get("Authorization", "").replace("Bearer ", "")
#     print(f"Token: {token}")
    
#     if not token:
#         print("👉 Thiếu token")
#         return JSONResponse(status_code=401, content={"detail": "Missing token"})

#     try:
#         if request.url.path.startswith(f"{API_V1_STR}/admin"):
#             isadmin = check_admin_role(token)
#             if not isadmin:
#                 print("👉 Không có quyền admin")
#                 return JSONResponse(status_code=403, content={"detail": "Admin role required"})
#         elif request.url.path.startswith(f"{API_V1_STR}/user"):
#             isuser = check_user_role(token)
#             if not isuser:
#                 print("👉 Không có quyền user")
#                 return JSONResponse(status_code=403, content={"detail": "User role required"})
#     except jwt.ExpiredSignatureError:
#         print("👉 Token hết hạn")
#         return JSONResponse(status_code=401, content={"detail": "Token has expired"})
#     except jwt.PyJWTError:
#         print("👉 Token không hợp lệ")
#         return JSONResponse(status_code=401, content={"detail": "Invalid token"})
#     except Exception as e:
#         print(f"👉 Lỗi khác: {str(e)}")
#         return JSONResponse(status_code=401, content={"detail": str(e)})

#     print("👉 Token hợp lệ, tiếp tục xử lý request")
#     response = await call_next(request)
#     return response

# app.include_router(auth_router, 
#                    prefix=f"{API_V1_STR}/auth",
#                    tags=["auth"]
#                    )
# app.include_router(admin_router, 
#                    prefix=f"{API_V1_STR}/admin",
#                    tags=["admin"],
#                    dependencies=[Depends(oauth2_scheme)]
#                    )
# app.include_router(user_router, 
#                    prefix=f"{API_V1_STR}/user",
#                    tags=["user"],
#                    dependencies=[Depends(oauth2_scheme)]
#                    )
# # app.include_router(auth.router)
                   
# @app.get("/default", tags=["default"])
# def on_startup():
#     return {"message": "Welcome to the Fast API"}

from fastapi import FastAPI, Depends, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from app.model import User
from fastapi.responses import JSONResponse
from app.api.routers.auth import router as auth_router
from app.api.routers.admin import router as admin_router
from app.api.routers.user import router as user_router
from app.api.dependencies import check_user_role, check_admin_role, get_current_user, oauth2_scheme, CurrentUser
from app.cores.config import DATABASE_URL, API_V1_STR
import jwt
from sqlmodel import SQLModel

app = FastAPI(title="CNPM API", dependencies=[])

# Thêm middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware kiểm tra JWT
@app.middleware("http")
async def jwt_middleware(request: Request, call_next):
    print(f"🚀 Middleware chạy!")
    print(f"👉 Path: {request.url.path}")
    print(f"👉 Method: {request.method}")  # Thêm log để kiểm tra method
    print(f"👉 Authorization: {request.headers.get('Authorization')}")
    
    # Bỏ qua yêu cầu OPTIONS để CORS middleware xử lý
    if request.method == "OPTIONS":
        print("👉 Bỏ qua middleware cho yêu cầu OPTIONS")
        return await call_next(request)

    # Các route công khai không cần kiểm tra JWT
    public_paths = [f"{API_V1_STR}/auth", "/default", "/docs", "/openapi.json"]
    print(f"Public paths: {public_paths}")
    
    if any(request.url.path.startswith(path) for path in public_paths):
        print("👉 Bỏ qua middleware cho route công khai")
        return await call_next(request)

    # Lấy token từ header Authorization
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    print(f"Token: {token}")
    
    if not token:
        print("👉 Thiếu token")
        return JSONResponse(status_code=401, content={"detail": "Missing token"})

    try:
        if request.url.path.startswith(f"{API_V1_STR}/admin"):
            isadmin = check_admin_role(token)
            if not isadmin:
                print("👉 Không có quyền admin")
                return JSONResponse(status_code=403, content={"detail": "Admin role required"})
                pass
        elif request.url.path.startswith(f"{API_V1_STR}/user"):
            isuser = check_user_role(token)
            if not isuser:
                print("👉 Không có quyền user")
                return JSONResponse(status_code=403, content={"detail": "User role required"})
    except jwt.ExpiredSignatureError:
        print("👉 Token hết hạn")
        return JSONResponse(status_code=401, content={"detail": "Token has expired"})
    except jwt.PyJWTError:
        print("👉 Token không hợp lệ")
        return JSONResponse(status_code=401, content={"detail": "Invalid token"})
    except Exception as e:
        print(f"👉 Lỗi khác: {str(e)}")
        return JSONResponse(status_code=401, content={"detail": str(e)})

    print("👉 Token hợp lệ, tiếp tục xử lý request")
    response = await call_next(request)
    return response

app.include_router(auth_router, 
                   prefix=f"{API_V1_STR}/auth",
                   tags=["auth"]
                   )
app.include_router(admin_router, 
                   prefix=f"{API_V1_STR}/admin",
                   tags=["admin"],
                   dependencies=[Depends(oauth2_scheme)]
                   )
app.include_router(user_router, 
                   prefix=f"{API_V1_STR}/user",
                   tags=["user"],
                   dependencies=[Depends(oauth2_scheme)]
                   )
                   
@app.get("/default", tags=["default"])
def on_startup():
    return {"message": "Welcome to the Fast API"}