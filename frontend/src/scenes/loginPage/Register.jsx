import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useTheme } from '@emotion/react';
import React, { useState } from "react";
import { FlexBetween } from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import { useFormik } from 'formik';
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

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            location: '',
            occupation: '',
            email: '',
            password: ''
        },
        validateOnChange: false,
        validateOnBlur: false,

        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            location: Yup.string().required('Location is required'),
            occupation: Yup.string().required('Occupation is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        }),
        onSubmit: values => {
            console.log('Form data', values);
            console.log('Selected file', selectedFile);
        },
    });

    return (
        <Box component="form" noValidate width='70%' sx={{ mt: 1,mb:5 }} onSubmit={formik.handleSubmit}>
            <FlexBetween display='flex' justifyContent='center' gap='1rem'>
                <TextField
                    margin="normal"
                    required
                    sx={{ flex: 1 }}
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
                    sx={{ flex: 1 }}
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
                label="Location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Occupation"
                name="occupation"
                value={formik.values.occupation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.occupation && Boolean(formik.errors.occupation)}
                helperText={formik.touched.occupation && formik.errors.occupation}
            />
            <Box p='1rem' border='1px solid grey'>
                <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                        <Box {...getRootProps()}
                             sx={{ border: `2px dashed ${theme.palette.primary.main}`, p: '1rem', '&:hover': { cursor: 'pointer' }, }}>
                            <input {...getInputProps()} />
                            {!selectedFile && (
                                isDragActive ? (
                                    <Typography>Drop the files here ...</Typography>
                                ) : (
                                    <Typography>Drag 'n' drop a picture here, or click to select a file</Typography>
                                )
                            )}
                            {selectedFile && (
                                <Typography variant="body2">
                                    {selectedFile.name}
                                </Typography>
                            )}
                        </Box>
                    )}
                </Dropzone>
            </Box>
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
