import React, { useState, useContext, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useUniversalPost } from '../../api/UniversalPost';
import { SnackBarContext } from '../../providers/SnackBarProvider';
import useSubmitPriceOfferItem from '../../hooks/useSubmitPriceOfferItem';

const FIELD_OPTIONS = [
  { value: '', label: 'Preskočiť' },
  { value: 'title', label: 'Názov' },
  { value: 'unit', label: 'Merná jednotka' },
  { value: 'quantity', label: 'Množstvo' },
  { value: 'price', label: 'Cena' },
];

// Keywords for auto-detecting column mapping from header text
const AUTO_MAPPING_RULES = [
  { field: 'title', keywords: ['popis', 'nazov', 'název', 'name', 'položka', 'polozka'] },
  { field: 'unit', keywords: ['mj', 'jednotka', 'unit', 'merná'] },
  { field: 'quantity', keywords: ['množstvo', 'mnozstvo', 'qty', 'quantity', 'počet', 'pocet'] },
  { field: 'price', keywords: ['jednotková', 'jednotkova', 'unit price', 'cena/j', 'j.cena', 'cena bez'] },
];

const detectHeaderRowIndex = (rows) => {
  for (let i = 0; i < rows.length; i++) {
    const nonEmpty = rows[i].filter((cell) => cell !== null && cell !== undefined && cell !== '');
    if (nonEmpty.length >= 3) return i;
  }
  return 0;
};

const autoDetectMapping = (headers) =>
  headers.reduce((acc, header, i) => {
    const normalized = String(header ?? '').toLowerCase().trim();
    const matched = AUTO_MAPPING_RULES.find((rule) =>
      rule.keywords.some((kw) => normalized.includes(kw))
    );
    return { ...acc, [i]: matched?.field ?? '' };
  }, {});

const isDataRow = (row) => {
  const nonEmpty = row.filter((cell) => cell !== null && cell !== undefined && cell !== '');
  return nonEmpty.length >= 2;
};

const isValidItem = (item) => {
  const hasTitle = item.title !== undefined && item.title !== null && String(item.title).trim() !== '';
  const hasPrice = item.price !== undefined && item.price !== null && !isNaN(Number(item.price)) && item.price !== '';
  return hasTitle && hasPrice;
};

const ExcelImportModal = ({ open, onClose, excelRows }) => {
  const headerRowIndex = detectHeaderRowIndex(excelRows ?? []);
  const headers = excelRows?.[headerRowIndex] ?? [];
  const allDataRows = excelRows?.slice(headerRowIndex + 1) ?? [];
  const dataRows = allDataRows;
  const previewRows = allDataRows.filter(isDataRow).slice(0, 3);

  const [mapping, setMapping] = useState(() => autoDetectMapping(headers));
  const [isImporting, setIsImporting] = useState(false);

  const [sendData] = useUniversalPost('ITEM');
  const { handleSnackbarOpen } = useContext(SnackBarContext);
  const { addPriceOfferItemToContext } = useSubmitPriceOfferItem(onClose);

  const usedFields = useMemo(
    () => new Set(Object.values(mapping).filter(Boolean)),
    [mapping]
  );

  const handleMappingChange = (colIndex, value) => {
    setMapping((prev) => ({ ...prev, [colIndex]: value }));
  };

  const buildItemFromRow = (row) => {
    const item = {};
    Object.entries(mapping).forEach(([colIndex, field]) => {
      if (field) item[field] = row[colIndex] ?? '';
    });
    return item;
  };

  const handleImport = async () => {
    setIsImporting(true);
    try {
      const created = [];

      for (const row of dataRows) {
        const item = buildItemFromRow(row);
        if (!isValidItem(item)) continue;

        const payload = {
          title: String(item.title).slice(0, 255),
          unit: item.unit ? String(item.unit) : '',
          price: Number(item.price),
          url: [{ shop: 'ptacek', url: '' }],
        };

        const result = await sendData(payload);
        result.item_id = result.id;
        if (item.quantity) result.quantity = Number(item.quantity);
        created.push(result);
      }

      if (created.length > 0) {
        addPriceOfferItemToContext(created);
        handleSnackbarOpen(`Importovaných ${created.length} položiek`, 'success');
      } else {
        handleSnackbarOpen('Žiadne položky na import', 'warning');
      }

      onClose();
    } catch (err) {
      handleSnackbarOpen('Import zlyhal', 'error');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false} PaperProps={{ sx: { width: '95vw', maxWidth: '95vw' } }}>
      <DialogTitle>Import z Excelu</DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {headers.map((header, i) => (
                  <TableCell key={i} sx={{ verticalAlign: 'bottom', pb: 1 }}>
                    <Typography variant="caption" display="block" sx={{ mb: 0.5, fontWeight: 600 }}>
                      {String(header ?? '').charAt(0).toUpperCase() + String(header ?? '').slice(1)}
                    </Typography>
                    <FormControl size="small" fullWidth>
                      <Select
                        value={mapping[i] ?? ''}
                        onChange={(e) => handleMappingChange(i, e.target.value)}
                        displayEmpty
                      >
                        {FIELD_OPTIONS.map((opt) => (
                          <MenuItem
                            key={opt.value}
                            value={opt.value}
                            disabled={opt.value !== '' && usedFields.has(opt.value) && mapping[i] !== opt.value}
                          >
                            {opt.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {previewRows.map((row, ri) => (
                <TableRow key={ri}>
                  {headers.map((_, ci) => (
                    <TableCell key={ci}>{row[ci] ?? ''}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Zobrazené prvé 3 dátové riadky z {dataRows.length} riadkov.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={isImporting}>
          Zrušiť
        </Button>
        <Button
          onClick={handleImport}
          color="primary"
          variant="contained"
          disabled={isImporting}
          startIcon={isImporting ? <CircularProgress size={16} /> : null}
        >
          Importovať
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExcelImportModal;
