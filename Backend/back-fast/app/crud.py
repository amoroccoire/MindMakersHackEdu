from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

def create_usuario(db: Session, usuario: schemas.UsuarioCreate):
    nuevo_usuario = models.Usuario(
        username=usuario.username,
        password=usuario.password,
        gmail=usuario.gmail,
        semestre=usuario.semestre,
        carreraProfesional=usuario.carreraProfesional
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

def create_tarea(db: Session, tarea_data):
    fecha_creacion = datetime.utcnow()
    fecha_limite = datetime.strptime(tarea_data.fechaLimite, "%d/%m/%y %H:%M")

    nueva_tarea = models.TareaPersonalizada(
        idUsuario=tarea_data.idUsuario,
        descripcion=tarea_data.descripcion,
        prioridad=tarea_data.prioridad,
        fechaCreacion=fecha_creacion,
        fechaLimite=fecha_limite
    )
    db.add(nueva_tarea)
    db.commit()
    db.refresh(nueva_tarea)
    return nueva_tarea

def get_incomplete_tareas_by_usuario(db: Session, idUsuario: int):
    fecha_actual = datetime.utcnow()
    # Contar las tareas incompletas en lugar de devolver todas
    count = db.query(models.TareaPersonalizada).filter(
        models.TareaPersonalizada.idUsuario == idUsuario,
        models.TareaPersonalizada.isCompleted == False,
    ).count()  # Cambiado para contar las tareas
    print(count)
    return count

def get_incomplete_tareas(db: Session):
    fecha_actual = datetime.utcnow()
    return db.query(models.TareaPersonalizada).filter(
        models.TareaPersonalizada.isCompleted == False,
    ).all()

def update_tarea(db: Session, tarea_db: models.TareaPersonalizada, tarea_update: schemas.TareaPersonalizadaUpdate):
    tarea_db.descripcion = tarea_update.descripcion
    tarea_db.prioridad = tarea_update.prioridad

    # Si la tarea se marca como completada, actualizamos la fechaSubmit
    if tarea_update.isCompleted and not tarea_db.isCompleted:
        tarea_db.isCompleted = True
        tarea_db.fechaSubmit = datetime.utcnow()  # Asigna la fecha y hora actual al completar la tarea
    else:
        tarea_db.isCompleted = tarea_update.isCompleted

    db.commit()
    db.refresh(tarea_db)
    return tarea_db

def create_curso(db: Session, curso: schemas.CursoCreate):
    nuevo_curso = models.Curso(
        docente=curso.docente,
        nombre=curso.nombre,
        creditos=curso.creditos
    )
    db.add(nuevo_curso)
    db.commit()
    db.refresh(nuevo_curso)
    return nuevo_curso