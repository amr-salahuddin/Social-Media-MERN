import {Box, Button, Grid, Link, TextField} from "@mui/material";
import React from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {setLogin} from "../../state";
import {useNavigate} from "react-router-dom";

const Login = (props) => {
    const handleSwitch = props.handleSwitch;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleSubmit(values) {
        const formData = {
            email: values.email,
            password: values.password,
        }

        //output formdata values
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                const {user, token} = data.data;
                console.log(data,'dd')
                console.log('sss',user,token)
                dispatch(
                    setLogin({
                        user,
                        token
                    })
                )
                navigate('/home');

            } else {
                console.log('error', response);
            }

        } catch (e) {
            console.log(e)
        }

    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validateOnChange: false,
        validateOnBlur: false,

        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
        }),
        onSubmit: handleSubmit
    });

    return (
        <Box component="form" noValidate sx={{mt: 1}} onSubmit={formik.handleSubmit}>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                Sign In
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="#" variant="body2" onClick={handleSwitch}>
                        Don't have an account? Register
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Login;
