
export function getProducts() {
    
    const apiurl = `http://cozshopping.codestates-seb.link/api/v1/products`;

    

    return fetch(apiurl)
    .then((res) => res.json())
    .then((data) => {return data})

}




