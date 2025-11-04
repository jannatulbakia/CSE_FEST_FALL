import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: "",
        role: "user",
      });
      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! পুনর্নির্দেশনা করা হচ্ছে...", { position: "top-center" });
      navigate("/");
    } catch (error) {
      console.error("নিবন্ধনের সময় ত্রুটি:", error);
      toast.error(error.message || "নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।", { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-400 via-green-400 to-teal-400 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* তথ্য বিভাগ */}
        <section className="hidden md:block text-white space-y-6 px-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold leading-tight">
              আজই আমাদের সাথে যোগ দিন!
            </h2>
            <div className="w-20 h-1 bg-white rounded-full"></div>
          </div>
          <p className="text-lg text-white/90 leading-relaxed">
            সাইন আপ করা আপনাকে ব্যক্তিগতকৃত বৈশিষ্ট্য, একটি সহায়ক সম্প্রদায় এবং সর্বোচ্চ মানের সংস্থানগুলিতে একচেটিয়া অ্যাক্সেস প্রদান করে। এখনই শুরু করুন এবং আপনার প্রয়োজনের জন্য সেরা প্ল্যাটফর্মের অভিজ্ঞতা নিন!
          </p>
          <div className="space-y-3 pt-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-white/90">ব্যক্তিগতকৃত বৈশিষ্ট্যগুলিতে একচেটিয়া অ্যাক্সেস</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-white/90">সহায়ক সম্প্রদায় অ্যাক্সেস</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-white/90">সর্বোচ্চ মানের সংস্থান</span>
            </div>
          </div>
        </section>

        {/* ফর্ম বিভাগ */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">নিবন্ধন করুন</h3>
              <p className="text-gray-500">শুরু করতে আপনার অ্যাকাউন্ট তৈরি করুন</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  প্রথম নাম
                </label>
                <input
                  type="text"
                  placeholder="প্রথম নাম লিখুন"
                  onChange={(e) => setFname(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  শেষ নাম
                </label>
                <input
                  type="text"
                  placeholder="শেষ নাম লিখুন"
                  onChange={(e) => setLname(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                ইমেইল ঠিকানা
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                placeholder="একটি শক্তিশালী পাসওয়ার্ড তৈরি করুন"
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
                  নিবন্ধন করা হচ্ছে...
                </span>
              ) : (
                "নিবন্ধন করুন"
              )}
            </button>

            <p className="text-center text-gray-600 text-sm">
              ইতিমধ্যে নিবন্ধিত?{" "}
              <a href="/login" className="text-emerald-600 font-semibold hover:text-emerald-700 transition duration-200">
                লগ ইন করুন
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;