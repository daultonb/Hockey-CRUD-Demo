import "./App.css";
import Navbar from "./components/Navbar";
import PlayersTable from "./components/players/PlayersTable";
import { ToastProvider } from "./components/ToastContainer";

function App() {
  return (
    <ToastProvider>
      <div className="App">
        <Navbar />
        <div className="app-content">
          <PlayersTable />
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
