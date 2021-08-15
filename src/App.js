import ReactDOM from "react-dom";

import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt me</h1>
      <Pet name="Lua" animal="Dog" breed="Labrador" />
      <Pet name="Troc" animal="Dog" breed="Mastin" />
      <Pet name="Fil" animal="Cat" breed="Common" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
