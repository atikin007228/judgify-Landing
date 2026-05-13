import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, isAuthenticated, login } = useAuth();

  const handleDemoLogin = async () => {
    await login({ displayName: "Stan" });
  };

  return (
    <>
      <Header />

      <div style={{ padding: 40 }}>
        <h1>Profile</h1>

        {!isAuthenticated ? (
          <div style={{ marginTop: 16 }}>
            <p>You are not signed in.</p>
            <button onClick={handleDemoLogin}>Continue as demo user</button>
          </div>
        ) : (
          <div style={{ marginTop: 16 }}>
            <p>
              <strong>Name:</strong> {user?.displayName || user?.username}
            </p>
            <p>
              <strong>Registered:</strong> yes
            </p>
          </div>
        )}
      </div>
    </>
  );
}
