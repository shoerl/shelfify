import { useTheme } from '@mui/material/styles';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface AcquisitionChartProps {
  data: { month: string; count: number }[];
}

export function AcquisitionChart({ data }: AcquisitionChartProps) {
  const theme = useTheme();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill={theme.palette.primary.main} />
      </BarChart>
    </ResponsiveContainer>
  );
}
