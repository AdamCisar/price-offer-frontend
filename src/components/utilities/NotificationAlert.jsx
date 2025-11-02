import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import React from "react";

function NotificationAlert() {
    const [open, setOpen] = React.useState(true);

    if (Notification.permission === "granted") {
        return '';
    }

    return (
        <Dialog
            open={open}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{textAlign: "center", fontWeight: "bold"}}>
                Pre správne fungovanie aktualizácie cien, 
                povoľte notifikácie vo vašom prehliadači.
                </DialogTitle>
            <DialogContent>
            <Box display="flex" justifyContent="center">
                <img
                    src="/notification.png"
                    alt="Notification"
                    style={{ width: "100%", maxWidth: 800 }}
                />
            </Box>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
                Zatvoriť
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default NotificationAlert;
