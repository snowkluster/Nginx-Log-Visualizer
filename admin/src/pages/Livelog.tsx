import Navbar from "../components/Navbar/Navbar";
import User from "../components/User/User";

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

interface PlotProps {
  logs: LogData[];
  error: string | null;
}

const Livelogs:  React.FC<PlotProps> = ({ logs, error }) => {
  return (
    <>
    <Navbar />
        <h2>Additional Information</h2>
        <User logs={logs} error={error}/>
    </> 
  );
}

export default Livelogs