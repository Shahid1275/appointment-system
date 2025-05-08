// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { setToken } from "../redux/features/doctors/doctorSlice";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [state, setState] = useState("Sign Up");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { backendUrl } = useSelector((state) => state.doctor);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       // Basic client-side validation
//       if (!email || !password) {
//         throw new Error("Email and password are required");
//       }

//       if (state === "Sign Up" && !name) {
//         throw new Error("Name is required for registration");
//       }

//       if (password.length < 8) {
//         throw new Error("Password must be at least 8 characters");
//       }

//       const endpoint = state === "Sign Up" ? "register" : "login";
//       const requestData =
//         state === "Sign Up" ? { name, email, password } : { email, password };

//       const response = await axios.post(
//         `${backendUrl}/api/user/${endpoint}`,
//         requestData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.data.success) {
//         throw new Error(response.data.message || "Request failed");
//       }

//       // Handle successful response
//       if (state === "Sign Up") {
//         toast.success("Registration successful!");
//         setState("Login");
//         setName("");
//       } else {
//         dispatch(setToken(response.data.token));
//         localStorage.setItem("token", response.data.token);
//         toast.success("Login successful!");
//         navigate("/"); // Redirect after login
//       }

//       setEmail("");
//       setPassword("");
//     } catch (error) {
//       console.error("Authentication error:", error);

//       // Get detailed error message from server response if available
//       const serverMessage = error.response?.data?.message;
//       const validationError = error.response?.data?.error;
//       const errorMessage = serverMessage || validationError || error.message;

//       toast.error(errorMessage);

//       // Log full error for debugging
//       if (error.response) {
//         console.log("Full error response:", error.response.data);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
//       <div className="flex flex-col gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
//         <p className="text-2xl font-semibold">
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </p>
//         <p>
//           Please {state === "Sign Up" ? "Sign Up" : "Login"} to book an
//           appointment
//         </p>

//         {state === "Sign Up" && (
//           <div className="w-full">
//             <p>Full Name</p>
//             <input
//               className="border border-zinc-300 rounded w-full p-2 mt-1"
//               type="text"
//               placeholder="Enter Your Name"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               required
//             />
//           </div>
//         )}

//         <div className="w-full">
//           <p>Email</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="email"
//             placeholder="Enter Email here"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             required
//           />
//         </div>

//         <div className="w-full">
//           <p>Password</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="password"
//             placeholder="Enter Your Password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//             minLength="8"
//           />
//           {state === "Sign Up" && (
//             <p className="text-xs text-gray-500 mt-1">
//               Password must be at least 8 characters
//             </p>
//           )}
//         </div>

//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md text-base disabled:bg-blue-400"
//           type="submit"
//           disabled={loading}
//         >
//           {loading
//             ? "Processing..."
//             : state === "Sign Up"
//             ? "Create Account"
//             : "Login"}
//         </button>

//         {state === "Sign Up" ? (
//           <p className="text-center mt-2">
//             Already have an account?{" "}
//             <button
//               type="button"
//               onClick={() => setState("Login")}
//               className="text-blue-600 underline cursor-pointer bg-transparent border-none"
//             >
//               Login here
//             </button>
//           </p>
//         ) : (
//           <p className="text-center mt-2">
//             Create a new account?{" "}
//             <button
//               type="button"
//               onClick={() => setState("Sign Up")}
//               className="text-blue-600 underline cursor-pointer bg-transparent border-none"
//             >
//               Click here
//             </button>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {
  setToken,
  fetchUserProfile,
} from "../redux/features/doctors/doctorSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Basic client-side validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      if (state === "Sign Up" && !name) {
        throw new Error("Name is required for registration");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      const endpoint = state === "Sign Up" ? "register" : "login";
      const requestData =
        state === "Sign Up" ? { name, email, password } : { email, password };

      const response = await axios.post(
        `${backendUrl}/api/user/${endpoint}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Request failed");
      }

      // Handle successful response
      if (state === "Sign Up") {
        toast.success("Registration successful!");
        setState("Login");
        setName("");
      } else {
        const token = response.data.token;
        dispatch(setToken(token));
        localStorage.setItem("token", token);

        // Fetch user profile after login
        await dispatch(fetchUserProfile()).unwrap();

        toast.success("Login successful!");
        navigate("/"); // Optionally redirect to "/my-profile"
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Authentication error:", error);

      const serverMessage = error.response?.data?.message;
      const validationError = error.response?.data?.error;
      const errorMessage = serverMessage || validationError || error.message;

      toast.error(errorMessage);

      if (error.response) {
        console.log("Full error response:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Sign Up" : "Login"} to book an
          appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            placeholder="Enter Email here"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            minLength="8"
          />
          {state === "Sign Up" && (
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md text-base disabled:bg-blue-400"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : state === "Sign Up"
            ? "Create Account"
            : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p className="text-center mt-2">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setState("Login")}
              className="text-blue-600 underline cursor-pointer bg-transparent border-none"
            >
              Login here
            </button>
          </p>
        ) : (
          <p className="text-center mt-2">
            Create a new account?{" "}
            <button
              type="button"
              onClick={() => setState("Sign Up")}
              className="text-blue-600 underline cursor-pointer bg-transparent border-none"
            >
              Click here
            </button>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
