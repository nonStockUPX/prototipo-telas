document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.form-error').value = '';
    const form = document.querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio do formulário

        const usuarioEmail = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;

        fetch(`https://6630275bc92f351c03d92479.mockapi.io/linguagens/usuario?email=${usuarioEmail}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            // Procura pelo usuário na resposta da API
            const usuario = data.find(u => u.senha === senha);
            if (usuario) {
                console.log("Usuário encontrado:", usuario);
                // Aqui você pode armazenar o ID do usuário localmente, redirecionar para outra página, etc.
                // Por exemplo, armazenando o ID do usuário:
                localStorage.setItem('nomeEmpresa', usuario.name);
                localStorage.setItem('usuarioId', usuario.id);
                // Redirecionando para a página principal
                window.location.href = '../catalogo/catalogo.html';
            } else {
                document.getElementById('nome-error').textContent = 'Senha invalida.';
            }
        })
        .catch((error) => {
            console.error('Erro na requisição:', error);
            document.getElementById('nome-error').textContent = 'Usuario invalido.';
        });
    });
});



