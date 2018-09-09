const {home, comments,messages} = require("./controller.js");

function router(app)
{
    app.get('/',home);
    app.post("/createMsg", messages);
    app.post("/createCmt", comments);
}

module.exports = router;