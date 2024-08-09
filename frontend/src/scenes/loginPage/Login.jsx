import { Box, Button, Grid, Link, TextField } from "@mui/material";
import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = (props) => {
    const handleSwitch = props.handleSwitch;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validateOnChange: false,
        validateOnBlur: false,

        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        }),
        onSubmit: values => {
            console.log('Form data', values);
        },
    });

    return (
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
