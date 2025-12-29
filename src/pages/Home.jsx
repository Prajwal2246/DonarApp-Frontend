import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Map,
  Phone,
  Award,
  List,
  Hospital,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";

function Home() {
  const [stats] = useState({
    livesSaved: 0,
    totalDonations: 0,
    bloodType: "A+",
    daysUntilEligible: 0,
  });

  const quickActions = [
    {
      icon: <Map className="w-6 h-6 text-red-600" />,
      title: "Find Donors List",
      description: "Get the list of donors",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      route: "/donors",
    },
    {
      icon: <List className="w-6 h-6 text-blue-600" />,
      title: "List as Donor",
      description: "List yourself as donor and save lives",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      route: "/register-as-donar",
    },
    {
      icon: <Phone className="w-6 h-6 text-green-600" />,
      title: "Track your Requests",
      description: "Track requests",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      route: "/requests",
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      title: "Received Requests",
      description: "View received request from others",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      route: "/receivedRequest",
    },
    {
      icon: <Hospital className="w-6 h-6 text-orange-600" />,
      title: "Blood Banks",
      description: "View nearby blood banks",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      route: null,
    },
  ];

  const navigate = useNavigate();

  const handleActionClick = (route) => {
    if (route) {
      navigate(route);
    } else {
      alert("Feature coming soon");
    }
  };

  const name = localStorage.getItem("userName");
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      {/* Hero Section with Stats */}
      <div style={{ padding: "40px 20px" }}>
        <div className="max-w-7xl" style={{ margin: "0 auto" }}>
          {/* Welcome Message */}
          <div style={{ marginBottom: "30px" }}>
            <h1 className="text-4xl  text-gray-900">
              Welcome Back,<strong>{name}</strong>
            </h1>
            <p className="text-gray-600" style={{ marginTop: "8px" }}>
              Every drop counts. Track your impact and continue saving lives.
            </p>
          </div>

          {/* Enhanced Stats Card */}
          <div
            className="bg-gradient-to-br from-red-500 via-red-600 to-pink-600 rounded-3xl shadow-2xl overflow-hidden"
            style={{ padding: "40px", marginBottom: "50px" }}
          >
            {/* Main Impact Section */}
            <div
              className="flex flex-row items-center justify-between"
              style={{ marginBottom: "30px" }}
            >
              <div>
                <div
                  className="flex items-center gap-2"
                  style={{ marginBottom: "8px" }}
                >
                  <TrendingUp className="w-5 h-5 text-red-100" />
                  <p className="text-red-100 text-sm font-medium uppercase tracking-wide">
                    Your Impact
                  </p>
                </div>
                <h2
                  className="text-5xl font-bold text-white"
                  style={{ marginBottom: "8px" }}
                >
                  {stats.livesSaved} Lives
                </h2>
                <p className="text-red-100 text-lg">
                  Saved through your generous donations
                </p>
              </div>
              <div
                className="bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg"
                style={{ padding: "20px", minWidth: "80px", minHeight: "80px" }}
              >
                <Heart className="w-12 h-12 text-white" fill="white" />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div
                className="bg-white/20 backdrop-blur-md rounded-xl text-center transform transition-all hover:scale-105 hover:bg-white/30"
                style={{ padding: "20px" }}
              >
                <p
                  className="text-3xl font-bold text-white"
                  style={{ marginBottom: "4px" }}
                >
                  {stats.totalDonations}
                </p>
                <p className="text-sm text-red-100 font-medium">
                  Total Donations
                </p>
              </div>
              <div
                className="bg-white/20 backdrop-blur-md rounded-xl text-center transform transition-all hover:scale-105 hover:bg-white/30"
                style={{ padding: "20px" }}
              >
                <p
                  className="text-3xl font-bold text-white"
                  style={{ marginBottom: "4px" }}
                >
                  {stats.bloodType}
                </p>
                <p className="text-sm text-red-100 font-medium">Blood Type</p>
              </div>
              <div
                className="bg-white/20 backdrop-blur-md rounded-xl text-center transform transition-all hover:scale-105 hover:bg-white/30"
                style={{ padding: "20px" }}
              >
                <div
                  className="flex items-center justify-center gap-1"
                  style={{ marginBottom: "4px" }}
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <p className="text-3xl font-bold text-white">
                    {stats.daysUntilEligible}
                  </p>
                </div>
                <p className="text-sm text-red-100 font-medium">
                  Days Until Eligible
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginTop: "30px" }}>
              <div
                className="flex justify-between items-center"
                style={{ marginBottom: "8px" }}
              >
                <p className="text-white text-sm font-medium">
                  Next Donation Eligibility
                </p>
                <p className="text-white text-sm font-bold">
                  {Math.round((90 / 90) * 100)}%
                </p>
              </div>
              <div className="bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full shadow-lg h-full"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div style={{ marginBottom: "30px" }}>
            <div
              className="flex items-center gap-3"
              style={{ marginBottom: "25px" }}
            >
              <div className="bg-red-500 rounded-lg w-1 h-8" />
              <h2 className="text-3xl font-bold text-gray-900">
                Quick Actions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleActionClick(action.route)}
                  className={`${action.bgColor} rounded-2xl shadow-md hover:shadow-xl transform transition-all hover:-translate-y-1 text-left`}
                  style={{ padding: "28px" }}
                >
                  <div
                    className={`${action.iconBg} rounded-xl flex items-center justify-center`}
                    style={{
                      width: "56px",
                      height: "56px",
                      marginBottom: "20px",
                    }}
                  >
                    {action.icon}
                  </div>
                  <h3
                    className="text-xl font-bold text-gray-900"
                    style={{ marginBottom: "8px" }}
                  >
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {action.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Community Impact Banner */}
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl"
            style={{ padding: "32px", marginTop: "40px" }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                  style={{ width: "64px", height: "64px" }}
                >
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3
                    className="text-2xl font-bold text-white"
                    style={{ marginBottom: "4px" }}
                  >
                    Join Our Community
                  </h3>
                  <p className="text-blue-100">
                    Connect with 10,000+ donors making a difference
                  </p>
                </div>
              </div>
              <button
                className="bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                style={{ padding: "12px 32px" }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
