import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link to="/auth/login" className="min-h-12 py-2 px-4 min-w-52 text-center text-white bg-primary rounded">Login</Link>
    </div>
  );
};

export default Home;
