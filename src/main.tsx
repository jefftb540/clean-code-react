import ReactDOM from "react-dom/client";
import Router from "@/main/routes/router";

import "@nimbus-ds/styles/dist/index.css";
import "@nimbus-ds/styles/dist/themes/dark.css";
import "@/presentation/styles/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<Router />);
