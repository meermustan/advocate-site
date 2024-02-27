import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    setFilters,
    filterProducts,
    resetFilters,
} from "../../store/reducer/productReducer";
// import Slider  from "reactstrap";
import { Range } from 'react-range'

function SideBar() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products.allProducts);
    const filters = useSelector((state) => state.products.filters);
    console.log(filters);

    // eslint-disable-next-line no-unused-vars
    const [selectedColor, setSelectedColor] = useState(null);

    const categories = allProducts.reduce((uniqueCategories, product) => {
        const category = product.category.toUpperCase();
        if (!uniqueCategories.includes(category)) {
            uniqueCategories.push(category);
        }
        return uniqueCategories;
    }, []);
    const colors = allProducts.reduce((uniqueColors, product) => {
        product.colors.forEach((color) => {
            const colorLowerCase = color.toLowerCase();
            if (!uniqueColors.includes(colorLowerCase)) {
                uniqueColors.push(colorLowerCase);
            }
        });
        return uniqueColors;
    }, []);
    const sizes = allProducts.reduce((acc, product) => {
        product.size.forEach((size) => {
            if (!acc.includes(size)) {
                acc.push(size);
            }
        });
        return acc;
    }, []);

    const handleCategoryClick = (category) => {
        const index = filters.category.indexOf(category);
        if (index === -1) {
            dispatch(
                setFilters({ ...filters, category: [...filters.category, category] })
            );
        } else {
            const updatedCategories = [...filters.category];
            updatedCategories.splice(index, 1);
            dispatch(setFilters({ ...filters, category: updatedCategories }));
        }
    };
    const handleColorClick = (color) => {
        setSelectedColor(color);
        dispatch(setFilters({ ...filters, colors: color }));
    };
    const handleSizeClick = (size) => {
        dispatch(setFilters({ ...filters, size: size }));
    };
    const handlePriceChange = (value) => {
        dispatch(setFilters({ ...filters, prices: value }));
    };
    const resetPriceFilter = () => {
        dispatch(setFilters({ ...filters, prices: [0, 10000] }));
    };
    useEffect(() => {
        dispatch(filterProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    return (
        <div>
            <div className="pb-4 mb-4 mb-4 border-bottom border-light">
                <Button
                    style={{ width: "65px", height: "30px" }}
                    onClick={() => {
                        dispatch(resetFilters());
                    }}
                    className="bg-transparent p-0 text-dark"
                >
                    Reset
                </Button>
            </div>
            <div className="widget widget-categories mb-4 p-4 rounded" style={{ backgroundColor: '#d0faec' }}>
                <h4 className=" mb-3">Categories</h4>
                {categories.map((category) => (
                    <div className="form-check mb-2">
                        <input
                            id={category}
                            type="checkbox"
                            className="form-check-input"
                            value={category}
                            defaultChecked={
                                filters.category.includes(category) ? true : false
                            }
                            onClick={() => handleCategoryClick(category)}
                        />
                        <label className="form-check-label" key={category}>
                            {category}
                        </label>
                    </div>
                ))}
            </div>
            <div className="widget widget-price mb-4 p-4 rounded" style={{ backgroundColor: '#ffeff8' }}>
                <div>
                    <div className="d-inline-flex w-100 justify-content-between">
                        <h4 className="mb-1">Price</h4>
                        <button
                            className="border-0 p-0 bg-light rounded p-1 btn-link mb-2"
                            onClick={() => resetPriceFilter()}
                        >
                            clear
                        </button>
                    </div>
                    <Range
                        step={1}
                        min={0}
                        max={10000}
                        values={filters.prices}
                        onChange={handlePriceChange}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '6px',
                                    width: '100%',
                                    background: '#ccc',
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '20px',
                                    width: '20px',
                                    backgroundColor: '#007bff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                                }}
                            />
                        )}
                    />
                </div>

            </div>
            <div className="z-index-1 mb-4 p-4 rounded" style={{ backgroundColor: '#fff5d9' }}>
                <h4 className="mb-3">Color</h4>
                <ul
                    className="list-inline"
                    style={{
                        display: "grid",
                        justifyContent: "center",
                        gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
                        gridGap: "10px",
                    }}
                >
                    {colors.map((color) => (
                        <li>
                            <div className="form-check ">
                                <input
                                    type="radio"
                                    value={color}
                                    className="form-check-input"
                                    id={color}
                                    style={{
                                        background: color,
                                        width: "26px",
                                        height: "26px",
                                        border:
                                            filters.colors === color
                                                ? "4px solid blue" // Use red border if filters.colors matches with color
                                                : "", // Use default gray border otherwise
                                        paddingLeft: "2px",
                                        borderRadius: "0px",
                                    }}
                                    checked={filters.colors === color}
                                    onChange={() => handleColorClick(color)}
                                />
                            </div>
                            <small style={{ textTransform: 'capitalize' }}>{color}</small>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="widget widget-size p-4 rounded" style={{ backgroundColor: '#ffdeeb' }}>
                <h4 className=" mb-3">Size</h4>
                <div
                    className="pl-0"
                    style={{
                        display: "grid",
                        justifyContent: "center",
                        // height: "40px",
                        gridTemplateColumns: "repeat(5, 1fr)", // show 4 items in one row

                        //gridAutoFlow: "column",
                        paddingBottom: "5px",
                        gap: "5px",
                    }}
                >
                    {sizes.map((size, index) => (
                        <li key={index}>
                            <input
                                name="size"
                                id={size.toLowerCase() + "-size"}
                                type="radio"
                                className="form-check-input"
                                checked={filters.size === size}
                                style={{ display: "none" }}
                                onChange={() => handleSizeClick(size)}
                            />
                            <label
                                htmlFor={size.toLowerCase() + "-size"}
                                style={{
                                    border: "2px solid #ddd",
                                    borderRadius: "5px",
                                    //padding: "5px 15px",
                                    cursor: "pointer",
                                }}
                            >
                                {size}
                            </label>
                        </li>
                    ))}
                </div>
            </div>
        </div >
    );
}

export default SideBar;
