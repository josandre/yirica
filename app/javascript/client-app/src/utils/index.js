

function totalPrice(items) {
    return items.reduce((itemAcc, item) => {
        return itemAcc += (item.total);
    }, 0);
}

function decodeJWT(token){
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

function totalAdults(adults, price){
    const adultsPrice = parseInt(price);
    return adultsPrice * adults
}

function totalKids(kids, price){
    const kidsPrice = parseInt(price);
    return kidsPrice * kids
}

function totalByRoom(adultsPrice, kidsPrice, qty ){

    if(kidsPrice === undefined){
        return adultsPrice * qty;
    }

    return (adultsPrice + kidsPrice) * qty;

}



const objectToQueryParams = (params) => {
    return new URLSearchParams(params).toString();
}

const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const queryParamsToObject = (queryParams) => {
    const urlSearchParams = new URLSearchParams(location.search)
    const paramsObject = {};

    urlSearchParams.forEach((value, key) => {
        if (paramsObject[key]) {
            if (Array.isArray(paramsObject[key])) {
                paramsObject[key].push(value);
            } else {
                paramsObject[key] = [paramsObject[key], value];
            }
        } else {
            paramsObject[key] = value;
        }
    });

    return paramsObject;
};

const userIsLogged = () => {
    const  token = localStorage.getItem('token');

    if(!token) {
        return false
    }

    const decodedToken = decodeJWT(token);
    const userId = decodedToken.user_id

    return { isUserLogged: !!userId, userId, token }
}


export {

    totalPrice,
    objectToQueryParams,
    queryParamsToObject,
    formatDateToYYYYMMDD,
    totalAdults,
    totalKids,
    totalByRoom,
    decodeJWT,
    userIsLogged
};