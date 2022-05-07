import { Typography } from "antd";
import { Link } from "react-router-dom";
import { Box } from "./Styled";

const { Title } = Typography;

interface ErrorStatus {
  errorStatus?: number;
  errorStatusText: string;
  errorDescription?: string;
}
const ErrorPage = (error: ErrorStatus) => (
  <div
    className="Full-window-layout position-fixed"
    style={{
      /*
        position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1,
      */
      backgroundColor: "rgba(255,255,255,.9)",
    }}
  >
    <div className="text-center">
      <svg
        viewBox="0 0 16 16"
        width="1em"
        height="1em"
        focusable="false"
        role="img"
        aria-label="exclamation circle"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        style={{ opacity: "0.8", fontSize: "1000%", color: "var(--ant-error-color)", marginBottom: "1.5rem" }}
      >
        <g>
          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"></path>
        </g>
      </svg>

      {error.errorStatus && (
        <Box fontSize={64} color="black" mb={4} mt={2} ml={0}>
          {error.errorStatus}
        </Box>
      )}
      <Title level={2}>{error.errorStatusText}</Title>
      {error.errorDescription && <p>{error.errorDescription}</p>}
      <Link to="/">Перейти на главную страницу</Link>
    </div>
  </div>
);

export const Error404 = () => <ErrorPage {...{ errorStatus: 404, errorStatusText: "Not Found" }} />;
