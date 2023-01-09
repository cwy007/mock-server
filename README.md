# 前端mock server使用说明文档

## 运行

### CLI

#### npm

- npm install
- npm start $[port]

#### yarn

- (install yarn)
- yarn
- yarn start ${port}

#### node热更新

- yarn global add hotnode
- yarn dev

## 初始化所需的非关系型数据库表

``` javascript

low(adapter)
  .then((db) => {
    generateOrganizationService(db, app);
    ...
    (增加你想做的数据表的方法)
    // Set db default values
    return db
      .defaults({
        organization: [],
        ...
        (增加你想做的数据表表名 : 数据初始化 一般来说写空数组就可以)
      })
      .write();
  })
  .then(() => {
    app.listen(port || 3001, () => console.log(`listening on port ${port || 3001}`));
  });

```

编辑db.json, 增加你想做的数据表表名 : 数据初始化 一般来说写空数组就可以

接下来在/api文件夹内新增表对应文件夹，内部初始化index.js

示例

```javascript
const common = require('../../../common/Common');
const generateSuccessReturn = common.generateSuccessReturn;

module.exports = function (db, app) {
  // get方法
  app.get('/api/v1/hrm/crew/', (req, res) => {
    const organization = db.get('crew')
      .value()

    res.send(generateSuccessReturn(organization))
  })

  // getById方法
  app.get('/api/v1/hrm/crew/:id', (req, res) => {
    const organization = db.get('crew')
      .find({ id: req.params.id })
      .value()

    res.send(generateSuccessReturn(organization))
  })

  // post 方法
  app.post('/api/v1/hrm/crew/', (req, res) => {
    db.get('crew')
      .push(req.body)
      .last()
      .assign({
        id: Date.now().toString(),
      })
      .write()
      .then(organization => res.send(generateSuccessReturn(organization)))
  })

  // patch 方法
  app.patch('/api/v1/hrm/crew/:id', (req, res) => {
    db.get('crew')
      .find({ id: req.params.id })
      .assign(req.body)
      .write()
      .then(organization => res.send(generateSuccessReturn(organization)))
  })

  // delete 方法
  app.delete('/api/v1/hrm/crew/:id', (req, res) => {
    db.get('crew')
      .remove({ id: req.params.id })
      .write()
      .then(organization => res.send(generateSuccessReturn(organization)))
  })
}

```
