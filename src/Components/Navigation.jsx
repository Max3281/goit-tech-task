import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="header-nav">
      <NavLink className="header-text" to="/">
        Home
      </NavLink>
      <NavLink className="header-text" to="tweets">
        Tweets
      </NavLink>
    </header>
  );
};

export default Navigation;
