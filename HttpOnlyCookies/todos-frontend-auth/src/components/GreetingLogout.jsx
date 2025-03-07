const GreetingLogout = ({ userObject, handleLogout }) => {
  return (
    <div>
      <em>Howdy, {userObject.username}!</em>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default GreetingLogout;
