import { Carrinho } from '../../domain/Carrinho.js';
import { Item } from '../../domain/Item.js';
import { UserMother } from './UserMother.js';

class CarrinhoBuilder {
  constructor() {
    this._user = UserMother.umUsuarioPadrao();
    this._itens = [
      new Item('Item Padrão', 100.0, 1)
    ];
  }

  comUser(user) {
    this._user = user;
    return this;
  }

  comItens(itens) {
    this._itens = itens;
    return this;
  }

  vazio() {
    this._itens = [];
    return this;
  }

  build() {
    return new Carrinho(this._user, this._itens);
  }
}

export { CarrinhoBuilder };