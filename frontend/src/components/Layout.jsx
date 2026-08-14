import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="app-layout">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="main-area">
        <Navbar onMenu={() => setOpen(true)} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
