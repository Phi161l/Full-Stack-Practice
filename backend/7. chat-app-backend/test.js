function express() {
  const app = {};

  app.use = function () {
    console.log("middleware added");
  };

  app.get = function (path, handler) {
    console.log(`GET route added: ${path}`);
  };

  app.listen = function (port) {
    console.log(`Server running on ${port}`);
  };

  return app;
}

const app = express();

app.use();
app.get("/users");
app.listen(5000);
