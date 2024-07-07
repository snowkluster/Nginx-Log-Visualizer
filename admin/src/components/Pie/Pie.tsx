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

interface HttpVerbsPieProps {
  logs: LogData[];
  error: string | null;
}

const HttpVerbsPie: React.FC<HttpVerbsPieProps> = ({ logs, error }) => {
  const verbColors: { [key: string]: string } = {
    GET: '#8884d8',
    POST: '#82ca9d',
    PUT: '#ffc658',
    DELETE: '#ff7300',
  };

  const httpVerbs: { [key: string]: number } = {};
  logs.forEach(log => {
    const verb = log.method;
    httpVerbs[verb] = (httpVerbs[verb] || 0) + 1;
  });

  const data = Object.keys(httpVerbs).map(verb => ({
    name: verb,
    value: httpVerbs[verb],
    fill: verbColors[verb] || '#000000'
  }));

  return (
    <div className="pdf-element">
      {error && <div>Error: {error}</div>}
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
        <Tooltip />
        <Legend />
      </PieChart>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        Displays the distribution of HTTP verbs
      </div>
    </div>
  );
}

export default HttpVerbsPie;
