import Button from "@/components/myUi/button";
import FormInput from "@/components/myUi/FormInput";
import React from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center bg-purple-200 rounded-2xl border-2 border-purple-400 px-5 w-xs md:w-xl h-2/3">
        <h1 className="text-3xl font-bold text-center py-3">Register</h1>
        <div className="py-3 w-xs">
          <FormInput name="name" label="Name" type="text" />
        </div>
        <div className="w-xs ">
          <FormInput name="email" label="Email" type="email" />
        </div>
        <div className="py-3 w-xs">
          <FormInput name="address" label="Address" type="text" />
        </div>
        <div className="py-3 w-xs">
          <FormInput name="password" label="Password" type="password" />
        </div>
        <div className="py-3 w-xs">
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
        </div>
        <div className="pb-3 flex items-center justify-between">
          <input
            type="checkbox"
            className="w-4 h-4 mx-1 text-purple-600 bg-gray-100 dark:bg-gray-700"
          />
          <label htmlFor="terms">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-purple-600 hover:underline dark:text-purple-400"
              >
                Terms and Conditions
              </Link>
            </span>
          </label>
        </div>
        <div className="py-3">
          <Button
            nameOfTheButton="Register"
            functionOnClick={() => {}}
            buttonClassName="bg-purple-500 text-white py-2 px-4 rounded-md"
          />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:underline dark:text-purple-400"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
