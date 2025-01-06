import AdminLayout from "@/components/AdminLayout";
import { Box, Button, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { fetchMicroServices } from "@/store/microServicesSlice";
import { useRouter } from 'next/navigation'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "@/context/AuthContext";
import SnackbarComponent from "@/components/Snackbar";

export default function Home() {
    const { setIsLoading } = useAuth()
    const router = useRouter()
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [hasFilter, setHasFilter] = useState(false);
    const [filterState, setFilterState] = useState({
        search: ''
    })

    const dispatch = useDispatch<any>()

    const fetchData = async () => {
        setIsLoading(true);
        try {
            await dispatch(fetchMicroServices({ page, size })).then((res: any) => {
                setData(res.payload.content);
                setTotalRows(res.payload.page.totalRecords);
            })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [page, size]);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const StyledTableCell = styled(TableCell)(({ theme, width }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            whiteSpace: 'nowrap',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '14px',
            width,
            maxWidth: width,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
            width: width,
            maxWidth: width,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    }));

    const [filterText, setFilterText] = useState('');

    const handleEdit = () => {
        console.log('edit')
    }

    const handleDelete = () => {
        console.log('delete')
    }

    const handleSearch = () => {
        setHasFilter(true)
        // const payload = {
        //     ...filterState,
        //     ...(isValidDate(filterState.from) && {
        //         from: dayjs(filterState.from).format('YYYY-MM-DD HH:mm:ss.SSS'),
        //     }),
        //     ...(isValidDate(filterState.to) && {
        //         to: dayjs(filterState.to).format('YYYY-MM-DD HH:mm:ss.SSS'),
        //     }),
        // };

        // setData([])
        // setTotalRows(0)
        // fetchData(payload)
    }

    const handleReset = () => {

    }

    return (
        <AdminLayout>
            <SnackbarComponent></SnackbarComponent>
            {data &&
                <TableContainer component={Paper} >
                    <Box className="p-4 flex gap-4">
                        <TextField
                            label="Filter microservices"
                            variant="outlined"
                            fullWidth
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />

                        {
                            hasFilter &&
                            <Button type="button" variant="contained" className="w-32" onClick={handleReset}>
                                Reset
                            </Button>
                        }

                        <Button type="button" variant="contained" className="w-32" onClick={handleSearch}>
                            Search
                        </Button>
                        <Button className="h-14 w-52 whitespace-nowrap" variant="contained" onClick={() => router.push('/micro-services/create')}>
                            Add microservice
                        </Button>
                    </Box>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Source Id</StyledTableCell>
                                <StyledTableCell>Source Name</StyledTableCell>
                                <StyledTableCell>Version Number</StyledTableCell>
                                <StyledTableCell>Service URL</StyledTableCell>
                                <StyledTableCell>Source URL</StyledTableCell>
                                <StyledTableCell>Deleted</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: any, index: number) => (
                                <TableRow key={index}>
                                    <StyledTableCell align={'center'}>{row.fID}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.fSource_ID}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.fSourceNickname}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.fVersionNumber}</StyledTableCell>
                                    <StyledTableCell width="300px">
                                        <Tooltip title={<Typography>{row.fMicroservices_URL} </Typography>} placement="left-end">
                                            <span>{row.fMicroservices_URL}</span>
                                        </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell width="300px">
                                        <Tooltip title={<Typography>{row.fSource_API_URL} </Typography>} placement="left-end">
                                            <span>{row.fSource_API_URL}</span>
                                        </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.fDel ? 'True' : 'False'}</StyledTableCell>
                                    <StyledTableCell align={'center'}>
                                        <Box className="flex gap-1 justify-center">
                                            <EditIcon onClick={handleEdit} className="table-edit-icon cursor-pointer" />
                                            <DeleteIcon onClick={handleDelete} className="table-delete-icon cursor-pointer" />
                                        </Box>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={totalRows}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={size}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            }
        </AdminLayout>
    );
}
