import { useState, useEffect } from "react";
import { Box, Typography, Avatar, Fab, TextField, IconButton, Tooltip, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ChatFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, sender: "user" },
      ]);
      
      setLoading(true); // Activar indicador de carga

      try {
        const response = await axios.post("https://reto-7-chatbox-production.up.railway.app/chatbot", {
          pregunta: inputValue,
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.respuesta || "Sin respuesta", sender: "bot" },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error al obtener la respuesta. Intenta de nuevo más tarde.", sender: "bot" },
        ]);
      } finally {
        setLoading(false); // Desactivar indicador de carga
      }

      setInputValue(""); // Limpiar campo de entrada
    }
  };

  // Función para convertir enlaces en clicables y formatear el texto
  const formatMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Convertir las respuestas en HTML
    const formattedText = text
      .replace(urlRegex, '<a href="$&" target="_blank" rel="noopener noreferrer" style="color: #0085db;">$&</a>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Formatear texto entre asteriscos
      .replace(/\n/g, '<br />'); // Reemplazar saltos de línea con etiquetas <br>

    return <span dangerouslySetInnerHTML={{ __html: formattedText }} style={{ color: '#000' }} />; // Texto en negro
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
          open={showTooltip}
          onClose={() => setShowTooltip(false)}
          sx={{
            "& .MuiTooltip-tooltip": {
              backgroundColor: "white",
              color: "black",
              fontSize: "16px",
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
            width: 600,
            backgroundColor: "#ffffff",
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
            maxHeight: "1000px", // Aumentar altura máxima
            overflowY: "auto",
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
              maxHeight: "300px", // Altura máxima para permitir scrolling
              overflowY: "auto", // Scroll automático
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
                  wordWrap: "break-word", // Ajustar texto largo
                  background: "#f0f0f0", // Color de fondo plomo para el bot
                }}
              >
                <Typography variant="body2">
                  {message.sender === "bot" ? formatMessage(message.text) : message.text}
                </Typography>
              </Box>
            ))}

            {/* Mostrar indicador de carga mientras espera la respuesta */}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                <CircularProgress size={24} />
                <Typography sx={{ ml: 1 }}>Respondiendo...</Typography>
              </Box>
            )}
          </Box>

          {/* Campo de entrada de texto */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 1,
              paddingLeft: 0.5,
              paddingBottom: 0.5, // Ajustar espaciado inferior
              paddingTop: 0.5, // Ajustar espaciado superior
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Escribe tu mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              sx={{ mr: 1 }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
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
