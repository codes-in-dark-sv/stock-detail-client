import fetch from 'isomorphic-fetch';
 
export const getAllStocks = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/stocks/all`, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
 
 
export const addStock = (newStockDetail) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/stocks/add`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body:JSON.stringify(newStockDetail)
    }).then(response => {
            return response.json();
        }).catch((err) => {
            console.log(err);
            return err 
        });
};


export const removeStock = (ranking) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/removeStock/${ranking}`, {
        method: 'DELETE',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
