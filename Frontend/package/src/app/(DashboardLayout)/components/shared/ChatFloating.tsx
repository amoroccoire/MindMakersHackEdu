import { useState, useEffect } from "react";
import { Box, Typography, Avatar, Fab, TextField, IconButton, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";

const ChatFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Ocultar el tooltip automáticamente después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);

    return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 2000,
      }}
    >
      {/* Botón flotante para abrir/cerrar el chat */}
      {!isOpen && (
        <Tooltip
          title="¿Necesitas ayuda?"
          arrow
          open={showTooltip} // Mostrar tooltip automáticamente por 3 segundos
          onClose={() => setShowTooltip(false)} // Asegurar que se cierre después de 3 segundos
          sx={{
            "& .MuiTooltip-tooltip": {
              backgroundColor: "white",
              color: "black",
              fontSize: "16px", // Tamaño más grande de la letra
              boxShadow: 3,
            },
          }}
        >
          <Fab color="primary" onClick={toggleChat}>
            <ChatBubbleOutlineIcon />
          </Fab>
        </Tooltip>
      )}

      {/* Contenedor del chat */}
      {isOpen && (
        <Box
          sx={{
            width: 300,
            backgroundColor: "#ffffff",
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          {/* Encabezado del chat */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Avatar src="/robot-avatar.png" alt="Chat Avatar" />
            <Typography sx={{ color: "black", fontWeight: "bold" }}>Habla con tu Asistente</Typography>
            <IconButton onClick={toggleChat} sx={{ color: "black" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Cuerpo del chat */}
          <Box sx={{ backgroundColor: "#ccefff", borderRadius: 2, p: 2, my: 2, minHeight: "150px" }}>
            <Typography variant="body2" sx={{ color: "#333" }}>
              ¡Hola! 👋 Si tienes alguna pregunta, estoy aquí para ayudarte.
            </Typography>
          </Box>

          {/* Campo de entrada de texto */}
            <Box
            sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white", // Fondo blanco
                borderRadius: 1, // Bordes redondeados
                paddingLeft: 0.5, // Espaciado a la izquierda
            }}
            >
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Escribe tu mensaje..."
                sx={{ mr: 1 }} // Espacio a la derecha del TextField
            />
            <IconButton color="primary" size="large">
                <SendIcon />
            </IconButton>
            </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatFloating;
