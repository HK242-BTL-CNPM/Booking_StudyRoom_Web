# from pydantic_settings import BaseSettings
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# import os

# # ADMIN_SECRET_KEY="adminsuperkeyusedtocreateadminaccountcapcap"
# # # Cấu hình database
# DB_USER = "root"  # Thay bằng username của bạn
# DB_PASSWORD = ""  # Thay bằng password của bạn
# DB_HOST = "localhost"  # Hoặc địa chỉ IP của server MySQL
# DB_PORT = 3306  # Cổng mặc định của MySQL
# DB_NAME = "cnpm_db"  # Thay bằng tên database của bạn
# # # Tạo URL kết nối MySQL
# # DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# # Chuỗi kết nối không chứa ssl_mode, sẽ cấu hình SSL qua connect_args
# DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# SECRET_KEY: str = "your-secret-key"
# API_V1_STR: str = "/api/v1"





# ADMIN_KEY: str ="something"

from pydantic_settings import BaseSettings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

# Cấu hình database
DB_USER = "root"  # XAMPP default
DB_PASSWORD = ""  # XAMPP default
DB_HOST = "localhost"
DB_PORT = 3306
DB_NAME = "cnpm_db"

# Chuỗi kết nối
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Các khóa bí mật
SECRET_KEY: str = "your-secret-key"
ADMIN_SECRET_KEY: str = "adminsuperkeyusedtocreateadminaccountcapcap"
API_V1_STR: str = "/api/v1"
ADMIN_KEY: str = "something"