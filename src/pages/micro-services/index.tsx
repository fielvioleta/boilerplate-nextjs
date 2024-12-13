import AdminLayout from "@/components/AdminLayout";
import { Box, Button, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { fetchMicroServices } from "@/store/microServicesSlice";
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const dispatch = useDispatch<any>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(fetchMicroServices({ page, size })).then((res: any) => {
                    setData(res.payload.content);
                    setTotalRows(res.payload.page.totalRecords);
                })
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
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

    return (
        <AdminLayout>
            {data &&
                <TableContainer component={Paper} >
                    <Box className="flex items-center p-4 space-between justify-between">
                        <Box >
                            <TextField
                                label="Filter microservices"
                                variant="outlined"
                                fullWidth
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                            />
                        </Box>
                        <Button className="h-14" variant="contained" onClick={() => router.push('/micro-services/create')}>Add micro services</Button>
                    </Box>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                {/* <StyledTableCell>Created Date</StyledTableCell> */}
                                <StyledTableCell>Source Id</StyledTableCell>
                                <StyledTableCell>Source Name</StyledTableCell>
                                <StyledTableCell>Version Number</StyledTableCell>
                                {/* <StyledTableCell>From Date</StyledTableCell>
                                <StyledTableCell>To Date</StyledTableCell> */}
                                <StyledTableCell>Service URL</StyledTableCell>
                                <StyledTableCell>Source URL</StyledTableCell>
                                {/* <StyledTableCell>Timeout Session</StyledTableCell> */}
                                {/* <StyledTableCell>Updating Time</StyledTableCell> */}
                                <StyledTableCell>Deleted</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: any) => (
                                <TableRow key={row.Id}>
                                    <StyledTableCell align={'center'}>{row.fID}</StyledTableCell>
                                    {/* <StyledTableCell align={'center'}>{fullDateFormat(row.fCreateDate)}</StyledTableCell> */}
                                    <StyledTableCell align={'center'}>{row.fSource_ID}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.fSourceNickname}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.fVersionNumber}</StyledTableCell>
                                    {/* <StyledTableCell align={'center'}>{fullDateFormat(row.fValid_FromDate)}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{fullDateFormat(row.fValid_ToDate)}</StyledTableCell> */}
                                    <StyledTableCell width="300px">
                                        <Tooltip title={row.fMicroservices_URL} placement="bottom-start">
                                            {row.fMicroservices_URL}
                                        </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell width="300px">
                                        <Tooltip title={row.fSource_API_URL} placement="bottom-start">
                                            {row.fSource_API_URL}
                                        </Tooltip>
                                    </StyledTableCell>
                                    {/* <StyledTableCell align={'center'}>{row.fTimeoutSession}</StyledTableCell> */}
                                    {/* <StyledTableCell align={'center'}>{row.fUpdatingTime}</StyledTableCell> */}
                                    <StyledTableCell align={'center'}>{row.fDel ? 'True' : 'False'}</StyledTableCell>
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
