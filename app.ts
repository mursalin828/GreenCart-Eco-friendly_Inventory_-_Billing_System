type Category = "Stationery" | "Clothing" | "Home";

interface Product {
    id: number;
    title: string;
    price: number;
    category: Category;
    tags: string[];
}

type DiscountTuple = [string, number];
const activeCoupon: DiscountTuple = ["ECO20", 20];

const products: Product[] = [
    { id: 1, title: "Seed Paper Notebook", price: 450, category: "Stationery", tags: ["organic", "paper"] },
    { id: 2, title: "Plantable Calendar", price: 350, category: "Stationery", tags: ["seed", "2026"] },
    { id: 3, title: "Organic Bamboo Tote", price: 600, category: "Clothing", tags: ["bag", "reusable"] },
    { id: 4, title: "Clay Water Bottle", price: 800, category: "Home", tags: ["clay", "cool"] }
];

function renderProducts(): void {
    const productListDiv = document.getElementById("product-list");
    if(!productListDiv) return;

   
    productListDiv.innerHTML = products.map(product => `
        <div class="product-card">
            <h3>${product.title}</h3>
            <p>Price: ৳${product.price}</p>
            <p>Category: <strong>${product.category}</strong></p>
            <div>${product.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}</div>
            <button onclick="generateBill(${product.id})">Buy Now</button>
        </div>
        `).join('');
}

(window as any).generateBill = function(productId: number): void {
    const selectedProduct = products.find(p => p.id === productId);

    if (selectedProduct) {
        let discountPercent = activeCoupon[1];
        
       
        let discountAmount: number = (selectedProduct.price * discountPercent / 100);
        let finalBill: number = (selectedProduct.price - discountAmount);

        const invoiceDiv = document.getElementById("invoice-card");
        if (invoiceDiv) {
            invoiceDiv.innerHTML = `
                <h3>Receipt</h3>
                <p><strong>Item:</strong> ${selectedProduct.title}</p>
                <p><strong>Original Price:</strong> ৳${selectedProduct.price}</p>
                <p><strong>Coupon Discount (${activeCoupon[0]}):</strong> -৳${discountAmount}</p>
                <hr>
                <h4><strong>Total Payable:</strong> ৳${finalBill}</h4>
            `;
        }
    }
}

renderProducts();