from typing import List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

# Crea las tablas en la base de datos
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Agregar el middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las solicitudes de origen (puedes restringirlo según sea necesario)
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Dependency para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Ruta para listar todos los usuarios
@app.get("/usuarios/", response_model=List[schemas.UsuarioResponse])
def get_all_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(models.Usuario).all()
    return usuarios

@app.get("/tareas/usuario/{idUsuario}/", response_model=List[schemas.TareaPersonalizadaResponse])
def get_tareas_by_usuario(idUsuario: int, db: Session = Depends(get_db)):
    tareas = db.query(models.TareaPersonalizada).filter(models.TareaPersonalizada.idUsuario == idUsuario).all()
    if not tareas:
        raise HTTPException(status_code=404, detail="No se encontraron tareas para este usuario")
    return tareas

@app.get("/tareas/usuario/{idUsuario}/incompletas/", response_model=int)
def get_incomplete_tareas_by_usuario(idUsuario: int, db: Session = Depends(get_db)):
    
    tareas_incompletas = crud.get_incomplete_tareas_by_usuario(db, idUsuario)
    return tareas_incompletas

# Ruta para crear una nueva tarea personalizada
@app.post("/tareas/")
def create_tarea(tarea: schemas.TareaPersonalizadaCreate, db: Session = Depends(get_db)):
    return crud.create_tarea(db, tarea)

# Ruta para actualizar una tarea personalizada
@app.put("/tareas/{tarea_id}/")
def update_tarea(tarea_id: int, tarea_update: schemas.TareaPersonalizadaUpdate, db: Session = Depends(get_db)):
    tarea_db = db.query(models.TareaPersonalizada).filter(models.TareaPersonalizada.id == tarea_id).first()
    if not tarea_db:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return crud.update_tarea(db, tarea_db, tarea_update)

@app.get("/tareas/incompletas/")
def get_incomplete_tareas(db: Session = Depends(get_db)):
    return crud.get_incomplete_tareas(db)

@app.post("/usuarios/", response_model=schemas.UsuarioResponse)
def create_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    # Verifica si el correo ya existe
    usuario_existente = db.query(models.Usuario).filter(models.Usuario.gmail == usuario.gmail).first()
    if usuario_existente:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    
    return crud.create_usuario(db=db, usuario=usuario)

############ CURSO ############
@app.get("/cursos/", response_model=List[schemas.CursoResponse])
def get_all_cursos(db: Session = Depends(get_db)):
    cursos = db.query(models.Curso).all()
    return cursos

@app.get("/cursos/{curso_id}/", response_model=schemas.CursoResponse)
def get_curso_by_id(curso_id: int, db: Session = Depends(get_db)):
    curso = db.query(models.Curso).filter(models.Curso.id == curso_id).first()
    if not curso:
        raise HTTPException(status_code=404, detail="Curso no encontrado")
    return curso

@app.post("/cursos/", response_model=schemas.CursoResponse)
def create_curso(curso: schemas.CursoCreate, db: Session = Depends(get_db)):
    nuevo_curso = crud.create_curso(db, curso)
    return nuevo_curso

@app.put("/cursos/{curso_id}/", response_model=schemas.CursoResponse)
def update_curso(curso_id: int, curso_update: schemas.CursoUpdate, db: Session = Depends(get_db)):
    curso = db.query(models.Curso).filter(models.Curso.id == curso_id).first()
    if not curso:
        raise HTTPException(status_code=404, detail="Curso no encontrado")
    
    curso.docente = curso_update.docente
    curso.nombre = curso_update.nombre
    curso.creditos = curso_update.creditos
    db.commit()
    db.refresh(curso)
    return curso

############ FIN CURSO ############ funcionan

###### TAREA DOCENTE #######
@app.get("/tareas-docente/", response_model=List[schemas.TareaDocenteResponse])
def get_all_tareas_docente(db: Session = Depends(get_db)):
    tareas = db.query(models.TareaDocente).all()
    return tareas

@app.get("/tareas-docente/curso/{idCurso}/", response_model=List[schemas.TareaDocenteResponse])
def get_tareas_by_curso(idCurso: int, db: Session = Depends(get_db)):
    tareas = db.query(models.TareaDocente).filter(models.TareaDocente.idCurso == idCurso).all()
    if not tareas:
        raise HTTPException(status_code=404, detail="No se encontraron tareas para este curso")
    return tareas

@app.post("/tareas-docente/", response_model=schemas.TareaDocenteResponse)
def create_tarea_docente(tarea: schemas.TareaDocenteCreate, db: Session = Depends(get_db)):
    nueva_tarea = models.TareaDocente(
        idCurso=tarea.idCurso,
        descripcion=tarea.descripcion,
        fecha_inicio=datetime.utcnow(),
        fecha_fin=datetime.strptime(tarea.fecha_fin, "%d/%m/%y %H:%M")
    )
    db.add(nueva_tarea)
    db.commit()
    db.refresh(nueva_tarea)

    # Crear una TareaUsuario para cada usuario existente
    usuarios = db.query(models.Usuario).all()
    for usuario in usuarios:
        nueva_tarea_usuario = models.TareaUsuario(
            idTareaDocente=nueva_tarea.id,
            idUsuario=usuario.id,
            isCompleted=False,
            fechaSubmit=None,  # Asegurarse de que sea None
            calificacion=None  # Asegurarse de que sea None
        )
        db.add(nueva_tarea_usuario)
    db.commit()
    
    return nueva_tarea

@app.put("/tareas-docente/{tarea_id}/", response_model=schemas.TareaDocenteResponse)
def update_tarea_docente(tarea_id: int, tarea_update: schemas.TareaDocenteUpdate, db: Session = Depends(get_db)):
    tarea = db.query(models.TareaDocente).filter(models.TareaDocente.id == tarea_id).first()
    if not tarea:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    
    tarea.descripcion = tarea_update.descripcion
    tarea.fecha_fin = datetime.strptime(tarea_update.fecha_fin, "%d/%m/%y %H:%M")
    db.commit()
    db.refresh(tarea)
    return tarea

###### FIN TAREA DOCENTE ######

###### TAREA USUARIO ######
@app.get("/tareas-usuario/", response_model=List[schemas.TareaUsuarioResponse])
def get_all_tareas_usuario(db: Session = Depends(get_db)):
    tareas = db.query(models.TareaUsuario).all()
    return tareas

@app.get("/tareas-usuario/curso/{idCurso}/", response_model=List[schemas.TareaUsuarioResponse])
def get_tareas_usuario_by_curso(idCurso: int, db: Session = Depends(get_db)):
    tareas = db.query(models.TareaUsuario).join(models.TareaDocente).filter(models.TareaDocente.idCurso == idCurso).all()
    return tareas

@app.put("/tareas-usuario/{tarea_usuario_id}/", response_model=schemas.TareaUsuarioResponse)
def update_tarea_usuario(tarea_usuario_id: int, tarea_update: schemas.TareaUsuarioUpdate, db: Session = Depends(get_db)):
    tarea_usuario = db.query(models.TareaUsuario).filter(models.TareaUsuario.id == tarea_usuario_id).first()
    if not tarea_usuario:
        raise HTTPException(status_code=404, detail="Tarea de usuario no encontrada")

    # Solo actualizamos el campo isCompleted
    if tarea_update.isCompleted and not tarea_usuario.isCompleted:
        tarea_usuario.isCompleted = True
        tarea_usuario.fechaSubmit = datetime.utcnow()  # Asignar la fecha actual cuando se completa
    elif not tarea_update.isCompleted:
        tarea_usuario.isCompleted = False
        tarea_usuario.fechaSubmit = None  # Si se marca como incompleta, quitar la fecha de envío (si aplica)

    # Verificar si se debe actualizar la calificacion
    if tarea_update.calificacion is not None:
        tarea_usuario.calificacion = tarea_update.calificacion  # Actualizar la calificación

    db.commit()
    db.refresh(tarea_usuario)
    return tarea_usuario
###### FIN TAREA USUARIO ######

