module.exports = {
  generateSuccessReturn: (results) => {
    return {
      count: results.length,
      next: null,
      previous: null,
      results,
    }
  },
  getDataFilteredByTenant: (db, req, menu) => {
    const tenant = req.query.tenant;
    return db.get(tenant ? `${tenant}.${menu}` : `yx.${menu}`);
  },
  getTotalAccordingToConfig: (list, label) => {
    return list.map(item => item[label]).reduce((a, b) => a + b);
  }
}
