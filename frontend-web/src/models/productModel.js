export const defaultProduct = {
    nameVi: '',
    nameEn: '',
    descriptionVi: '',
    descriptionEn: '',
    default_image: '',
    price: '',
    category: {
        _id: '',
        nameVi: '',
        nameEn: '',
        image: '',
    },
    variants: [],
    specifications: [], 
    manufacturer: '',
    dimensions: '',
    warranty: '',
    weight: '',
    status: 1,
};

export const defaultVariant = {
    _id: '',
    serial: '',
    color: '',
    stock: 0,
    price: 0,
    purchasePrice: 0,
    weight: '',
    sku: '',
    images: [], // Array of image objects
    descriptionVi: '',
    descriptionEn: '',
};

export const defaultSpecification = {
    _id: '',
    name: '',
    value: '',
};

export const defaultImage = {
    _id: '',
    url: '',
    isDefault: false,
};
