import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData.role === "user") {
            toast.success("Welcome back!", { position: "top-center" });
            navigate("/");
          } else if (userData.role === "admin") {
            toast.success("Admin login successful!", { position: "top-center" });
            navigate("/admin/home");
          } else {
            toast.warn("Unknown role. Contact support.", { position: "top-center" });
          }
        } else {
          toast.error("User data not found in Firestore.", { position: "bottom-center" });
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        toast.error("Invalid email or password", { position: "bottom-center" });
      } else {
        toast.error(error.message || "Login failed. Try again.", { position: "bottom-center" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-400 via-green-400 to-teal-400 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <section className="hidden md:block text-white space-y-6 px-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold leading-tight">
              Welcome Back!
            </h2>
            <div className="w-20 h-1 bg-white rounded-full"></div>
          </div>
          <p className="text-lg text-white/90 leading-relaxed">
            Log in to access your personalized dashboard, track your activity, and stay connected
            with our community.
          </p>
          <div className="space-y-3 pt-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-white/90">Access your personalized dashboard</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-white/90">Track your activity and progress</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-white/90">Stay connected with the community</span>
            </div>
          </div>
        </section>
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Login</h3>
              <p className="text-gray-500">Sign in to your account</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-105 transform transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Log In"
              )}
            </button>

            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-emerald-600 font-semibold hover:text-emerald-700 transition duration-200">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;