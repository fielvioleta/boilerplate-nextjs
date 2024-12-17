import { openSnackbar, selectSnackbarState } from "@/store/snackbarSlice";
import { Snackbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";

const SnackbarComponent = () => {
    const dispatch = useDispatch<any>()
    const snackbarState: any = useSelector(selectSnackbarState);

    const handleClose = () => {
        dispatch(openSnackbar({ open: false, message: '' }))
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={snackbarState.open}
            autoHideDuration={4000}
            onClose={handleClose}
            message={snackbarState.message}
        />

    )
}

export default SnackbarComponent