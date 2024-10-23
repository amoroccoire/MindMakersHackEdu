from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

# Base class for models
Base = declarative_base()

class Usuario(Base):
    __tablename__ = 'usuarios'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(15), nullable=False)
    password = Column(String(15), nullable=False)
    gmail = Column(String, nullable=False)
    semestre = Column(Integer, nullable=False)
    carreraProfesional = Column(String, nullable=False)

class TareaPersonalizada(Base):
    __tablename__ = 'tareas_personalizadas'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    idUsuario = Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    fechaCreacion = Column(DateTime, default=datetime.utcnow, nullable=False)
    descripcion = Column(String(200), nullable=False)
    prioridad = Column(Integer, nullable=False)
    isCompleted = Column(Boolean, default=False)
    fechaLimite = Column(DateTime, nullable=False)
    fechaSubmit = Column(DateTime, nullable=True)

    usuario = relationship("Usuario")

class Curso(Base):
    __tablename__ = 'cursos'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    docente = Column(String, nullable=False)
    nombre = Column(String, nullable=False)
    creditos = Column(Integer, nullable=False)

class TareaDocente(Base):
    __tablename__ = 'tareas_docentes'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    idCurso = Column(Integer, ForeignKey('cursos.id'), nullable=False)
    descripcion = Column(String, nullable=False)
    fecha_inicio = Column(DateTime, default=datetime.utcnow)
    fecha_fin = Column(DateTime, nullable=False)

    curso = relationship("Curso")

class TareaUsuario(Base):
    __tablename__ = 'tareas_usuarios'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    idTareaDocente = Column(Integer, ForeignKey('tareas_docentes.id'), nullable=False)
    idUsuario = Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    isCompleted = Column(Boolean, default=False)
    fechaSubmit = Column(DateTime, nullable=True)
    calificacion = Column(Integer, nullable=True)  # Nueva columna para la calificación

    tarea_docente = relationship("TareaDocente")
    usuario = relationship("Usuario")