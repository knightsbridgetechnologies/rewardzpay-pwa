import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"]
});

export const metadata = {
  title: "RewardzPay",
  description: "Developed by Knightsbridge",
  manifest: "/manifest.json"
};

export const viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
