'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import readingList from '@/data/reading.json';

export default function ReadingList() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 2 }}>
                Reading List
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 6, fontWeight: 300 }}>
                "I've just read this" — A collection of books and papers that influence my research.
            </Typography>

            <Grid container spacing={4}>
                {readingList.map((item) => (
                    <Grid key={item.id} size={{ xs: 12, md: 6 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Chip
                                        label={item.type}
                                        color={item.type === 'Book' ? 'primary' : 'secondary'}
                                        size="small"
                                    />
                                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                                        {item.dateRead}
                                    </Typography>
                                </Box>

                                <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    by {item.author}
                                </Typography>

                                <Box sx={{ my: 2 }}>
                                    <Rating value={item.rating} readOnly size="small" />
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', bgcolor: 'rgba(255,255,255,0.03)', p: 2, borderRadius: 2, borderLeft: '3px solid #5f6368' }}>
                                    "{item.comment}"
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
