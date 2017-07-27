import Ember from 'ember';

const {
  Component,
  set,
  get,
  getWithDefault,
  run: {
    once
  }
} = Ember;

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, 'model');

    once(function() {
      set(model, 'scope', getWithDefault(model, 'scope', {}));
      set(model, 'citation', getWithDefault(model, 'citation', []));
      set(model, 'processStep', getWithDefault(model, 'processStep', []));
    });
  },

  tagName: 'form',

  /**
   * The string representing the path in the profile object for the citation.
   *
   * @property profilePath
   * @type {String}
   * @default "false"
   * @required
   */

  /**
   * The object to use as the data model for the citation.
   *
   * @property model
   * @type {Object}
   * @required
   */

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property stepTemplateClass
   * @type Ember.Object
   */
  stepTemplateClass: Ember.Object.extend({
    init() {
      this._super(...arguments);
      this.set('timePeriod', {});
    }
  })
});
