let serverPath;
if (process.env.NODE_ENV === "development")
  serverPath = "http://localhost:3001";
else serverPath = process.env.REACT_APP_SERVER || "";
// const serverPath = process.env.REACT_APP_SERVER || "";

export default serverPath;
