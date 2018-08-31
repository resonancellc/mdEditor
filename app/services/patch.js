import Service from '@ember/service';
import {
  get,
  getWithDefault,
  set
} from '@ember/object';
import {
  isArray,
  A
} from '@ember/array';

export default Service.extend({
  applyModelPatch(record) {
    let type = record.constructor.modelName;

    switch(type) {
    case 'contact':
      record.get('json.address')
        .forEach(itm => {
          let oldAdm = get(itm, 'adminstrativeArea');

          if(oldAdm) {
            set(itm, 'administrativeArea', oldAdm);
            set(itm, 'adminstrativeArea', null);
          }
        });

      record.set('json.memberOfOrganization', A(record.get(
        'json.memberOfOrganization')).uniq());
      record.save().then(function () {
        record.notifyPropertyChange('currentHash');
      });

      break;
    case 'record':
      {
        let lineage = record.get('json.metadata.resourceLineage');

        if(isArray(lineage)) {
          lineage
            .forEach(itm => {
              let source = get(itm, 'source');

              if(isArray(source)) {
                source.forEach(src => {
                  set(src, 'description', getWithDefault(src,
                    'description', get(src, 'value')));
                  set(src, 'value', null);
                });
                record.save().then(function () {
                  record.notifyPropertyChange('currentHash');
                });
              }
            });

          break;
        }
      }
    }
  }
});