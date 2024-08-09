import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FlexBetween } from "../../components/FlexBetween";
import { useTheme, useMediaQuery, Typography, InputBase, IconButton, FormControl, Select, MenuItem } from "@mui/material";
import { Close, DarkMode, Help, LightMode, Message, Notifications, Search ,Menu} from "@mui/icons-material";
import { setLogout, setMode } from "../../state";
import { Box } from "@mui/system";

const Navbar = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.token);

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primaryLight = theme.palette.primary.light;
    const background = theme.palette.background.default;
    const dark = theme.palette.neutral.dark;
    const neutral = theme.palette.neutral.main;
    const neutralLight = theme.palette.neutral.light;
    const alt = theme.palette.background.alt;
    console.log(alt);

    const fullName = 'xaxa'// `${user.firstName} ${user.lastName}`;
    return (

        <FlexBetween padding="1rem 2%" backgroundColor={alt}>
            <FlexBetween gap="0.75rem">
                <Typography fontWeight='bold' fontSize='clamp(1rem, 2rem, 2.25rem)' color='primary'
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer"
                        },
                    }}
                >Sociopedia</Typography>
                {isNonMobileScreen && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius='9px' gap='3rem' padding='0.1rem 1.5rem'>
                        <InputBase placeholder='Search...' />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {isNonMobileScreen ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkMode sx={{ fontSize: '25px' }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: '25px' }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: '25px' }} />
                    <Notifications sx={{ fontSize: '25px' }} />
                    <Help sx={{ fontSize: '25px' }} />
                    <FormControl variant='standard' value='d'>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: '150px',
                                borderRadius: '0.25rem',
                                p: '0.25rem 1rem',
                                '& .MuiSvgIcon-root': {
                                    pr: '0.25rem',
                                    width: '3rem'
                                },
                                '& .MuiSelect-select:focus': {
                                    backgroundColor: neutralLight
                                }

                            }}
                            input={<InputBase />}
                        >

                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>

                            <MenuItem onClick={() => dispatch(setLogout())}>
                                Log Out
                            </MenuItem>

                        </Select>

                    </FormControl>
                </FlexBetween>
            ) : (<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>

                <Menu />
            </IconButton>)}

            {
                !isNonMobileScreen && isMobileMenuToggled && (
                    <Box
                        position='fixed'
                        right='0'
                        bottom='0'
                        height='100%'
                        zIndex='10'
                        maxWidth='500px'
                        minWidth='300px'
                        backgroundColor={background}
                    >
                        <Box
                            display='flex'
                            justifyContent='flex-end'
                            p='1.5rem'
                        >
                            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                                <Close />
                            </IconButton>
                        </Box>

                        <FlexBetween
                         display="flex"
                         flexDirection="column"
                         justifyContent="center"
                         alignItems="center"
                        gap="3rem">
                            <IconButton onClick={() => dispatch(setMode())}>
                                {theme.palette.mode === 'dark' ? (
                                    <DarkMode sx={{ fontSize: '25px' }} />
                                ) : (
                                    <LightMode sx={{ color: primary, fontSize: '25px' }} />
                                )}
                            </IconButton>
                            <Message sx={{ fontSize: '25px' }} />
                            <Notifications sx={{ fontSize: '25px' }} />
                            <Help sx={{ fontSize: '25px' }} />
                            <FormControl variant='standard' value='d'>
                                <Select
                                    value={fullName}
                                    sx={{
                                        backgroundColor: neutralLight,
                                        width: '150px',
                                        borderRadius: '0.25rem',
                                        p: '0.25rem 1rem',
                                        '& .MuiSvgIcon-root': {
                                            pr: '0.25rem',
                                            width: '3rem'
                                        },
                                        '& .MuiSelect-select:focus': {
                                            backgroundColor: neutralLight
                                        }

                                    }}
                                    input={<InputBase />}
                                >

                                    <MenuItem value={fullName}>
                                        <Typography>{fullName}</Typography>
                                    </MenuItem>

                                    <MenuItem onClick={() => dispatch(setLogout())}>
                                        Log Out
                                    </MenuItem>

                                </Select>

                            </FormControl>
                        </FlexBetween>
                    </Box>)
            }
        </FlexBetween>
    )
}

export default Navbar