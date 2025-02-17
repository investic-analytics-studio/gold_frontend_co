import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";
import { AuthContextProvider, useAuthContext } from "./context/authContext";
import { InitialPageProvider } from "./context/initialPageContext";

function InnerApp() {
  const user = useAuthContext();
  return <RouterProvider router={router} context={{ user }} />;
}

function App() {
  return (
    <InitialPageProvider>
      <AuthContextProvider>
        <InnerApp />
      </AuthContextProvider>
    </InitialPageProvider>
  );
}

export default App;
