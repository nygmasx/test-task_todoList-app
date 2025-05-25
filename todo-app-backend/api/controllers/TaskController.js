/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  find: async function (req, res) {
    try {
      const tasks = await Task.find();
      return res.ok(tasks);
    } catch (err) {
      return res.serverError(err);
    }
  },

  create: async function (req, res) {
    try {
      const task = await Task.create(req.body).fetch();
      return res.ok(task);
    } catch (err) {
      return res.serverError(err);
    }
  },

  update: async function (req, res) {
    try {
      const task = await Task.updateOne({id: req.params.id}).set(req.body);
      if (!task) {
        return res.notFound();
      }
      return res.ok(task);
    } catch (err) {
      return res.serverError(err);
    }
  },

  destroy: async function (req, res) {
    try {
      const task = await Task.destroyOne({id: req.params.id});
      if (!task) {
        return res.notFound();
      }
      return res.ok(true);
    } catch (err) {
      return res.serverError(err);
    }
  }
};
