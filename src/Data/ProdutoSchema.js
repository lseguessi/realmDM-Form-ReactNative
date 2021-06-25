export default class ProdutoSchema {
  static schema = {
    name: 'Produtos',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      descricao: 'string',
      quantidade: 'double',
      valor: 'double',
    },
  };
}
