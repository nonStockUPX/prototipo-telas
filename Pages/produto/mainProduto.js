document.addEventListener("DOMContentLoaded", function() {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const produtoId = getQueryParam('id'); 
    console.log(produtoId)
    fetch(`https://664139c7a7500fcf1a9fdfda.mockapi.io/produto/produtos/${produtoId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const conteudoDiv = document.querySelector('main');
                const produtoHTML = `
                    <div class="conteudo">
                        <img src="${data.url_img}" alt=""> 
                        <div class="description">
                            <h2>${data.nome}</h2>
                            <p>${data.descricao}</p>
                            <ul>
                                <li><strong>Quantidade:</strong> ${data.qtd_produto} un.</li>
                                <li><strong>tamanho:</strong> ${data.tamanho}</li>
                                <li><strong>material:</strong> ${data.material} </li>
                                <li><strong>Empresa:</strong> ${data.nome_empresa}</li>
                                <li><strong>Local de retirada:</strong> ${data.endereco} </li>
                            </ul>
                            <a href="" target="_blank" rel="noopener noreferrer" class="botaoProduto">Mandar Mensagem</a>
                        </div>
                    </div>
                `;
                conteudoDiv.innerHTML += produtoHTML;
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));
});
