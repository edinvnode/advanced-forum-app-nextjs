export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center border-black rounded bg-[#0f0f0f]">
      <form className="h-1/2 flex items-center justify-center flex-col bg-[#000000] p-2 border border-black rounded">
        <p className="mb-2 border-black text-yellow-100">Register</p>
        <label className="mb-2 text-yellow-100">Email:</label>
        <input
          className="mb-2 border border-gray-600 bg-gray-200 w-5/6"
          placeholder="Email"
          type="email"
        />
        <label className="mb-2 text-yellow-100">Username:</label>
        <input
          className="mb-2 border border-gray-600 bg-gray-200 w-5/6"
          placeholder="Username"
          type="text"
        />
        <label className="mb-2 text-yellow-100">Password:</label>
        <input
          className="mb-2 border border-gray-600 bg-gray-200 w-5/6"
          placeholder="Password"
          type="password"
        />
        <button className="mb-2 p-1 border border-gray-600 bg-[#3390d6] w-5/6 mt-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
