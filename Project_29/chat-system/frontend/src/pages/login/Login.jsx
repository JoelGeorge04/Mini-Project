import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(userName, password);
	};

	return (
		<div className="flex flex-col items-center justify-center min-w-[384px] mx-auto py-8 px-4">
			<div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-300 transition-all duration-300 ease-in-out hover:bg-gray-900 hover:shadow-2xl hover:border-yellow-500">
				<h1 className="text-3xl font-semibold text-center text-gray-300 mb-6">
					Login to <span className="text-blue-500 hover:text-red-400 transition-all duration-300 ease-in-out">BookMyResourse</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="label p-2">
							<span className="text-base label-text">Username</span>
						</label>
						<input
							type="text"
							placeholder="Enter username"
							className="w-full input input-bordered h-10 px-3 rounded-md"
							value={userName}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div className="mb-6">
						<label className="label p-2">
							<span className="text-base label-text">Password</span>
						</label>
						<input
							type="password"
							placeholder="Enter Password"
							className="w-full input input-bordered h-10 px-3 rounded-md"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="mb-4">
						<Link
							to="/signup"
							className="text-sm hover:underline hover:text-blue-600"
						>
							{"Don't"} have an account?
						</Link>
					</div>

					<div>
						<button className="btn btn-block btn-sm mt-4 transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-blue-800" disabled={loading}>
							{loading ? <span className="loading loading-spinner "></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;

