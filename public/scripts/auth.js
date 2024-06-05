

const logout = () => {
    fetch('/auth/sign-out', {method:'POST'}).then(response =>{
        if(response.ok){
            window.location.replace('/auth/sign-in')
        }
    })
}