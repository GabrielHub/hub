import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function EditPlayerModal(props) {
  const { open, handleClose, ftPerc, alias, setIsLoading } = props;
  const [ftPercField, setFTPercField] = useState(ftPerc);
  // * Aliases are separated  by commas
  const [aliasField, setAliasField] = useState(alias.toString());

  const handleUpdate = async () => {
    setIsLoading(true);

    setIsLoading(false);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Edit Player Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please add any aliases (usernames you have used) and update your FT%
        </DialogContentText>
        <TextField
          autoFocus
          value={ftPercField}
          onChange={(e) => setFTPercField(e.target.value)}
          margin="dense"
          label="FT%"
          type="number"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          value={aliasField}
          onChange={(e) => setAliasField(e.target.value)}
          margin="dense"
          label="FT%"
          helperText="Separate each alias with a comma with no spaces"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

EditPlayerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  ftPerc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  alias: PropTypes.arrayOf(PropTypes.string).isRequired,
  setIsLoading: PropTypes.func.isRequired
};

export default {};
