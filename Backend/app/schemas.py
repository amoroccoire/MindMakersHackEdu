from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TareaPersonalizadaCreate(BaseModel):
    idUsuario: int
    descripcion: str = Field(..., max_length=200)
    prioridad: int = Field(..., ge=1, le=4)
    fechaLimite: str

class TareaPersonalizadaResponse(BaseModel):
    id: int
    idUsuario: int
    descripcion: str
    prioridad: int
    isCompleted: bool
    fechaLimite: datetime  # Cambiamos a datetime para manejar la respuesta.
    fechaCreacion: datetime

    class Config:
        orm_mode = True
        json_encoders = {
            datetime: lambda v: v.strftime("%d/%m/%y %H:%M"),  # Define el formato de fecha que quieres usar en la respuesta.
        }

class TareaPersonalizadaUpdate(BaseModel):      
    descripcion: str = Field(..., max_length=200)
    prioridad: int = Field(..., ge=1, le=4)
    isCompleted: bool

class UsuarioCreate(BaseModel):
    username: str = Field(..., min_length=5, max_length=15)
    password: str = Field(..., min_length=5, max_length=15)
    gmail: str
    semestre: int
    carreraProfesional: str