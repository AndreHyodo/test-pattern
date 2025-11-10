import { User } from '../../domain/User.js';

class UserMother {
  static umUsuarioPadrao() {
    return new User('João Comum', 'joao@email.com', 'USER');
  }

  static umUsuarioPremium() {
    return new User('Maria Premium', 'premium@email.com', 'PREMIUM');
  }
}

export { UserMother };