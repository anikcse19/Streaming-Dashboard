// import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigator=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) => {
    console.log(data)
    try {
      const response = await fetch(
        "https://testapi.epickstream.online/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );
      const result =await response.json();
      const token = result.token;
      Cookies.set("stream-token", token, { expires: 2 });
      navigator("/dashboard");

    } catch (error) {
      console.log("error occur", error);
    }


  };

  return (
    <div className="bg-[#b6c8fe] flex justify-center items-center min-h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="/login.jpg"
          alt="Placeholder"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Login Form */}
      <div className="lg:p-28 md:p-48 sm:p-20 p-12 w-full lg:w-1/2">
        <div className=" shadow-[#0B1D51] shadow-md p-8 rounded-md">
          <h1 className="text-2xl text-[#0B1D51] font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "email is required" })}
                className="w-full border  rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                {...register("remember")}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-green-900">
                Remember Me
              </label>
            </div>

            {/* Forgot Password Link */}
            <div className="mb-6 text-[#0B1D51]">
              <a href="#" className="hover:font-bold">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-[#0B1D51] hover:bg-gray-400 hover:text-black text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
