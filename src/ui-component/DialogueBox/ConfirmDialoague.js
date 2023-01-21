import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DialogTitle, Box } from '@mui/material';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ConfirmDialoague = (props) => {
    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                // onClose={() => dispatch(setDialogueview(''))}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" sx={{ padding: '20px', fontSize: '20px' }}>
                        {props.msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box>
                        <Button onClick={() => props.handleClick(false)}>Disagree</Button>
                        <Button onClick={() => props.handleClick(true)}>Agree</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmDialoague;
