import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DialogTitle, Box } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux';
import { setDialogueview } from 'store/action/actions';
import { HeadingName } from './utils';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function TransDialoague(props) {
    const dispatch = useDispatch();
    const { customization } = useSelector((state) => state);
    return (
        <div>
            <Dialog
                open={customization.dialogueview === '' ? false : true}
                TransitionComponent={Transition}
                keepMounted
                fullWidth={props.fullWidth === undefined ? false : true}
                maxWidth={props.maxWidth === undefined ? false : props.maxWidth}
                // onClose={() => dispatch(setDialogueview(''))}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={'10px'}>
                    <Box component={'h3'} sx={{ fontSize: '30px', fontWeight: 'bolder' }}>
                        {
                            HeadingName.filter((id) => {
                                if (id.value === customization.dialogueview) return id.label;
                            })[0]?.label
                        }
                    </Box>
                    <button
                        type="button"
                        className="btn-close focus:shadow-none"
                        data-bs-dismiss="modal"
                        id="closePopup"
                        onClick={() => {
                            dispatch(setDialogueview(''));
                        }}
                    >
                        <i class="fas fa-times-circle"></i>
                    </button>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">{props.children}</DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}
