
import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { SearchProvider } from "./context/SearchContext";
import { AuthProvider, useAuth } from "./context/authContext";
import PartnerApplications from "./components/pages/PartnerApplications";
import PartnerApply from "./components/pages/PartnerApply";
import UserLayout from "./components/Layout/UserLayout";

import ProfileUser from "./components/pages/ProfileUser";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import OurPods from "./components/Pods/OurPods";

import ProfileLogIn from "./components/pages/ProfileLogIn";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import OwnerDashboard from "./components/pages/OwnerDashboard";
import AdminDashboard from "./components/pages/AdminDashboard";
import PodManagement from "./components/Pods/PodManagement";
import SearchPods from "./components/Pods/SearchPods";
/*
  Protects routes that require a logged-in user.
*/
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/*
  Protects routes according to the user's role.
*/
const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            {/* Public authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Public application routes */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />

              <Route path="about" element={<AboutUs />} />
              <Route path="pods" element={<OurPods />} />
              <Route path="searchpods" element={<SearchPods />} />
              <Route path="profile" element={<ProfileLogIn />} />

              {/* Customer-only route */}
              <Route
                path="profileUser"
                element={
                  <RoleRoute allowedRoles={["customer","owner"]}>
                    <ProfileUser />
                  </RoleRoute>
                }
              />

              {/* Owner and admin route for pod management */}
              <Route
                path="pod-management"
                element={
                  <RoleRoute allowedRoles={["owner", "admin"]}>
                    <PodManagement />
                  </RoleRoute>
                }
              />

              {/* Owner-only route */}
              <Route
                path="owner/dashboard"
                element={
                  <RoleRoute allowedRoles={["owner"]}>
                    <OwnerDashboard />
                  </RoleRoute>
                }
              />

              {/* Admin-only route */}
              <Route
                path="admin/dashboard"
                element={
                  <RoleRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </RoleRoute>
                }
              />
            </Route>

            {/* Partner application route */}
            <Route
              path="/partner/apply"
              element={<PartnerApply />}
            />

            {/* Unknown routes */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
            <Route
    path="admin/partner-applications"
    element={
        <RoleRoute allowedRoles={["admin"]}>
            <PartnerApplications />
        </RoleRoute>
    }
/>
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;