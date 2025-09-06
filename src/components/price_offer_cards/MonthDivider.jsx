import { Tooltip } from "@mui/material";

let lastMonth = null;

export default function MonthDivider({index, date}) {
    const monthYear = new Date(date).toLocaleString("sk-SK", { month: "long", year: "numeric" });
    const formatted = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);

    if (lastMonth === formatted && index !== 0) {
        return null;
    }

    lastMonth = formatted;

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                margin: '24px 0',
                color: '#555',
                fontWeight: '600',
                fontSize: '1.1rem',
                fontFamily: 'Arial, sans-serif',
            }}

            className="month-divider"
        >
            <Tooltip title="Dátum vytvorenia cenovej ponuky">
                <span style={{ margin: '0 12px', whiteSpace: 'nowrap', display: 'inline-block' }}>
                    {formatted}
                </span>
            </Tooltip>

            <div className="month-divider-line" style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
        </div>
    );
}