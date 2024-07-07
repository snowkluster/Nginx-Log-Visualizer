import { useEffect, useRef } from "react";
import './Live.css'; 

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

interface LiveProps {
  logs: LogData[];
  error?: string | null;
}

export default function Live(props: LiveProps) {
  const logsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (logsRef.current) {
      const logs = logsRef.current.children;

      for (let i = 0; i < logs.length; i++) {
        const logElement = logs[i] as HTMLElement;
        logElement.style.animation = `fadeIn 0.3s ease ${i * 0.3}s forwards`;
      }
    }
  }, [props.logs]);

  const latestLogs = props.logs.slice(-8);

  return (
    <>
      <div className="live-container">
        {props.error ? (
          <p>Error fetching logs: {props.error}</p>
        ) : (
          <ul ref={logsRef} className="logs-list">
            {latestLogs.map((log) => (
              <li key={log._id}>
                <strong>Path:</strong> {log.path} | <strong>Code:</strong> {log.code} | <strong>Remote:</strong> {log.remote} | <strong>Host:</strong> {log.host} | <strong>Method:</strong> {log.method} | <strong>User:</strong> {log.user} | <strong>Size:</strong> {log.size} | <strong>User-Agent:</strong> {log.agent} | <strong>Referer:</strong> {log.referer} | <strong>Time:</strong> {log.time}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
