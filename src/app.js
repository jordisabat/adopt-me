const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h2", {}, props.name),
    React.createElement("h3", {}, props.animal),
    React.createElement("h3", {}, props.breed),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, { name: "Lua", animal: "Dog", breed: "Labrador" }),
    React.createElement(Pet, { name: "Troc", animal: "Dog", breed: "Mastin" }),
    React.createElement(Pet, { name: "Fil", animal: "Cat", breed: "Gat Comu" }),
  ]);
};

ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById("root")
);
