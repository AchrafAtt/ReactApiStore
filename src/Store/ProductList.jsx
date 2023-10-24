import {useEffect, useState} from "react";
import Product from "./Product";

export default function ProductList() {
    const [productList, setProductList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [categoriesList, setCategoriesList] = useState([]);
    const [currentCategory, setCurrentCategory] = useState();

    const displayCategoriesList = () => {
        return categoriesList.map((category, key) => (
            <button className={'btn ' + (currentCategory === category ? 'btn-dark' : 'btn-secondary')} key={key}
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentCategory(category);
                    }}>{category}</button>
        ));
    }

    const displayProducts = () => {
        const productTemp = productList.filter((product) => {
            return (
                (product.title.includes(searchInput) ||
                    product.id.toString().includes(searchInput) ||
                    product.description.includes(searchInput)) &&
                (!currentCategory || product.category === currentCategory)
            );
        });

        if (productTemp.length > 0) {
            return productTemp.map((product, key) => (
                <Product product={product} key={key}/>
            ));
        }

        return (
            <tr>
                <td colSpan={7}>No Items</td>
            </tr>
        );
    }

    const getProduct = () => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then((response) => setProductList(response));
    }

    const getCategories = () => {
        fetch("https://fakestoreapi.com/products/categories")
            .then((response) => response.json())
            .then((response) => setCategoriesList(response));
    }

    useEffect(() => {
        getProduct();
        getCategories();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = document.querySelector("#search").value;
        setSearchInput(searchValue);
    };

    return (
        <div className="container-fluid mx-auto w-75 my-5">
            <h2>Search</h2>
            <form>
                <div className="input-group rounded">
                    <input
                        type="search"
                        id="search"
                        className="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                    />
                    <input
                        type="submit"
                        className="input-group-text border-0"
                        id="submit"
                        onClick={handleSearch}
                        value="Search"
                    />
                </div>
                <div className="row g-3 align-items-center">
                    <h5 className="px-3">Categories</h5>
                    <div className="btn-group p-2 w-100">
                        {displayCategoriesList()}
                    </div>
                </div>
            </form>
            <h1>List of products</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Desc</th>
                    <th>Categ</th>
                    <th>Image</th>
                    <th>Rating</th>
                </tr>
                </thead>
                <tbody>{displayProducts()}</tbody>
            </table>
        </div>
    );
}
