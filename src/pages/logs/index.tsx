import AdminLayout from "@/components/AdminLayout";
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { fetchLogs } from "@/store/logsSlice";
import { fullDateFormat } from "@/helpers/dateTime";

export default function Home() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const dispatch = useDispatch<any>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(fetchLogs({ page, size })).then((res: any) => {
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

                    <div style={{ padding: '16px' }}>
                        <TextField
                            label="Filter logs"
                            variant="outlined"
                            fullWidth
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Server</StyledTableCell>
                                <StyledTableCell>App Type</StyledTableCell>
                                <StyledTableCell>Environment</StyledTableCell>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Level</StyledTableCell>
                                <StyledTableCell>Message</StyledTableCell>
                                <StyledTableCell>Exception</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: any) => (
                                <TableRow key={row.Id}>
                                    <StyledTableCell align={'center'}>{row.Id}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.Server}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.AppType}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.Environment}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{fullDateFormat(row.Date)}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.Level}</StyledTableCell>
                                    <StyledTableCell width="300px">
                                        <Tooltip title={row.Message} placement="bottom-start">
                                            {row.Message}
                                        </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell width={'300px'}>
                                        <Tooltip title={row.Exception} placement="left-end">
                                            {row.Exception}
                                        </Tooltip>
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
