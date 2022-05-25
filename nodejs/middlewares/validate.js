const actions_validate = require('./actions-validate');

module.exports = function(schema) {
  return async function(req, res, next) {
    try {
      const params = req.body.user || req.params;
      const valid = await actions_validate[schema].validate(params);
      const {error} = valid;
      if (error) {
        return res.status(400).send({message: error.message});
      } else {
        next();
      }
    } catch (e) {
      return res.status(400).send({message: e.message})
    }
  }
}