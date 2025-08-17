import { useTheme } from '@mui/material/styles';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface GenreFormatBreakdownChartProps {
  data: { name: string; value: number }[];
}

export function GenreFormatBreakdownChart({ data }: GenreFormatBreakdownChartProps) {
  const theme = useTheme();
  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie dataKey="value" data={data} outerRadius={80} label>
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
