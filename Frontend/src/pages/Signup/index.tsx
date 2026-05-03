import { ShipWheelIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import signupImg from "../../assets/signup.png";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex border-primary/25 border-2 rounded-lg min-w-4xl">
        <div className="flex-1 p-4 justify-between w-full space-y-4">
          <div className="w-full flex flew-row items-center gap-2">
            <ShipWheelIcon className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-wide">
              DoodleMeet
            </span>
          </div>
          <form onSubmit={() => alert("form submitted")}>
            <div className="w-full space-y-12">
              <div className="w-full space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold">Create an Account</h2>
                  <p className="text-sm text-muted-foreground">
                    Join the fun and start doodling with your friends!
                  </p>
                </div>
                <div className="form-control w-full">
                  <label
                    htmlFor="name"
                    className="label"
                  >
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="input input-bordered w-full"
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label
                    htmlFor="email"
                    className="label"
                  >
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    className="input input-bordered w-full"
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label
                    htmlFor="password"
                    className="label"
                  >
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="******"
                    className="input input-bordered w-full"
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                  <p className="text-xs text-muted-foreground opacity-70 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>
                <div className="form-control w-full">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      required
                    />
                    <span className="text-sm label-text">
                      I agree to{" "}
                      <span className="text-primary hover:underline">
                        terms and conditions
                      </span>{" "}
                      and{" "}
                      <span className="text-primary hover:underline">
                        privacy policy
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center space-y-2">
                <button
                  className="btn btn-primary w-full"
                  type="submit"
                >
                  Create Account
                </button>
                <p className="text-sm text-muted-foreground opacity-70">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="flex-1 bg-primary/10 justify-center items-center">
          <img
            src={signupImg}
            alt="signup image here"
            className="w-full max-h-[80%] object-cover max-w-2xl"
          />
          <div className="text-center pt-4">
            <h2 className="text-2xl font-bold leading-10">Join the Fun!</h2>
            <p className="text-sm text-muted-foreground">
              Create an account and start doodling with your friends!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
