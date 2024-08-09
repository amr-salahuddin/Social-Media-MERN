import React, {useState} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    TextField,
    Button,
    Container,
    Box,
    Avatar,
    Grid,
    Link,
    IconButton
} from '@mui/material';
import {styled} from '@mui/system';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '@emotion/react';
import {setMode} from "../../state";
import {DarkMode, LightMode} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {FlexBetween} from "../../components/FlexBetween";
import Register from "./Register";
import Login from "./Login";

const FormContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '64px',
});

const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);

    const handleSwitch = () => {
        setIsRegister(!isRegister);
    };
    const navigate = useNavigate();
    const theme = useTheme();
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const dispatch = useDispatch();
    const dark = theme.palette.neutral.dark;
    return (
        <>
            <FlexBetween padding='1rem 2%' backgroundColor={alt} gap='1.3rem'>
                <Typography fontWeight='bold' fontSize='clamp(1rem, 2rem, 2.25rem)' color='primary'
                            onClick={() => navigate("/home")}
                            sx={{
                                "&:hover": {
                                    color: primaryLight,
                                    cursor: "pointer"
                                },
                            }}
                >Sociopedia</Typography>
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkMode sx={{fontSize: '25px'}}/>
                    ) : (
                        <LightMode sx={{color: dark, fontSize: '25px'}}/>
                    )}
                </IconButton>
            </FlexBetween>
            <FormContainer>
                {isRegister ? (<Register handleSwitch={handleSwitch}/>) : (<Login handleSwitch={handleSwitch}/>)}
            </FormContainer>
        </>
    );
};

export default LoginPage;
