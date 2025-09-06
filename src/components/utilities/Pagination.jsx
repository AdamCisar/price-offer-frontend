import { Pagination as MUIPagination, Stack } from "@mui/material";

export default function Pagination(props) {
    const handleChange = (event, value) => {
        props.onChange(event, value);
    };

    return (
        <Stack
            spacing={4}
            alignItems="center"
            sx={{ m: 4 }}
            className="pagination"
        >
            <MUIPagination
                count={props.pageCount || 1}
                page={props.page || 1}
                onChange={handleChange}
                size="large"
                sx={{
                    "& .MuiPaginationItem-root": {
                        fontSize: "1.1rem",
                        marginX: "6px",
                    },
                }}
            />
        </Stack>
    );
}