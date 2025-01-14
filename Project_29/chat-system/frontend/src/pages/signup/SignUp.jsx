import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		userName: "",
		password: "",
		confirmPassword: "",
	});

	const { loading, signup } = useSignup();


	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className="flex flex-col items-center justify-center min-w-[504px] mx-auto py-8 px-4">
			<div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-300 transition-all duration-300 ease-in-out hover:bg-gray-900 hover:shadow-2xl hover:border-yellow-500">
				<h1 className="text-3xl font-semibold text-center text-gray-300 mb-6">
					Sign Up <span className="text-blue-500 hover:text-red-400 transition-all duration-300 ease-in-out">ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="label p-2">
							<span className="text-base label-text">Full Name</span>
						</label>
						<input
							type="text"
							placeholder="Name"
							className="w-full input input-bordered h-10 px-3 rounded-md"
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div className="mb-4">
						<label className="label p-2">
							<span className="text-base label-text">Username</span>
						</label>
						<input
							type="text"
							placeholder="Email"
							className="w-full input input-bordered h-10 px-3 rounded-md"
							value={inputs.userName}
							onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
						/>
					</div>

					<div className="mb-4">
						<label className="label p-2">
							<span className="text-base label-text">Password</span>
						</label>
						<input
							type="password"
							placeholder="Enter Password"
							className="w-full input input-bordered h-10 px-3 rounded-md"
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div className="mb-4">
						<label className="label p-2">
							<span className="text-base label-text">Confirm Password</span>
						</label>
						<input
							type="password"
							placeholder="Confirm Password"
							className="w-full input input-bordered h-10 px-3 rounded-md"
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<div className="mb-4">
						<Link to="/login" className="text-sm hover:underline hover:text-blue-600">
							Already have an account?
						</Link>
					</div>

					<div>
						<button className="btn btn-block btn-sm mt-4 transition-all duration-300 ease-in-out hover:bg-green-400 hover:text-green-800" disabled={loading}>
							{loading ? <span className="loading loading-spinner "></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>

	);
};
export default SignUp;
