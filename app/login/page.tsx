export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center border-black rounded bg-green-400">
      <form className="h-1/2 flex items-center justify-center flex-col bg-yellow-200 p-2 border border-black rounded">
        <p className="mb-2 border-black">Login form</p>
        <label className="mb-2">Email:</label>
        <input
          className="mb-2 border border-gray-600 bg-gray-200 w-5/6"
          placeholder="Email"
          type="email"
        />
        <label className="mb-2">Password:</label>
        <input
          className="mb-2 border border-gray-600 bg-gray-200 w-5/6"
          placeholder="Password"
          type="password"
        />
        <button className="mb-2 p-1 border border-gray-600 bg-green-300 w-5/6 mt-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
