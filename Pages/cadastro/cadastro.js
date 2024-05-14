document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.form-error').value = '';

    // Função para validar o formulário
    function validarFormulario() {
        var nome = document.getElementById('nome').value;
        var lastName = document.getElementById('lastName').value;
        var email = document.getElementById('email').value;
        var cnpj = document.getElementById('cnpj').value;
        var cep = document.getElementById('cep').value;
        var endereco = document.getElementById('endereco').value;
        var telefone = document.getElementById('telefone').value;
        var tipo = document.getElementById('selecione').value;
        var senha = document.getElementById('senha').value;

        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!nome || !lastName || !email || !cnpj || !cep || !endereco || !telefone || !tipo || !senha) {
            document.getElementById('nome-error').textContent = 'Por favor, preencha todos os campos.';
            return false;
        }

        cnpj = cnpj.replace(/[^\d]+/g, ''); 
        if (cnpj == '' || cnpj.length != 14){
            alert('Por favor, insira um CNPJ válido.');
            return false;
        }
        cep = cep.replace(/\D/g, '');
        
        if (cep.length != 8) {
                return false;
        }

        // Correção na criação do objeto usuario
        var usuario = {
            "name": nome,
            "email": email,
            "cnpj": cnpj,
            "cep": cep,
            "endereco": endereco, // Corrigido de "enderco" para "endereco"
            "telefone": telefone,
            "tipo": tipo, // Supondo que você queria usar "tipo" ao invés de "type"
            "senha": senha
        };
        console.log("final")
        return usuario;
    }

    // Adiciona o listener ao botão de cadastro
    document.querySelector('.botao').addEventListener('click', function(event) {
        event.preventDefault(); // Impede o envio do formulário
        let resp = validarFormulario(); // Declarando resp explicitamente
        console.log(JSON.stringify(resp, null, 2));
        if (resp) {
            fetch(`https://6630275bc92f351c03d92479.mockapi.io/linguagens/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resp)
            })
            .then(() => window.location.href = '../login/login.html')
            .catch(error => console.error('Erro ao enviar formulário:', error)); // Tratamento de erro
            console.log('Formulário validado e pronto para ser enviado.');
        }
    });
});

document.getElementById('cnpj').addEventListener('input', function(e) {
    var input = e.target.value.replace(/\D/g, ''); // Remove tudo o que não é dígito
    var formatted = input;

    // Aplica a formatação XX.XXX.XXX/XXXX-XX
    if (input.length > 12) {
        formatted = input.substring(0, 2) + '.' + input.substring(2, 5) + '.' + input.substring(5, 8) + '/' + input.substring(8, 12) + '-' + input.substring(12, 14);
    } else if (input.length > 8) {
        formatted = input.substring(0, 2) + '.' + input.substring(2, 5) + '.' + input.substring(5, 8) + '/' + input.substring(8);
    } else if (input.length > 5) {
        formatted = input.substring(0, 2) + '.' + input.substring(2, 5) + '.' + input.substring(5);
    } else if (input.length > 2) {
        formatted = input.substring(0, 2) + '.' + input.substring(2);
    }

    e.target.value = formatted;
});

document.getElementById('cep').addEventListener('input', function(e) {
    var input = e.target.value.replace(/\D/g, ''); // Remove tudo o que não é dígito
    var formatted = input;

    // Aplica a formatação XXXXX-XXX
    if (input.length > 5) {
        formatted = input.substring(0, 5) + '-' + input.substring(5, 8);
    }

    e.target.value = formatted;
});
