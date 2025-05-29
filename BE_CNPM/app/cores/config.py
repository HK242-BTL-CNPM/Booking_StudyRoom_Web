




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
