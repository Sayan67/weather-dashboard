import React from "react";
import Register from "./Register";
import Login from "./Login";

function Auth() {
  const [pageState, setPageState] = React.useState<"signup" | "login">(
    "signup"
  );
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="flex items-center mb-8 gap-2">
        <h1 className="text-xl font-bold text-green-700">Weather Dashboard</h1>
      </div>
      {pageState === "signup" ? <Register /> : <Login />}
    </div>
  );
}

export default Auth;
