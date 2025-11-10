import { CheckoutService } from '../services/CheckoutService.js';
import { CarrinhoBuilder } from './builders/CarrinhoBuilder.js';
import { UserMother } from './builders/UserMother.js';
import { Item } from '../domain/Item.js';

describe('CheckoutService', () => {

  describe('quando o pagamento falha', () => {
    it('deve retornar null e não salvar nem enviar email', async () => {
      const carrinho = new CarrinhoBuilder().build();
      const gatewayPagamentoStub = { cobrar: jest.fn().mockResolvedValue({ success: false }) };
      const pedidoRepositoryDummy = { salvar: jest.fn() };
      const emailServiceDummy = { enviarEmail: jest.fn() };

      const checkoutService = new CheckoutService(gatewayPagamentoStub, pedidoRepositoryDummy, emailServiceDummy);
      const pedido = await checkoutService.processarPedido(carrinho);

      expect(pedido).toBeNull();
      expect(pedidoRepositoryDummy.salvar).not.toHaveBeenCalled();
      expect(emailServiceDummy.enviarEmail).not.toHaveBeenCalled();
    });
  });

  describe('quando um cliente Premium finaliza a compra', () => {
    it('deve aplicar desconto, chamar gateway com valor correto e enviar email', async () => {
      const userPremium = UserMother.umUsuarioPremium();
      const carrinho = new CarrinhoBuilder()
        .comUser(userPremium)
        .comItens([new Item('Produto X', 150.0, 1), new Item('Produto Y', 50.0, 1)])
        .build();

      const gatewayPagamentoStub = { cobrar: jest.fn().mockResolvedValue({ success: true }) };
      const pedidoRepositoryStub = { salvar: jest.fn().mockImplementation((p) => Promise.resolve(p)) };
      const emailServiceMock = { enviarEmail: jest.fn() };

      const checkoutService = new CheckoutService(gatewayPagamentoStub, pedidoRepositoryStub, emailServiceMock);
      const pedido = await checkoutService.processarPedido(carrinho);

      expect(pedido).not.toBeNull();
      expect(pedido.total).toBe(180);
      expect(gatewayPagamentoStub.cobrar).toHaveBeenCalledWith(180, expect.anything());
      expect(emailServiceMock.enviarEmail).toHaveBeenCalledWith('premium@email.com', 'Seu Pedido foi Aprovado!', expect.any(String));
    });
  });
});