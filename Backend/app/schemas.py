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


# Esquema para la respuesta, incluyendo el id
class UsuarioResponse(BaseModel):
    id: int
    username: str
    gmail: str
    semestre: int
    carreraProfesional: str

    class Config:
        orm_mode = True


#### CURSO ####
class CursoBase(BaseModel):
    docente: str
    nombre: str
    creditos: int

class CursoCreate(BaseModel):
    docente: str
    nombre: str
    creditos: int

class CursoUpdate(CursoBase):
    docente: str
    nombre: str
    creditos: int

class CursoResponse(BaseModel):
    id: int
    docente: str
    nombre: str
    creditos: int

    class Config:
        orm_mode = True

### CURSO ###

### TAREA DOCENTE ###
class TareaDocenteBase(BaseModel):
    idCurso: int
    descripcion: str
    fecha_fin: str  # Formato dd/mm/yy HH:MM

class TareaDocenteCreate(TareaDocenteBase):
    idCurso: int
    descripcion: str
    fecha_fin: str  # Formato dd/mm/yy HH:MM

class TareaDocenteUpdate(TareaDocenteBase):
    pass

class TareaDocenteResponse(TareaDocenteBase):
    id: int
    fecha_inicio: datetime  # Modificado para ser devuelto como string
    fecha_fin: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.strftime('%d/%m/%y %H:%M'),  # Convertir datetime a string en formato dd/mm/yy HH:MM
        }
### FIN TAREA DOCENTE ###

### TAREA USUARIO ###
class TareaUsuarioBase(BaseModel):
    idTareaDocente: int
    idUsuario: int
    isCompleted: bool

class TareaUsuarioUpdate(BaseModel):
    isCompleted: bool
    calificacion: Optional[int]

class TareaUsuarioResponse(BaseModel):
    id: int
    idTareaDocente: int
    idUsuario: int
    isCompleted: bool
    fechaSubmit: Optional[datetime]
    calificacion: Optional[int]

    class Config:
        from_attributes = True  # En Pydantic v2

### FIN TAREA DOCENTE ###