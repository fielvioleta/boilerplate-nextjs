import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box, styled } from '@mui/system';
import AdminLayout from "@/components/AdminLayout"
import { Button, Paper, TableContainer } from '@mui/material';
import { numberOnly } from '@/helpers/forms';
import { useDispatch } from 'react-redux';
import { createMicroServices } from '@/store/microServicesSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function Create() {
    const dispatch = useDispatch<any>()
    const router = useRouter()
    const [state, setState] = React.useState({
        fSource_ID: '',
        fSourceNickname: '',
        fVersionNumber: '',
        fMicroservices_URL: '',
        fSource_API_URL: '',
        fDel: false
    })

    const handleChange = (event: any) => {
        const { name, type, checked, value } = event.target;

        if ((name === 'fSource_ID' || name === 'fVersionNumber') && !numberOnly(value)) {
            return;
        }


        setState((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = () => {
        dispatch(createMicroServices(state)).then((res: any) => {
            console.log(res)
        });
    }

    return (
        <AdminLayout>
            <TableContainer component={Paper} >
                <Box className="px-8 pt-8 flex items-center gap-2 cursor-pointer label-color" onClick={() => router.push('/micro-services')}>
                    <ArrowBackIcon /> Back
                </Box>
                <Grid container spacing={3} className="p-8">
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="fSource_ID">
                            Source Id
                        </FormLabel>
                        <OutlinedInput
                            id="fSource_ID"
                            name="fSource_ID"
                            type="text"
                            placeholder="fSource_ID"
                            autoComplete="fSource_ID"
                            size="small"
                            value={state.fSource_ID}
                            onChange={handleChange}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="fSourceNickname">
                            Source Name
                        </FormLabel>
                        <OutlinedInput
                            id="fSourceNickname"
                            name="fSourceNickname"
                            type="fSourceNickname"
                            placeholder="fSourceNickname"
                            autoComplete="fSourceNickname"
                            size="small"
                            value={state.fSourceNickname}
                            onChange={handleChange}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="fVersionNumber">
                            Version Number
                        </FormLabel>
                        <OutlinedInput
                            id="fVersionNumber"
                            name="fVersionNumber"
                            type="fVersionNumber"
                            placeholder="fVersionNumber"
                            autoComplete="fVersionNumber"
                            size="small"
                            value={state.fVersionNumber}
                            onChange={handleChange}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="fMicroservices_URL">Microservice URL</FormLabel>
                        <OutlinedInput
                            id="fMicroservices_URL"
                            name="fMicroservices_URL"
                            type="fMicroservices_URL"
                            placeholder="fMicroservices_URL"
                            autoComplete="fMicroservices_URL"
                            size="small"
                            value={state.fMicroservices_URL}
                            onChange={handleChange}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="fSource_API_URL" required>
                            Source URL
                        </FormLabel>
                        <OutlinedInput
                            id="fSource_API_URL"
                            name="fSource_API_URL"
                            type="fSource_API_URL"
                            placeholder="fSource_API_URL"
                            autoComplete="fSource_API_URL"
                            size="small"
                            value={state.fSource_API_URL}
                            onChange={handleChange}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel>
                            &nbsp;
                        </FormLabel>
                        <FormControlLabel
                            control={<Checkbox name="fDel" checked={state.fDel} onChange={handleChange} />}
                            label="Deleted"
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12 }}>
                        <Button className="h-14 w-52 self-end" variant="contained" onClick={handleSave}>Save</Button>
                    </FormGrid>
                </Grid>
            </TableContainer>

        </AdminLayout>
    );
}
