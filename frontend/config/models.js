/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#/documentation/concepts/ORM
 */

module.exports.models = {

  // Model stored in mysql database
  connection: 'mysqlServer',

  // Safe : never auto-migrate my database
  // Drop : wipe/drop all data
  migrate: 'alter'

};
