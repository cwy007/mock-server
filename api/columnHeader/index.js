module.exports = function(db, app) {
  app.get("/hello", (req, res) => {
    res.send({
      status: 200,
    });
  });

  app.post("/api/manufacture/customize/list/filed/header", (req, res) => {
    const columnHeaderList = db.get('columnHeaderList').value();

    res.send({
      code: 200,
      message: '获取表头成功',
      data: {
        entity: {
          columnHeaderList,
        }
      }
    });
  });

  app.post("/api/manufacture/customize/list/filed/value", (req, res) => {
    const fieldValue = db.get('fieldValue').value();

    res.send({
      code: 200,
      message: '获取表体成功',
      data: {
        entity: fieldValue,
      }
    });
  });
};
