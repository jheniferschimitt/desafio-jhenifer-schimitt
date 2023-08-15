class CaixaDaLanchonete {
    constructor() {
        // Cardápio com preços de itens
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };

        // Extras e seus respectivos itens principais
        this.extras = {
            chantily: ["cafe"],
            queijo: ["sanduiche"]
        };

        // Itens inclusos nos combos
        this.combos = {
            combo1: ["suco", "sanduiche"],
            combo2: ["cafe", "sanduiche"]
        };
    }

    /**
     * Calcula o valor total da compra.
     *
     * @param {string} metodoDePagamento - Forma de pagamento escolhida.
     * @param {Array} itens - Lista de itens no formato "codigo,quantidade".
     * @return {string} Total formatado ou mensagem de erro.
     */
    calcularValorDaCompra(metodoDePagamento, itens) {
        let total = 0;
        // Registro dos itens principais presentes no pedido.
        let hasPrincipalItems = {
            cafe: false,
            sanduiche: false,
            suco: false
        };

        // Identifica itens principais no pedido.
        for (let item of itens) {
            const [codigo] = item.split(',');

            if (this.combos[codigo]) {
                for (let includedItem of this.combos[codigo]) {
                    hasPrincipalItems[includedItem] = true;
                }
            }

            if (hasPrincipalItems[codigo] !== undefined) {
                hasPrincipalItems[codigo] = true;
            }
        }

        // Processa itens e calcula o total.
        for (let item of itens) {
            // Separando o código do item da quantidade
            const [codigo, quantidade] = item.split(',');

            // Verificando se o item está no cardápio
            if (!this.cardapio[codigo]) {
                return "Item inválido!";
            }

            // Convertendo a quantidade para número
            const qtd = parseInt(quantidade);
            // Verificando se a quantidade é válida
            if (isNaN(qtd) || qtd <= 0) {
                return "Quantidade inválida!";
            }

            // Verificando se o item é um extra e se seus itens principais associados estão no pedido
            if (this.extras[codigo] && !this.extras[codigo].some(principal => hasPrincipalItems[principal])) {
                return "Item extra não pode ser pedido sem o principal";
            }

            // Atualizando o total da compra
            total += this.cardapio[codigo] * qtd;
        }

        // Se o total ainda for 0, significa que não há itens
        if (total === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Ajusta o total com base no método de pagamento.
        switch (metodoDePagamento) {
            case 'dinheiro':
                total *= 0.95; // 5% de desconto para pagamento em dinheiro
                break;
            case 'credito':
                total *= 1.03; // 3% de acréscimo para pagamento no crédito
                break;
            case 'debito':
                // Débito não tem ajuste.
                break;
            default:
                return "Forma de pagamento inválida!";
        }

        // Retornando o total formatado em reais
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };

// Tornando a classe acessível no ambiente do navegador.
if (typeof window !== 'undefined') {
    window.CaixaDaLanchonete = CaixaDaLanchonete;
}

