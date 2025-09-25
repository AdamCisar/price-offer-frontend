import Paper from '@mui/material/Paper';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import _ from 'lodash';
import { DataGrid, GridRow, GridCell } from '@mui/x-data-grid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Editor from '../utilities/Editor';

const localeText = {
  // Pagination
  noRowsLabel: 'Žiadne riadky',
  noResultsOverlayLabel: 'Žiadne výsledky',
  errorOverlayDefaultLabel: 'Niečo sa pokazilo.',
  page: 'Strana',
  // Column menu
  columnMenuLabel: 'Menu stĺpca',
  columnMenuShow: 'Zobraziť',
  columnMenuUnsort: 'Zrušiť triedenie',
  columnMenuSortAsc: 'Triediť vzostupne',
  columnMenuSortDesc: 'Triediť zostupne',
};

function RichTextEditCell(props) {
  const { id, field, value, api } = props;
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current && value !== divRef.current.innerHTML) {
      divRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    const html = divRef.current.innerHTML;
    api.setEditCellValue({ id, field, value: html });
  };

  return (
    <div
      ref={divRef}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      style={{
        outline: "none",
        width: "100%",
        height: "100%",
        marginLeft: "10px",
        cursor: "text",
      }}
    />
  );
}

const CustomRowWrapper = ({ row, index, ...rest }) => {
  const rowRef = React.useRef(null);
  return (
    <Draggable
      key={`row-${row.id}`}
      draggableId={`row-${row.id}`}
      index={index}
    >
      {(provided, snapshot) => {
        return (
          <GridRow
            index={index}
            row={row}
            {...rest}
            ref={(el) => {
              rowRef.current = el;
              provided.innerRef(el);
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              backgroundColor: snapshot.isDragging ? '#f2f2f2' : 'inherit',
              borderBottom: snapshot.isDragging ? '1px solid var(--DataGrid-rowBorderColor)' : 'inherit',
              top: rest.offsetTop,
              left: rest.offsetLeft
            }}
          >
            <GridCell>{row.id}</GridCell>
            <GridCell>{row.name}</GridCell>
            <GridCell>{row.age}</GridCell>
          </GridRow>
            
        );
      }}
    </Draggable>
  );
};

const handleCellEditChange = (value) => {
  let cleanedInput = value.replace(/,/g, '.');

  const validInput = cleanedInput.replace(/(?!^-)[^0-9.]/g, '');
  const dotCount = validInput.split('.').length - 1;

  if (dotCount > 1) {
      return validInput.split('.')[0] + '.' + validInput.split('.').slice(1).join('').substring(0, validInput.indexOf('.') + 1);
  }

  return validInput;
};

const PriceOfferItems = React.memo(({ 
  priceOfferItems, 
  toggleSelectedRowButton, 
  setSelectedItems, 
  setPriceOfferDetails, 
  calculateTotalPriceForItem,
  isVat
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [element, setElement] = useState(null);
  const dataGridRef = useRef(null);
  const rows = useMemo(() => priceOfferItems, [priceOfferItems]);

  const columns = [
    {
      field: "title",
      headerName: "Názov",
      width: isVat ? 425 : 510,
      editable: true,
      renderEditCell: (params) => <RichTextEditCell {...params} />,
      renderCell: (params) => (
        <div dangerouslySetInnerHTML={{ __html: params.value }} />
      ),
    },
    { field: 'unit', headerName: 'Merná jednotka', width: 80, editable: true },
    { field: 'quantity', headerName: 'Množstvo', width: 100, editable: true,
      renderCell: (params) => (Number(params.value).round()),
      valueParser: (value, row, column, apiRef) => {
        return handleCellEditChange(value);
      },
    },
    { field: 'price', headerName: (isVat ? 'Cena bez DPH' : 'Cena'), width: 110, 
      renderCell: (params) => (Number(params.value).round()), editable: true,
      valueParser: (value, row, column, apiRef) => {
        return handleCellEditChange(value);
      },
    },
    ...(isVat ? [{ field: "vat", headerName: "DPH %", width: 80, editable: false,
        renderCell: (params) => (Number(params.value).round()),
        valueParser: (value, row, column, apiRef) => {
          return handleCellEditChange(value);
        },
        valueGetter: (params) => params ?? 23,
    }] : []),
    { field: 'total', headerName: (isVat ? 'Spolu bez DPH' : 'Spolu'), width: 115,
      renderCell: (params) => (Number(params.value).round()),
      valueParser: (value, row, column, apiRef) => {
        return handleCellEditChange(value);
      },
    },
  ];

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newReorderedItems = Array.from(rows);
    const [removed] = newReorderedItems.splice(result.source.index, 1);
    newReorderedItems.splice(result.destination.index, 0, removed);

    const updatedItems = newReorderedItems.map((item, index) => ({
      ...item,
      ordering: index + 1,
    }));

    setPriceOfferDetails(prevData => ({
      ...prevData,
      items: updatedItems
    }))
  };
  
  const handleItemSelection = useCallback((ids) => {
    setSelectedItems(ids);
    toggleSelectedRowButton(ids);
  }, [setSelectedItems, toggleSelectedRowButton]);

  const processRowUpdate = useCallback((newRow) => {
    const calculatedItem = calculateTotalPriceForItem(newRow);
    const items = rows.map(item => 
      item.item_id === newRow.item_id ? calculatedItem : item
    );

    if (JSON.stringify(priceOfferItems) === JSON.stringify(items)) {
      return newRow;
    }

    setPriceOfferDetails(prevData => ({
      ...prevData,
      items,
    }));

    return newRow;
  }, [calculateTotalPriceForItem, rows, setPriceOfferDetails]);

  const handleProcessRowUpdateError = (error) => {
    console.error('processRowUpdateError', error);
  };

  const handleEditStart = (params) => {
    if (params.field !== 'title') {
      return;
    }

    const cell = document.querySelector(
      `[data-id='${params.id}'] [data-field='${params.field}']`
    );

    if (!cell) {
      return;
    }

    setElement(cell);
    setIsEditing(true);
  };

  const onStop = () => {
    const field = element.getAttribute('data-field');

    if (field !== 'title') {
      return;
    }

    dataGridRef.current.stopCellEditMode({id: element.closest('.MuiDataGrid-row').getAttribute('data-id'),  field});

    setElement(null);
    setIsEditing(false);
  };

  const handleEditStop = (params, event) => {
    if (!event?.target?.closest('.editor')) {
      return;
    }

    event.defaultMuiPrevented = true;
  };

  return (
    <Paper sx={{ height: 'auto', width: '100%' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="data-grid">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <DataGrid
                  apiRef={dataGridRef}
                  checkboxSelection
                  disableColumnResize 
                  localeText={localeText}
                  autoHeight
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.item_id ?? row.id}
                  pageSizeOptions={[5, 10, 25, 50, 100]}
                  onRowSelectionModelChange={handleItemSelection}
                  processRowUpdate={processRowUpdate}
                  onProcessRowUpdateError={handleProcessRowUpdateError}
                  disableRowSelectionOnClick
                  sx={{ border: 0 }} 
                  slots={{
                    row: CustomRowWrapper,
                  }}
                  onCellEditStart={handleEditStart}
                  onCellEditStop={handleEditStop}
                />
                    {provided.placeholder}
              </div>
            )}
          </Droppable>
      </DragDropContext>

       {isEditing && (
        <Editor
          show={isEditing}
          element={element}
          onStop={onStop}
        />
      )}
    </Paper>
  );
}, (prevProps, nextProps) => {
  return (
    _.isEqual(prevProps.priceOfferItems, nextProps.priceOfferItems) &&
    _.isEqual(prevProps.selectedItems, nextProps.selectedItems) &&
    _.isEqual(prevProps.isVat, nextProps.isVat)
  );
});

export default PriceOfferItems;
