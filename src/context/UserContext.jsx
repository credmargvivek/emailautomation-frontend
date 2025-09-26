import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/userdata`, {
          credentials: 'include',
        });
        console.log('res1--->', res);

        if (res.ok) {
          const data = await res.json();
          console.log('data1 -->', data)
          setUser(data);
        }
       
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
