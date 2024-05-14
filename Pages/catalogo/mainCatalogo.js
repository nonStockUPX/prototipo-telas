document.addEventListener("DOMContentLoaded", function() {
    fetch('https://664139c7a7500fcf1a9fdfda.mockapi.io/produto/produtos')
        .then(response => response.json())
        .then(data => {
            const conteudoDiv = document.querySelector('.conteudo');
            data.forEach((produto, index) => {
                const produtoHTML = `
                    <div class="anuncio" onclick="redirectToPage('produto.html')">
                        <img src="${produto.url_img}" alt="Anúncio ${index + 1}">
                        <div class="description">
                            <h2>${produto.nome}</h2>
                            <p>${produto.descricao}</p>
                            <ul>
                                <li><strong>Quantidade:</strong> ${produto.qtd_produto} un.</li>
                                <li><strong>tamanho:</strong> ${produto.tamanho}</li>
                                <li><strong>material:</strong> ${produto.material} </li>
                                <li><strong>Empresa:</strong> ${produto.nome_empresa}</li>
                                <li><strong>Local de retirada:</strong> ${produto.endereco} </li>
                            </ul>
                            <a href="${produto.linkProduto}" target="_blank" rel="noopener noreferrer" class="botaoProduto">Ver produto</a>
                        </div>
                    </div>
                `;
                conteudoDiv.innerHTML += produtoHTML;
            });
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));
});

function redirectToPage(url) {
    window.location.href = url;
}
