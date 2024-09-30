import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';
import { Button } from '@mui/material';

const PdfDownloadLink = ({priceOfferDetails, userInfo}) => {
    return (
        <PDFDownloadLink
            document={
                <PdfDocument 
                priceOfferDetails={priceOfferDetails} 
                userInfo={userInfo} />} 
                fileName={"cenova_ponuka_"+ (priceOfferDetails.customer?.name || 'bez_nazvu') + ".pdf"}> 
                {({ blob, url, loading, error }) => (
                <Button
                    variant="outlined"
                    color="secondary"
                    disabled={loading}
                    style={{ width: '100%' }} 
                >
                    {'Stiahnuť PDF'}
                </Button>
            )}
        </PDFDownloadLink>
    )
}

export default PdfDownloadLink