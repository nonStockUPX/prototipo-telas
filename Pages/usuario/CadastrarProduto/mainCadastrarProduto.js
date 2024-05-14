function abrirModal() {
    document.getElementById("formCadastro").style.display = "block";
}

function fecharModal() {
    document.getElementById("formCadastro").style.display = "none";
    document.getElementById("produtoForm").reset();
}

function salvarProduto() {
    var produto = {
        nome: document.getElementById("nomeProduto").value,
        quantidade: document.getElementById("quantidade").value,
        empresa: document.getElementById("nomeEmpresa").value,
        cnpj: document.getElementById("cnpj").value,
        endereco: document.getElementById("endereco").value,
        numero: document.getElementById("numero").value,
        descricao: document.getElementById("descricaoProduto").value,
        foto: document.getElementById("foto").files[0],
        id_empresa: localStorage.getItem('usuarioId')
    };

    // adicionarProduto(produto);
    console.log(produto)

    fetch(`https://664139c7a7500fcf1a9fdfda.mockapi.io/produto/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
        .then(() => buscarDetalhesDoUsuario())
        .catch(error => console.error('Erro ao enviar formulário:', error)); // Tratamento de erro
        console.log('Formulário validado e pronto para ser enviado.');

        fecharModal();
}

function adicionarProduto(produto) {
    var divProduto = document.createElement("div");
    divProduto.classList.add("produto");

    var infoProduto = `
        <div class="descricao-produto">
            <p><strong>Nome do Produto:</strong> ${produto.nome}</p>
            <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
            <p><strong>Nome da Empresa:</strong> ${produto.empresa}</p>
            <p><strong>CNPJ:</strong> ${produto.cnpj}</p>
            <p><strong>Endereço:</strong> ${produto.endereco}</p>
            <p><strong>Número:</strong> ${produto.numero}</p>
            <p><strong>Descrição do Produto:</strong> ${produto.descricao}</p>
        </div>
    `;

    divProduto.innerHTML = infoProduto;

    document.getElementById("produtos-container").appendChild(divProduto);
}

function buscarDetalhesDoUsuario() {
    const usuarioId = localStorage.getItem('usuarioId');
    if (usuarioId) {
        const url = `https://664139c7a7500fcf1a9fdfda.mockapi.io/produto/produtos`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll('div.produto').forEach(function(div) {
                    div.remove();
                });
                const produtos = data.filter(produto => produto.id_empresa === usuarioId);
                produtos.forEach(p => {
                    adicionarProduto(p);
                });
                console.log('Detalhes do usuário:', data);
                // Aqui você pode atualizar a UI da página com os detalhes do usuário
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes do usuário:', error);
            });
    } else {
        console.log('Nenhum usuário logado.');
    }
}

// Chama buscarDetalhesDoUsuario quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
buscarDetalhesDoUsuario();
});