document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('enviar').addEventListener('click', () => {
        fetch('/registro´', {method: 'POST'})
            .then((res) => {
                console.log(res.body);
                if(res.ok) {
                    document.getElementById('response').innerHTML = '<p>Se ha registrado correctamente</p>';
                }else{
                    document.getElementById('response').innerHTML = '<p>No se pudo registrar</p>';
                }
            })
            .then();
    });
});