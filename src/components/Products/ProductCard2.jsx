import React, { useEffect, useState } from 'react';
import productImage from '../../assets/product.webp';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const ProductCard2 = ({ product }) => {
  const [uniqueGauges, setUniqueGauges] = useState([]);
  const [uniqueColors, setUniqueColors] = useState([]);
  const [uniqueLengths, setUniqueLengths] = useState([]);

  const [selectedGauge, setSelectedGauge] = useState('');
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (product) {
      setUniqueGauges(Array.from(new Set(product?.parts.map((part) => part.gauge))));
      setUniqueColors(Array.from(new Set(product?.parts.map((part) => part.color))));
      setUniqueLengths(Array.from(new Set(product?.parts.map((part) => part.length))));
    }
  }, [product]);

  const availableGauges =
    selectedLength && selectedColor
      ? product?.parts
          .filter((part) => part.length === selectedLength && part.color === selectedColor)
          .map((part) => part.gauge)
      : uniqueGauges;

  // Filter options for length based on selected gauge and color
  const availableLengths =
    selectedGauge && selectedColor
      ? product?.parts
          .filter((part) => (selectedGauge ? (part.gauge === selectedGauge) : true)  && (selectedColor ?  (part.color === selectedColor) : true))
          .map((part) => part.length)
      : uniqueLengths;

  // Filter options for color based on selected gauge and length
  const availableColors =
    selectedGauge && selectedLength
      ? product?.parts
          .filter((part) => part.gauge === selectedGauge && part.length === selectedLength)
          .map((part) => part.color)
      : uniqueColors;

 
  return (
    <div className="flex flex-col justify-center">
      <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <Link className='className="w-full md:w-1/3 bg-white grid mt-5' to="/product/9">
          <div>
            <img
              src={productImage}
              alt="Product Image"
              className=" border-gris-claire border rounded-lg"
            />
          </div>
        </Link>
        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
          <Link to="/product/9">
            <h3 className="font-black md:text-2xl text-xl">
              {product?.product?.title_enc?.substring(0, 30)}
            </h3>
          </Link>
          <Link to="/product/9">
            <p className=" text-gray-500 text-base">
              {product?.product?.desc_enc?.substring(0, 250)}
            </p>
          </Link>
          <div className="flex gap-2">
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedGauge}
                onChange={(e) => setSelectedGauge(e.target.value)}
                className="bg-white rounded-lg border border-gray-300 py-1 px-2 text-sm">
                <option value="" disabled selected>
                  Gauge
                </option>
                {availableGauges?.map((gauge, index) => (
                  <option key={index} value={gauge}>
                    {gauge}
                  </option>
                ))}
              </select>

              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="bg-white rounded-lg border border-gray-300 py-1 px-2 text-sm">
                <option value="" disabled selected>
                  Color
                </option>
                {availableColors?.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>

              <select
                value={selectedLength}
                onChange={(e) => setSelectedLength(e.target.value)}
                className="bg-white rounded-lg border border-gray-300 py-1 px-2 text-sm">
                <option value="" disabled selected>
                  Length
                </option>
                {availableLengths?.map((length, index) => (
                  <option key={index} value={length}>
                    {length}
                  </option>
                ))}
              </select>

              <input
                className="bg-white rounded-lg border border-gray-300 py-1 px-2 text-sm max-w-[80px]"
                placeholder="Quantity"
              />
            </div>
            <div>
              <Button className="bg-green-primary text-white rounded-lg py-1 px-2 text-sm border-green-primary">
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
