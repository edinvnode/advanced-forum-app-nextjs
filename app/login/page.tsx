export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center border-black rounded">
      <form className="h-1/2 flex items-center justify-center flex-col bg-yellow-200 p-2 border-black rounded">
        <p className="mb-2">Login form</p>
        <label className="mb-2">Email:</label>
        <input className="mb-2 border-black" type="email" />
        <label className="mb-2">Password:</label>
        <input className="mb-2 border-black" type="password" />
        <button className="mb-2 p-1 border-black bg-red-200 ">Submit</button>
      </form>
    </div>
  );
}
