import { PDFViewer } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";
import { Dialog } from "@mui/material";

const PdfPreviewer = ({ open, onClose, priceOfferDetails, userInfo }) => {
    return (
        <Dialog open={open} onClose={onClose}
            PaperProps={{
                style: { width: '100%', height: '100%' }
            }} 
        >   
            <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar={false}>
                <PdfDocument priceOfferDetails={priceOfferDetails} userInfo={userInfo} />
            </PDFViewer> 
        </Dialog>
    );
};

export default PdfPreviewer;
