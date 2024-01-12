const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

module.exports = (request, response, next) => {
  try {
    const bearerHeader = request.headers["authorization"];
    const secret = request.headers["secret"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      // verify the token

      jwt.verify(bearerToken, SECRET_KEY, (err, decodedToken) => {
        if (err) {
          console.log(err);

          return response.status(403).json({ err });
        }
        // decode the token here for me
        let Id =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid"
          ];

        response.locals = {
          ...response.locals,
          Id,
        };
        next();
      });
    } else {
      return response.status(403).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
  }
};
