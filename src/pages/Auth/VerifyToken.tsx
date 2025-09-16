import React from "react";
interface VerifyTokenProps {
  email: string;
}
const VerifyToken: React.FC<VerifyTokenProps> = ({ email }) => {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <main className="flex flex-col items-center justify-center border-2 border-blue-400 rounded-2xl w-xs md:w-xl px-5 h-2/3">
        <h1 className="text-3xl font-bold text-center py-3">
          Verify Token for{" "}
          <span className="text-blue-600 dark:text-blue-400">{email}</span>
        </h1>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the verification code sent to your email address.
          </p>
        </div>
        <div className="py-3 flex items-center justify-between flex-col">
          <input
            type="text"
            className="w-full px-3 py-2 border text-xl border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
            placeholder="Verification Code"
          />
          <div className="py-3">
            <button className="text-xl bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md">
              Verify
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Don't get the code?{" "}
          <span
            onClick={() => alert("Resend Code")}
            className="text-blue-600 px-4 cursor-pointer rounded-md hover:underline dark:text-blue-400"
          >
            Resend Code
          </span>
        </p>
      </main>
    </section>
  );
};

export default VerifyToken;
