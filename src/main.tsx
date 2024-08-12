import ReactDOM from "react-dom/client";
import Router from "@/main/routes/router";

import "@nimbus-ds/styles/dist/index.css";
import "@nimbus-ds/styles/dist/themes/dark.css";
import "@/presentation/styles/reset.css";
import { ToDos } from "./presentation/pages/ToDos/ToDos";

ReactDOM.createRoot(document.getElementById("root")!).render(<ToDos />);
