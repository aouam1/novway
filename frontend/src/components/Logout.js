import { useDispatch } from 'react-redux';
import { logOut } from '../features/userSlice';

 

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <button onClick={handleLogout}
    className="flex items-center text-black font-bold py-2 px-4 rounded">
      
      Logout</button>
  );
}

export default LogoutButton;
