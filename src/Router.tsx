import { createBrowserRouter } from "react-router";

import Results from "./pages/Results";
import Home from "./pages/Home";
import HomeOutlet from "./components/HomeOutlet";
import Folder from "./pages/Folder";
import { fetchFolder } from "./hooks/useFolder";
import { File } from "./lib/types/file.interface";
import Auth from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeOutlet,
    children: [
      { index: true, Component: Home },
      { path: '/auth', Component: Auth },
      {
        path: "results",
        children: [
          { index: true, Component: Results },
          {
            path: ":id", Component: Folder,

            loader: async ({ params }) => {
              if (!params.id) throw new Error("Folder id is required");
              const folder: File = await fetchFolder({ id: params.id });
              return folder;
            },
          },
        ],
      },
    ],
  }
]);

export default router;
