const onLogin = async() => {
    const name = document.getElementById("Name").value;
    if (name === '') {
        alert('Ingrese su nombre')
        return;
    } else {

        const response = await fetch('http://localhost:3000/api/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name: name })
        }).then(response => response.json());
        if (response.IsSuccess) {
            window.location = '/';
        } else {
            alert(response.msg);
        }
    }
}

const onLogout = async() => {
    window.location = '/logout';
}