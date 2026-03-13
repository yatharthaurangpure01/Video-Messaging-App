import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div
      style={{
        background: "#080808",
        color: "#f9f9f7",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "16px",
        lineHeight: 1.6,
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
