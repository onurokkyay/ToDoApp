import { useParams, Link } from "react-router-dom";
function WelcomeComponent() {
  const params = useParams();

  return (
    <div className="Welcome">
      <h1>Welcome {params.userName}</h1>
      <div>
        Manage Your Todos. <Link to="/todos">Go Here </Link>
      </div>
    </div>
  );
}

export default WelcomeComponent;
