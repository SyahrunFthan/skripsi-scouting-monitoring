import React, { useEffect, useState } from "react";
import { getItem, postAuthLoginApi, setItem } from "../../utils";
import { useNavigate } from "react-router-dom";
import { ProgresComponents } from "../../components";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await postAuthLoginApi({ email, password });
      if (response?.status == 200) {
        const data = {
          userId: response?.data?.userId,
          token: response?.data?.token,
        };
        setItem("profile", data);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      if (error?.response?.status == 400) {
        const errorMessages = {};
        const errors = error.response.data.error;
        errors.forEach((err) => {
          let find = err.path.map((item) => item);
          errorMessages[find] = err?.message;

          Object.keys(errorMessages).forEach((key) => {
            const message = errorMessages[key];
            const fields = key.split(",");

            fields.forEach((field) => {
              errorMessages[field.trim()] = message;
            });
          });
        });

        setErrors(errorMessages);
      } else {
        console.log(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const user = getItem("profile");
    if (user) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen px-2 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/background.JPG')" }}
    >
      <div className="flex flex-col w-[90%] lg:w-[30%] fixed top-56 z-10 bg-white/70 p-4 rounded-md shadow-md">
        <div className="flex items-center gap-3">
          <img
            src="/assets/images/scout.png"
            className="w-12 h-12 rounded-full"
            alt=""
          />
          <div>
            <h1 className="text-xl font-semibold text-black">Scouting</h1>
            <h1 className="text-xl font-semibold text-black mt-[-10px]">
              Monitoring
            </h1>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className={`input input-md input-bordered text-sm bg-white text-black ${
                  errors?.email && "input-error"
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-[-5px]">
                  {errors?.email}
                </p>
              )}
            </div>
            <div className="mb-3 flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className={`input input-md input-bordered text-sm bg-white text-black ${
                  errors?.password && "input-error"
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-[-5px]">
                  {errors?.password}
                </p>
              )}
            </div>
            <div className="mb-3 flex flex-col gap-2">
              <button
                type="submit"
                className="btn mt-4 bg-black text-white outline-none border-none"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>

      {isSubmitting && <ProgresComponents />}
    </div>
  );
};

export default Auth;
