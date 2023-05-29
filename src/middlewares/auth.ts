const auth = (req, res, next) => {
  if (req.session == undefined) {
    console.log("Sessão não iniciada!");
    res.redirect("/");
  } else {
    next();
  }
};

export default auth;
