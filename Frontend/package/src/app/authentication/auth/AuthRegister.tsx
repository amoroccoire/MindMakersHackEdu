import React, { useState } from 'react';
import { Box, Typography, Button, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Link from 'next/link';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface RegisterType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: RegisterType) => {
    const [semester, setSemester] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [career, setCareer] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value === '' || (Number(value) >= 1 && Number(value) <= 12)) {
            setSemester(value);
        }
    };

    const handleRegister = async () => {
        const userData = {
            username,
            gmail: email,
            semestre: Number(semester),
            carreraProfesional: career,
            password,
        };

        try {
            const response = await fetch('https://deploy-fast-api-production.up.railway.app/usuarios/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Error al registrarse');
            }

            setSnackbarMessage('Registro exitoso');
            setOpenSnackbar(true);
        } catch (error) {
            setSnackbarMessage('Error al registrarse');
            setOpenSnackbar(true);
        }
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='name' mb="5px">
                        Nombre de Usuario
                    </Typography>
                    <CustomTextField
                        id="name"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='semester' mb="5px">
                        Semestre
                    </Typography>
                    <CustomTextField
                        id="semester"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={semester}
                        onChange={handleSemesterChange}
                        inputProps={{ min: 1, max: 12 }}
                    />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='carrprof' mb="5px">
                        Carrera Profesional
                    </Typography>
                    <CustomTextField
                        id="carrprof"
                        variant="outlined"
                        fullWidth
                        value={career}
                        onChange={(e) => setCareer(e.target.value)}
                    />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">
                        Correo Electrónico
                    </Typography>
                    <CustomTextField
                        id="email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">
                        Contraseña
                    </Typography>
                    <CustomTextField
                        id="password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Stack>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    href= "/"
                    fullWidth
                    onClick={handleRegister} // Llama a la función de registro
                >
                    Registrarse
                </Button>
            </Box>
            {subtitle}

            {/* Snackbar para mostrar el mensaje de registro */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AuthRegister;