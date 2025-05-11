import { words } from '@/config/text';
import NavBar from '../components/shared/NavBar';
import SignedNavBar from '@/components/shared/SignedNavBar';

const Forbidden = () => {
  const user = localStorage.getItem("user");
  return (
    <div className="flex flex-col space-y-10 items-center">
      {user ? <SignedNavBar /> : <NavBar />}
      <p className="text-8xl text-red-800 mt-32">403!</p>
      <p className="m-4 text-2xl text-white">{words.Forbidden}</p>
    </div>
  )
}

export default Forbidden
