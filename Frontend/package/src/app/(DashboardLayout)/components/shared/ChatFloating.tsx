import { useState, useEffect } from "react";
import { Box, Typography, Avatar, Fab, TextField, IconButton, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";

const ChatFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

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

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      // Agregar el mensaje del usuario a la lista de mensajes
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, sender: "user" },
      ]);

      // Simular una respuesta automática del asistente después de un pequeño retraso
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Respondiendo...", sender: "bot" },
        ]);
      }, 1000);

      // Limpiar el campo de texto
      setInputValue("");
    }
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
            maxHeight: "400px", // Para evitar que se expanda demasiado
            overflowY: "auto", // Scroll automático
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
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              p: 2,
              my: 2,
              minHeight: "150px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: message.sender === "user" ? "flex-start" : "flex-end",
                  backgroundColor: message.sender === "user" ? "#ccefff" : "#0085db",
                  color: message.sender === "user" ? "#333" : "#fff",
                  borderRadius: "10px",
                  p: 1,
                  maxWidth: "80%",
                }}
              >
                <Typography variant="body2">{message.text}</Typography>
              </Box>
            ))}
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              sx={{ mr: 1 }} // Espacio a la derecha del TextField
            />
            <IconButton color="primary" size="large" onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatFloating;
