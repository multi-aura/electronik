
export const createCartItem = (id, name, variantID, priceold, price, quantity, image, serial, sku, color, sale) => {
    return {
        id,
        name,
        priceold,
        price,
        quantity,
        image,
        serial,
        variantID,
        sku,
        color,
        sale,
    };
};


// Lấy giỏ hàng từ sessionStorage
export const getCart = () => {
    const cart = sessionStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

// Lưu giỏ hàng vào sessionStorage
export const saveCart = (cart) => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = (product) => {
    const cart = getCart();
    const existingProduct = cart.find(item => item.serial === product.serial);

    if (existingProduct) {
        existingProduct.quantity += product.quantity;  // Cập nhật số lượng nếu sản phẩm đã có trong giỏ
    } else {
        cart.push(product);  // Nếu chưa có, thêm sản phẩm vào giỏ hàng
    }

    saveCart(cart);
    window.dispatchEvent(new Event('cartUpdated'));
};

// Cập nhật số lượng sản phẩm
export const updateQuantity = (productId, quantity) => {
    const cart = getCart();
    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity = quantity;
        saveCart(cart);
    }
    window.dispatchEvent(new Event('cartUpdated'));
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = (productId) => {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.serial !== productId);

    saveCart(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
};

// Tính tổng giá trị giỏ hàng
export const calculateTotal = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
export const calculateTotal_current = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.priceold * item.quantity, 0);
};
export const clearCart = () => {
    sessionStorage.removeItem('cart'); // Xóa giỏ hàng khỏi sessionStorage
    window.dispatchEvent(new Event('cartUpdated')); // Gửi sự kiện để cập nhật lại giao diện
};

// tính tổng số lượng sản phẩm trong giỏ hàng
export const getTotalQuantity = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}