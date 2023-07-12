let preUrl = 'http://43.138.31.87:2023/api/v1';
// let preUrl = 'http://10.135.120.165:8081/api/v1'

export async function postData(route,data) {
    const url = preUrl + route;
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
    })

    return response.json()
}

export async function getJson(route) {
    console.log(localStorage.getItem('token'))
    const url = preUrl + route;
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token')
        },
    })

    return response.json()
}

export async function deleteData(route) {
    console.log(localStorage.getItem('token'))
    const url = preUrl + route;
    const response = await fetch(url,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token')
        },
    })

    return response.json()
}

export async function putData(route) {
    console.log(localStorage.getItem('token'))
    const url = preUrl + route;
    const response = await fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token')
        },
    })

    return response.json()
}

export async function getToken() {
    const url = 'http://43.138.31.87:2023/api/v1/qiniu/token';
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token')
        },
    })

    return response.json()
}



