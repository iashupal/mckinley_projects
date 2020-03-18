import config from "../config";
import { create } from "axios";
import Cookies from "js-cookie";
import { message } from "antd";

const sessionValue = Cookies.get("session_value");
const memberId = Cookies.get("member_id");

// console.log("Cookies", sessionValue, memberId);

// Initialize API instance
const api = create({
    baseURL: config.apiUrl,
    headers: {
        // "Content-Type": "multipart/form-data",
        "x-access-token": sessionValue,
        user: memberId
    }
});

// Initalize function holder object
let productsAPI = {};

// Append function to the holder object
productsAPI.getProductById = async productId => {
    try {
        const response = await api.get("/register", productId);
        return response;
    } catch (e) {
        console.error("[API] getProductById:", e);
        return e;
    }
};

let brandsAPI = {};

brandsAPI.getBrands = async (search, countries, page) => {
    try {
        const response = await api.get(
            `/brands?${!!search ? `keyword=${search}` : ""}${
                !!countries ? `&country=${countries}` : ""
            }&limit=12${!!page ? `&page=${page}` : ""}`
        );
        return response;
    } catch (e) {
        console.error("[API] getBrands:", e);
        return e;
    }
};
//Create Brand
brandsAPI.createBrand = async data => {
    try {
        const response = await api.post("/brands", data);
        return response;
    } catch (e) {
        console.error("[API] create brand:", e);
        return e;
    }
};
//Get a list of products created by a brand.
brandsAPI.brandProducts = async brandId => {
    try {
        const response = await api.get(`/brands/products/${brandId}`);
        return response;
    } catch (e) {
        console.error("[API] brand Products:", e);
        return e;
    }
};
//Get detailed information about the brand.
brandsAPI.brandDetails = async brandId => {
    console.log("recived data", brandId);
    try {
        const response = await api.get(`/brands/details/${brandId}`);
        return response;
    } catch (e) {
        console.error("[API] brand details:", e);
        return e;
    }
};

// individual product related
let individualAPI = {};

//Get a list of individually created products that have been customized.
individualAPI.getProducts = async () => {
    try {
        const response = await api.get("/individual-products");
        return response;
    } catch (e) {
        console.error("[API] individual products:", e);
        return e;
    }
};
//Individually create a product by customizing existing items (ex. clothes) or uploading a design file.
individualAPI.createProduct = async data => {
    try {
        const response = await api.post("/individual-products", data);
        return response;
    } catch (e) {
        console.error("[API] individual product create:", e);
        return e;
    }
};
//Get detailed information about the individually created product.
individualAPI.productDetails = async productId => {
    try {
        const response = await api.get(`/individual-products/${productId}`);
        return response;
    } catch (e) {
        console.error("[API] individual product details:", e);
        return e;
    }
};

//collaborations API
let collaborationAPI = {};

//Get a list of unresolved collaboration requests or collaboration products.
collaborationAPI.products = async (search, sort, countries, categories) => {
    try {
        const response = await api.get(
            `/collaboration-products?a=a${!!search ? `keyword=${search}` : ""}${
                !!sort ? `&sort=${sort}` : ""
            }${!!countries ? `&countries=${countries}` : ""}${
                !!categories ? `&category=${categories}` : ""
            }`
        );
        return response;
    } catch (e) {
        console.error("[API] collaboration products:", e);
        return e;
    }
};
//Open request
collaborationAPI.collaborationRequest = async (
    search,
    sort,
    countries,
    categories,
    ageRanges,
    page
) => {
    try {
        const response = await api.get(
            `/open-collaboration-products?a=a${
                !!search ? `&keyword=${search}` : ""
            }${!!sort ? `&sort=${sort}` : ""}${
                !!countries ? `&countries=${countries}` : ""
            }${!!categories ? `&category=${categories}` : ""}${
                !!ageRanges ? `&age=${ageRanges}` : ""
            }$&limit=12${!!page ? `&page=${page}` : ""}`
        );
        return response;
    } catch (e) {
        console.error("[API] collaboration products:", e);
        return e;
    }
};
//Make a collaboration request to an artist to create a collaborative product.
collaborationAPI.createRequest = async data => {
    try {
        const response = await api.post("/collaboration-products", data);
        return response;
    } catch (e) {
        console.error("[API] collaboration product request:", e);
        return e;
    }
};
//Make a collaboration offer (i.e. create a collaboration product with the CE)
collaborationAPI.offer = async (id, data) => {
    try {
        const response = await api.post(`/collaboration-products/${id}`, data);
        return response;
    } catch (e) {
        console.error("[API] collaboration offer:", e);
        return e;
    }
};
//Get detailed information about the collaboration product
collaborationAPI.productDetails = async productId => {
    try {
        const response = await api.get(`/collaboration-products/${productId}`);
        return response;
    } catch (e) {
        console.error("[API] collaboration product detail:", e);
        return e;
    }
};
// Get List of collabration for a request
collaborationAPI.collborationRequest = async Id => {
    try {
        const response = await api.get(`/collaboration-request/${Id}`);
        return response;
    } catch (e) {
        console.error("[API] collaboration product detail:", e);
        return e;
    }
};
//Accept rejact a request
collaborationAPI.requestAcceptReject = async data => {
    console.log("data", data);
    try {
        const response = await api.patch(`/collaboration-request`, data);
        return response;
    } catch (e) {
        console.error("[API] collaboration product detail:", e);
        return e;
    }
};

collaborationAPI.getBaseProduct = async id => {
    try {
        const response = await api.get(`/collaboration-base-products/${id}`);
        return response;
    } catch (e) {
        console.error("[API] collaboration product detail:", e);
        return e;
    }
};
//recived request from others
collaborationAPI.recivedRequest = async brands => {
    try {
        const response = await api.get(
            `/collaboration/history/other?${!!brands ? `brand=${brands}` : ""}`
        );
        return response;
    } catch (e) {
        console.error("[API] collaboration request:", e);
        return e;
    }
};
collaborationAPI.sentRequest = async () => {
    try {
        const response = await api.get("/collaboration/history/self");
        return response;
    } catch (e) {
        console.error("[API] collaboration request:", e);
        return e;
    }
};
collaborationAPI.deleteProduct = async data => {
    try {
        const response = await api.patch("/collaboration/delete", data);
        return response;
    } catch (e) {
        console.error("[API] collaboration request:", e);
        return e;
    }
};
collaborationAPI.salesHistory = async (id, productId) => {
    try {
        const response = await api.get(
            `/collaboration/sales/history?productId=${id}&collaborationId=${productId}`
        );
        return response;
    } catch (e) {
        console.error("[API] collaboration request:", e);
        return e;
    }
};
//Item Api
let itemAPI = {};

//Add a new category/subcategory for white-label items.
itemAPI.createCategory = async data => {
    try {
        const response = await api.post("/item-categories", data);
        return response;
    } catch (e) {
        console.error("[API] create category:", e);
        return e;
    }
};
//Get a list of all white-label item categories and subcategories.
itemAPI.getCategories = async () => {
    try {
        const response = await api.get("/item-categories");
        return response;
    } catch (e) {
        console.error("[API] get categories:", e);
        return e;
    }
};
//Get item list
itemAPI.getItems = async () => {
    try {
        const response = await api.get("/items");
        return response;
    } catch (e) {
        console.error("[API] get items:", e);
        return e;
    }
};
//Register a new white-label item
itemAPI.createItem = async data => {
    try {
        const response = await api.post("/items", data);
        return response;
    } catch (e) {
        console.error("[API] create item:", e);
        return e;
    }
};
//Get specification for an item
itemAPI.itemDetail = async data => {
    try {
        const response = await api.get(`/items/${data}`);
        return response;
    } catch (e) {
        console.error("[API] item detail:", e);
        return e;
    }
};
//Get specifiaction on an item by category and sub category
itemAPI.itemSpecification = async (category, subCategory) => {
    try {
        const response = await api.get(`/items/${category}/${subCategory}`);
        return response;
    } catch (e) {
        console.error("[API] item detail:", e);
        return e;
    }
};
//Artist related API
let artistAPI = {};

//Get a list of artists
artistAPI.getArtists = async (search, countries, page) => {
    try {
        const response = await api.get(
            `/artists?${!!search ? `keyword=${search}` : ""}&${
                !!countries ? `country=${countries}` : ""
            }&limit=12${!!page ? `&page=${page}` : ""}`
        );
        return response;
    } catch (e) {
        console.error("[API] get artists:", e);
        return e;
    }
};
//Get a list of brands for a SPECIFIC ARTIST
artistAPI.artistBrands = async artistId => {
    try {
        const response = await api.get(`/brands/artists/${artistId}`);
        return response;
    } catch (e) {
        console.error("[API] artist brand list:", e);
        return e;
    }
};
//send a message to artist.
artistAPI.sendMessage = async data => {
    try {
        const response = await api.post("/messages", data);
        return response;
    } catch (e) {
        console.error("[API] send message to an artist:", e);
        return e;
    }
};
//Get a list of messages that I (the user) received
artistAPI.recivedMessage = async () => {
    try {
        const response = await api.get("/messages");
        return response;
    } catch (e) {
        console.error("[API] recived message:", e);
        return e;
    }
};
//Get all messages sent/received from a user.
artistAPI.allMessage = async userId => {
    try {
        const response = await api.get("/messages", userId);
        return response;
    } catch (e) {
        console.error("[API] user all message:", e);
        return e;
    }
};
//Delete a message
artistAPI.delMessage = async data => {
    try {
        const response = await api.patch("/messages", data);
        return response;
    } catch (e) {
        console.error("[API] Delete a message:", e);
        return e;
    }
};
//Get list of all reply on a particular message
artistAPI.replyList = async messageId => {
    try {
        const response = await api.get(`/messages?id=${messageId}`);
        return response;
    } catch (e) {
        console.error("[API] artist brand list:", e);
        return e;
    }
};

//User API
let userAPI = {};

//Make an order request for any product
userAPI.addPurchases = async data => {
    try {
        const response = await api.post("/purchases", data);
        return response;
    } catch (e) {
        console.error("[API] add purchase:", e);
        return e;
    }
};
//Get a list of items purchased from Fandio.
userAPI.getPurchasesList = async () => {
    try {
        const response = await api.get("/purchases");
        return response;
    } catch (e) {
        console.error("[API] get purchases list:", e);
        return e;
    }
};

userAPI.getUserName = async userId => {
    try {
        const response = await api.get(`/username?id=${userId}`);
        return response;
    } catch (e) {
        console.error("[API] get user name:", e);
        return e;
    }
};

let commmonAPI = {};
//Upload image
commmonAPI.imageUpload = async data => {
    console.log(data.file, "recived data");
    let formData = new FormData();
    formData.append("image", data.file);
    try {
        const response = await api.post("/images-upload", formData);
        return response;
    } catch (e) {
        console.error("[API] image upload:", e);
        return e;
    }
};
commmonAPI.bestSeller = async () => {
    try {
        const response = await api.get("/products/best-seller");
        return response;
    } catch (e) {
        console.error("[API] best Selller:", e);
        return e;
    }
};
// Illustration API
let illustrationAPI = {};
//Register a illustration product
illustrationAPI.createProduct = async data => {
    try {
        const response = await api.post("/illustration-products", data);
        return response;
    } catch (e) {
        console.error("[API] image upload:", e);
        return e;
    }
};
// Get list of illustration product
illustrationAPI.getProduct = async () => {
    try {
        const response = await api.get("/illustration-products");
        return response;
    } catch (e) {
        console.error("[API] image upload:", e);
        return e;
    }
};
//Delete illustraion product
illustrationAPI.deleteIllustration = async data => {
    try {
        const response = await api.patch("/illustration-products", data);
        return response;
    } catch (e) {
        console.error("[API] image upload:", e);
        return e;
    }
};
// Illustration sales history
illustrationAPI.salesHistory = async id => {
    try {
        const response = await api.get(`/illust-used-history?illustId=${id}`);
        return response;
    } catch (e) {
        console.error("[API] Illustration sales API:", e);
        return e;
    }
};
//User specific illustration
illustrationAPI.userIllustration = async () => {
    try {
        const response = await api.get("/illust-products/auth");
        return response;
    } catch (e) {
        console.error("[API] User Illustration API:", e);
        return e;
    }
};
let notificationsAPI = {};
//Register a illustration product
notificationsAPI.getNotifications = async () => {
    try {
        const response = await api.get("/notifications");
        return response;
    } catch (e) {
        console.error("[API] get notifcations:", e);
        return e;
    }
};
// Send seen on click of a notificatio
notificationsAPI.seenNotification = async data => {
    try {
        const response = await api.patch("/notifications", data);
        return response;
    } catch (e) {
        console.error("[API] get notifcations:", e);
        return e;
    }
};

let customAPI = {};

customAPI.createProduct = async data => {
    try {
        const response = await api.post(`/custom`, data);
        return response;
    } catch (e) {
        console.error("[API] get reviews:", e);
        return e;
    }
};

//Get detail of custom product
customAPI.productDetail = async id => {
    try {
        const response = await api.get(`/custom/${id}`);
        return response;
    } catch (e) {
        console.error("[API] get reviews:", e);
        return e;
    }
};

let paymentsAPI = {};

paymentsAPI.hasPaypal = async () => {
    try {
        const response = await api.get(`/hasPaypal`);
        return response;
    } catch (e) {
        console.error("[API] get reviews:", e);
        return e;
    }
};

paymentsAPI.hasPendingRequest = async () => {
    try {
        const response = await api.get(`/pendingWithdraw`);
        return response;
    } catch (e) {
        console.error("[API] get reviews:", e);
        return e;
    }
};

paymentsAPI.getIncome = async () => {
    try {
        const response = await api.get(`/income`);
        return response;
    } catch (e) {
        console.error("[API] get reviews:", e);
        return e;
    }
};

paymentsAPI.applyForWithdawal = async data => {
    try {
        const response = await api.post(`/withdraw`, data);
        return response;
    } catch (e) {
        console.error("[API] get reviews:", e);
        return e;
    }
};

paymentsAPI.setPaypal = async data => {
    try {
        const response = await api.patch(`/paypalme`, data);
        return response;
    } catch (e) {
        console.error("[API] get reviews:", e);
        return e;
    }
};

paymentsAPI.getLedger = async () => {
    //
    try {
        const response = await api.get(`/transaction-history`);
        return response;
    } catch (e) {
        console.error("[API] get reviews:", e);
        return e;
    }
};

//Delete illustraion product

illustrationAPI.getAdminIllustrations = async search => {
    try {
        const response = await api.get(
            `/admin-illustrations?${!!search ? `keyword=${search}` : ""}`
        );
        return response;
    } catch (e) {
        console.error("[API] image upload:", e);
        return e;
    }
};

export {
    productsAPI,
    brandsAPI,
    individualAPI,
    collaborationAPI,
    itemAPI,
    userAPI,
    artistAPI,
    commmonAPI,
    illustrationAPI,
    notificationsAPI,
    customAPI,
    paymentsAPI
};
