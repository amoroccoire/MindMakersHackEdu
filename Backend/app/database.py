from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Conexión a la base de datos PostgreSQL
#DATABASE_URL = "postgresql://dashboard-student_owner:qY3pHhDnU6Tl@ep-bitter-breeze-a5icpbq3.us-east-2.aws.neon.tech/dashboard-student"
DATABASE_URL = "postgresql://postgres:root@localhost:5432/postgres"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
