<<<<<<< HEAD
import { useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, login } = useAuth();

  useEffect(() => {
    if (user && !user.isRegistered) {
      login({
        ...user,
        isRegistered: true,
      });
    }
  }, [user, login]);

=======
import Header from "../components/Header"

export default function ProfilePage() {
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
  return (
    <>
      <Header />

      <div style={{ padding: 40 }}>
        <h1>Profile</h1>
<<<<<<< HEAD

        {user && (
          <div style={{ marginTop: 16 }}>
            <p><strong>Name:</strong> {user.displayName}</p>
            <p><strong>Registered:</strong> yes</p>
          </div>
        )}
      </div>
    </>
  );
=======
      </div>
    </>
  )
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
}