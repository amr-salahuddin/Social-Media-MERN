import {Box, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {useTheme} from '@emotion/react';
import React, {useState} from "react";
import {FlexBetween} from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import {useFormik} from 'formik';
import * as Yup from 'yup';

const Register = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
        }
    };

    const theme = useTheme();
    const handleSwitch = props.handleSwitch;

    async function handleSubmit(values) {
        const formData = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
        }
        console.log(formData.passwordConfirm, values.passwordConfirm)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/auth/register`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log(response.ok,response)
                const data = await response.json();
                // handleSwitch();
                console.log(data)
            } else {
                console.log('error', response);
            }

        } catch (e) {
            console.log(e)
        }

    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validateOnChange: false,
        validateOnBlur: true,

        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            username: Yup.string().required('Username is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
            passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
        onSubmit: handleSubmit
    });

    return (
        <Box component="form" noValidate width='70%' sx={{ mb: 5}} onSubmit={formik.handleSubmit}>
            <FlexBetween display='flex' justifyContent='center' gap='1rem'>
                <TextField
                    margin="normal"
                    required
                    sx={{flex: 1}}
                    label="First Name"
                    autoFocus
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />

                <TextField
                    margin="normal"
                    required
                    sx={{flex: 1}}
                    label="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />
            </FlexBetween>


            <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
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
                label="Username"
                name="username"
                type="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            <FlexBetween display='flex' justifyContent='center' gap='1rem'>

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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password Confirmation"
                    name="passwordConfirm"
                    type="password"
                    value={formik.values.passwordConfirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.passwordConfirm && Boolean(formik.errors.password)}
                    helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                />
            </FlexBetween>

            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                Register
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="#" variant="body2" onClick={handleSwitch}>
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Register;
