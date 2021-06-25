import Realm from 'realm';

import ProdutoSchema from './ProdutoSchema';

export default function getRealm() {
  return Realm.open({
    schema: [ProdutoSchema],
  });
}
