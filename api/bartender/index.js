module.exports = function(db, app) {
  app.get("/hello", (req, res) => {
    res.send({
      status: 200,
    });
  });

  app.post("/api/bartender/print", (req, res) => {
    res.send({
      status: 200,
      data: {
        code: 200,
        message: 'bartender 打印成功',
      },
    });
  });

  app.get("/api/bartender/template/list", (req, res) => {
    const data = db.get('bartenderPrint')
      // .push(req.body)
      // .last()
      // .assign({
      //   id: Date.now().toString(),
      // })
      // .write()
      .value();

    res.send({
      status: 200,
      data,
    });
  });
};
