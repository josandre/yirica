function getFlashProducts(products) {
    return products.filter(item => item.sale === true).slice(0, 8);
}

function getFeaturedProducts(products) {
    return products.filter(item => item.sale === true).slice(0, 12);
}

function totalPrice(items) {
    return items.reduce((itemAcc, item) => {
        return itemAcc += (item.total);
    }, 0);
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
    console.log("kids", kidsPrice)
    console.log("total, ", (adultsPrice + kidsPrice) * qty)

    if(kidsPrice === undefined){
        return adultsPrice * qty;
    }

    return (adultsPrice + kidsPrice) * qty;


}


function checkLengNull(data) {
    if (data !== null) {
        return data.length > 0;
    }
    return false;
}

function minValueOne(qty) {
    if (qty < 1) {
        return 1;
    }
    return qty;
}

// filter function
function filterProductByCategory(product, selected_category) {
    if (checkLengNull(selected_category)) {
        return product.category.toLowerCase() === selected_category.toLowerCase();
    }
    return true
}

function filterProductByPrice(product, price) {
    if (checkLengNull(price)) {
        return product.price >= price[0] && product.price <= price[1];
    }
    return true
}

function filterProductByColor(product, color) {
    if (checkLengNull(color)) {
        for (var i = 0; i < product.colors.length; i++) {
            if (product.colors[i].toLowerCase() === color.toLowerCase()) {
                return true
            }
        }
        return false;
    }
    return true
}

function filterProductBySize(product, size) {
    if (checkLengNull(size)) {
        for (var i = 0; i < product.size.length; i++) {
            if (product.size[i].toLowerCase() === size.toLowerCase()) {
                return true
            }
        }
        return false;
    }
    return true
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


export {
    getFlashProducts,
    getFeaturedProducts,
    totalPrice,
    filterProductByCategory,
    filterProductByPrice,
    filterProductByColor,
    filterProductBySize,
    minValueOne,
    objectToQueryParams,
    queryParamsToObject,
    formatDateToYYYYMMDD,
    totalAdults,
    totalKids,
    totalByRoom
};