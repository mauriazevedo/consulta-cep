const form = document.getElementById("form");
const cep = document.getElementById("cep");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

const teste = {
    oi: "ola",
    bye: "bye"
};

function closePopUp(){
    popup.classList.toggle('active');
}

function exibirDados(cep, isError){
    popup.classList.toggle('active');
    
    if(!isError && (cep.erro !== "true")){
        popup.innerHTML = `
        ${closeBtn.outerHTML}
        <table>
            <thead>
                <tr>
                    <td>Logradouro</td>
                    <td>Complemento</td>
                    <td>Bairro/Distrito</td>
                    <td>Localidade/UF</td>
                    <td>CEP</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${cep.logradouro}</td>
                    <td>${cep.complemento}</td>
                    <td>${cep.bairro}</td>
                    <td>${cep.localidade}/${cep.uf}</td>
                    <td>${cep.cep}</td>
                </tr>
            </tbody>
        </table>`
    }else{
        popup.innerHTML = 
        `${closeBtn.outerHTML}
        <p>CEP NÃO ENCONTRADO</p>`;
    }

    cep.value = "";
}

function consultaCep(cep){
    fetch(`https://viacep.com.br/ws/${cep}/json`).then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error("CEP Inválido");
    }).then((response) => {
        exibirDados(response, false);
    }).catch((err) => {
        exibirDados(undefined, true);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cepData = cep.value;
    consultaCep(cepData);
});