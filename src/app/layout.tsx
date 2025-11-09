"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role && path !== "/login") router.push("/login");
  }, [path, router]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f9fafb" }}>
        {/* Navbar */}
        <nav
          style={{
            backgroundColor: "#1e3a8a",
            color: "white",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() => router.push("/dashboard")}
          >
            CodeReviewX
          </div>

          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <button
              onClick={() => router.push("/dashboard")}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Dashboard
            </button>

            <button
              onClick={() => router.push("/about")}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              About
            </button>

            <button
              onClick={() => router.push("/contact")}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Contact
            </button>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#dc2626",
                border: "none",
                borderRadius: "6px",
                padding: "6px 14px",
                color: "white",
                cursor: "pointer",
                fontWeight: 500,
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Page content */}
        <main style={{ minHeight: "80vh", padding: "2rem" }}>{children}</main>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "#111827",
            color: "#d1d5db",
            textAlign: "center",
            padding: "1rem",
            fontSize: "0.9rem",
          }}
        >
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} <b>CodeReviewX</b> — Built for better code.
          </p>
          <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.85rem", color: "#9ca3af" }}>
            Empowering developers with AI-driven insights.
          </p>
        </footer>
      </body>
    </html>
  );
}
