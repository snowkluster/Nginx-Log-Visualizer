import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

interface LogData {
  _id: string;
  remote: string;
  host: string;
  user: string;
  method: string;
  path: string;
  code: string;
  size: string;
  referer: string;
  agent: string;
  time: string;
}

interface TimePieProps {
  logs: LogData[];
  error: string | null;
}

const TimePie: React.FC<TimePieProps> = ({ logs, error }) => {
  const timeCounts: { [key: string]: number } = {};
  logs.forEach(log => {
    const date = new Date(log.time);
    const hour = date.getHours();
    const timeInterval = `${hour}:00`;
    timeCounts[timeInterval] = (timeCounts[timeInterval] || 0) + 1;
  });

  const timeColors: { [key: string]: string } = {
    '0:00': '#8884d8',
    '1:00': '#82ca9d',
    '2:00': '#ffc658',
    '3:00': '#ff7300',
    '4:00': '#0088FE',
    '5:00': '#00C49F',
    '6:00': '#FFBB28',
    '7:00': '#FF8042',
    '8:00': '#5B6C5D',
    '9:00': '#FDC500',
    '10:00': '#F98400',
    '11:00': '#588C73',
    '12:00': '#FF6B6B',
    '13:00': '#FFE66D',
    '14:00': '#B5EAD7',
    '15:00': '#B5EAD7',
    '16:00': '#D4A5A5',
    '17:00': '#D4A5A5',
    '18:00': '#92A8D1',
    '19:00': '#92A8D1',
    '20:00': '#C8C8A9',
    '21:00': '#C8C8A9',
    '22:00': '#E1BC29',
    '23:00': '#E1BC29'
  };

  const data = Object.keys(timeCounts).map(interval => ({
    time: interval,
    count: timeCounts[interval],
    fill: timeColors[interval] || '#000000'
  }));

  return (
    <div className="pdf-element">
      {error && <div>Error: {error}</div>}
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="count" cx="50%" cy="50%" outerRadius={80} label />
        <Tooltip formatter={(value: number) => `${value} requests`} />
        <Legend />
      </PieChart>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        Distribution of requests over hours of the day
      </div>
    </div>
  );
}

export default TimePie;
