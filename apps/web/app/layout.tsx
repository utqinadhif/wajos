import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wa Joss",
    description: "Wa paling joss",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
