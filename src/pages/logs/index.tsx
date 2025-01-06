import AdminLayout from "@/components/AdminLayout";
import { Box, Button, InputAdornment, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { fetchLogs } from "@/store/logsSlice";
import { fullDateFormat } from "@/helpers/dateTime";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import { useAuth } from "@/context/AuthContext";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SnackbarComponent from "@/components/Snackbar";
import { openSnackbar } from "@/store/snackbarSlice";

export default function Home() {
    const { setIsLoading } = useAuth()
    const dispatch = useDispatch<any>()

    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [hasFilter, setHasFilter] = useState(false);
    const [copied, setCopied] = useState(false);

    const fetchData = async (payload = {}) => {
        setIsLoading(true);
        try {
            await dispatch(fetchLogs({ page, size, ...payload })).then((res: any) => {
                setData(res.payload.content);
                setTotalRows(res.payload.page.totalRecords);

            })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData({ ...filterState });
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

    const [filterState, setFilterState] = useState({
        message: '',
        exception: '',
        from: dayjs(new Date()).subtract(3, 'day'),
        to: dayjs(new Date())
    })

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setFilterState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const isValidDate = (date: any) => dayjs(date).isValid();

    const handleSearch = () => {
        setHasFilter(true)
        const payload = {
            ...filterState,
            ...(isValidDate(filterState.from) && {
                from: dayjs(filterState.from).format('YYYY-MM-DD HH:mm:ss.SSS'),
            }),
            ...(isValidDate(filterState.to) && {
                to: dayjs(filterState.to).format('YYYY-MM-DD HH:mm:ss.SSS'),
            }),
        };

        setData([])
        setTotalRows(0)
        fetchData(payload)
    }

    const handleReset = () => {
        setHasFilter(false)
        setPage(0)
        setSize(10)
        setFilterState({
            message: '',
            exception: '',
            from: dayjs(new Date()).subtract(3, 'day'),
            to: dayjs(new Date())
        })
        fetchData()
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                dispatch(openSnackbar({ open: true, message: 'Copied to clipboard' }))
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <AdminLayout>
            <SnackbarComponent></SnackbarComponent>
            {data &&
                <TableContainer component={Paper} >
                    <Box className="p-4 flex gap-4">
                        <TextField
                            className="flex-1"
                            label="Filter Message"
                            variant="outlined"
                            fullWidth
                            name="message"
                            value={filterState.message}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            className="flex-1"
                            label="Filter Exception"
                            variant="outlined"
                            fullWidth
                            name="exception"
                            value={filterState.exception}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box display="flex" gap={2} alignItems="center">
                                <DatePicker
                                    label="From Date"
                                    value={filterState.from}
                                    name="from"
                                    onChange={(newValue: any) => setFilterState({ ...filterState, from: newValue })}
                                    className="!h-12"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            sx: { input: { height: '48px', padding: '0 0 0 8px' } },
                                            InputLabelProps: { sx: { top: '-4px', } }
                                        }
                                    }}
                                />

                                <DatePicker
                                    label="To Date"
                                    value={filterState.to}
                                    name="to"
                                    minDate={filterState.from}
                                    onChange={(newValue: any) => setFilterState({ ...filterState, to: newValue })}
                                    className="!h-12"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            sx: { input: { height: '48px', padding: '0 0 0 8px' } },
                                            InputLabelProps: { sx: { top: '-4px', } },
                                        }
                                    }}
                                />
                            </Box>
                        </LocalizationProvider>

                        {
                            hasFilter &&
                            <Button type="button" variant="contained" className="w-32" onClick={handleReset}>
                                Reset
                            </Button>
                        }

                        <Button type="button" variant="contained" className="w-32" onClick={handleSearch}>
                            Search
                        </Button>
                    </Box>
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
                            {data.map((row: any, index: number) => (
                                <TableRow key={index}>
                                    <StyledTableCell align={'center'}>{row.Id ? row.Id : row.fID}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.Server}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.AppType}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.Environment}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{fullDateFormat(row.Date)}</StyledTableCell>
                                    <StyledTableCell align={'center'}>{row.Level}</StyledTableCell>
                                    <StyledTableCell width="300px">
                                        <Tooltip title={<Typography>{row.Message} </Typography>} placement="left-end">
                                            <span className={`${row.Message === '' ? 'hidden' : ''}`}>
                                                <ContentCopyIcon className="mr-2 !w-4 !h-4 cursor-pointer" onClick={() => handleCopy(row.Message)} />
                                                {row.Message}
                                            </span>
                                        </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell width={'300px'}>
                                        <Tooltip title={<Typography>{row.Exception} </Typography>} placement="left-end">
                                            <span className={`${row.Exception === '' ? 'hidden' : ''}`}>
                                                <ContentCopyIcon className="mr-2 !w-4 !h-4 cursor-pointer" onClick={() => handleCopy(row.Exception)} />
                                                {row.Exception}
                                            </span>
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
