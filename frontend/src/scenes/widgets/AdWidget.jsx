import React from 'react';
import {Box, Typography, Button, Divider, useTheme} from '@mui/material';
import { WidgetWrapper } from '../../components/WidgetWrapper'; // Assuming WidgetWrapper is in the same directory

const AdWidget = ({ ad }) => {
    const theme = useTheme();
    const medium = theme.palette.neutral.medium;
    ad = {
        imageUrl: 'https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg',
        name: 'Ad Name',
        website: 'https://example.com',
        description: 'Ad Description',
    }
    return (
        <WidgetWrapper>
            {/* Title and Create Ad Button */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                    Sponsored Ad
                </Typography>
                <Typography color = {medium}>
                    Create Ad
                </Typography>
            </Box>

            {/* Ad Image */}
            <Box mb={2}>
                <img
                    src={ad.imageUrl}
                    alt="Ad Image"
                    style={{ width: '100%', borderRadius: '0.75rem' }}
                />
            </Box>

            {/* Ad Name and Website */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {ad.name}
                </Typography>
                <Typography variant="subtitle2" color={medium}>
                    {ad.website}
                </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Ad Description */}
            <Typography variant="body2" color={medium}>
                {ad.description}
            </Typography>
        </WidgetWrapper>
    );
};

// Example usage with dummy data
const adExample = {
    imageUrl: 'https://via.placeholder.com/600x200', // Replace with actual image URL
    name: 'Awesome Product',
    website: 'www.example.com',
    description: 'This is a great product that you will love! Check it out now at our website.',
};

const AdWidgetExample = () => <AdWidget ad={adExample} />;

export default AdWidgetExample;
