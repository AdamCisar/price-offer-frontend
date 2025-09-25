import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import { ChromePicker } from 'react-color';
import _ from 'lodash';

export default function Editor({ show, element, onStop }) {
    const [color, setColor] = useState('#d3d3d3');
    const [showColorPicker, setShowColorPicker] = useState(false);
  
    const rect = element.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    const top = rect.top + scrollTop - 54;
    const left = rect.left + scrollLeft;

    const editorRef = useRef(null);
    const colorSettingRef = useRef(null);
    const colorPickerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (!editorRef.current || !element) {
                return;
            }

            if (
                (!editorRef.current.contains(event.target) &&
                !element.contains(event.target) &&
                !colorSettingRef?.current?.contains(event.target)) ||
                element.contains(event.target) && colorPickerRef.current
            ) {
                onStop();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [element, onStop]);

    if (!show) {
        return null;
    }

    const applyStyle = (styleKey, value) => {
        const selection = window.getSelection();

        if (!selection || selection.rangeCount === 0) {
            return;
        }

        if (styleKey === "bold") {
            document.execCommand("bold");
        } else if (styleKey === "color") {
            document.execCommand("foreColor", false, value);
        }
    };

    return (
        <Box>
            <Box
                onMouseDown={(e) => e.preventDefault()} 
                className='editor'
                ref={editorRef}
                sx={{
                    position: 'absolute',
                    top: top,
                    left: left,
                    background: 'white',
                    border: '1px solid lightgrey',
                    height: '36px',
                    padding: 1,
                    zIndex: 1000,
                    borderRadius: '4px',
                }}
            >

                <Stack direction="row">
                    <IconButton
                        onClick={() => {
                            applyStyle('bold');
                        }}
                          sx={{
                            '&:hover': {
                            color: 'primary.main',
                            },
                        }}
                    >
                        <FormatBoldIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => setShowColorPicker(!showColorPicker)}
                    >
                    <Box
                        sx={{
                        width: 16,
                        height: 16,
                        bgcolor: color,
                        borderRadius: '50%',
                        }}
                    />
                    </IconButton>
                </Stack>
            </Box>

            {showColorPicker && (
                <Box
                    onMouseDown={(e) => e.preventDefault()} 
                    ref={colorSettingRef}
                    sx={{
                        position: 'absolute',
                        top: top - 255,
                        left: left,
                        zIndex: 1100,
                    }}
                >
                    <ChromePicker
                        ref={colorPickerRef}
                        onMouseDown={(e) => e.preventDefault()} 
                        color={color}
                        onChange={(newColor) => {
                            setColor(newColor.hex);
                            applyStyle('color', newColor.hex);
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}
