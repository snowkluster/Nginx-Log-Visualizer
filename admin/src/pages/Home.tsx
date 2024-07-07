import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import Live from "../components/Live/Live";
import Plot from "../components/plots/Plot";
import TimePie from "../components/Time/Time";
import HttpVerbsPie from "../components/Pie/Pie";

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

interface HomeProps {
    logs: LogData[];
    error: string | null;
}

const Home: React.FC<HomeProps> = ({ logs, error }) => {
    return (
        <>
            <Navbar />
            <div>
                <Live logs={logs} error={error} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Plot logs={logs} error={error} />
                    <TimePie logs={logs} error={error} />
                    <HttpVerbsPie logs={logs} error={error} />
                </div>
            </div>
        </>
    );
}

export default Home;
