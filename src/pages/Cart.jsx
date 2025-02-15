import { Button } from '@/components/ui/button';
import React from 'react';
import { BiPrinter } from 'react-icons/bi';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import product from '../assets/product.webp';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Edit, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/fullWdialgog';

import {
  Dialog as DialogSmall,
  DialogContent as DialogContentSmall,
  DialogDescription as DialogDescriptionSmall,
  DialogFooter as DialogFooterSmall,
  DialogHeader as DialogHeaderSmall,
  DialogTitle as DialogTitleSmall
} from '@/components/ui/dialog';
import EditPopup from '@/components/Cart/EditPopup';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const [endUsers, setEndUsers] = useState(null);
  const [selectedEndUser, setSelectedEndUser] = useState(null);
  const [loadingAttach, setLoadingAttach] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [customAddress, setCustomAddress] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      ship_id: '1',
      customer_id: '020025',
      customer_num: '66',
      address: '1841 Vultee St',
      city: 'Allentown',
      state: 'PA',
      country: 'United States',
      zip: '18103',
      is_default: '1',
      label: 'My address'
    },
    {
      ship_id: '2',
      customer_id: '020025',
      customer_num: '66',
      address: '1841 Vultee St',
      city: 'Allentown',
      state: 'PA',
      country: 'United States',
      zip: '18103',
      is_default: '0',
      label: 'My address'
    },
    {
      ship_id: '3',
      customer_id: '020025',
      customer_num: '66',
      address: '1841 Vultee St',
      city: 'Allentown',
      state: 'PA',
      country: 'United States',
      zip: '18103',
      is_default: '0',
      label: 'Attached client address'
    }
  ]);

  useEffect(() => {
    if (addresses) {
      setSelectedAddress(addresses?.find((c) => c.is_default == 1));
    }
  }, [addresses]);

  useEffect(() => {
    const getEndUsers = async () => {
      await axios
        .get(`${import.meta.env.VITE_REACT_API_URL}/endusers`, {
          headers: {
            Authorization: 'Bearer 14|oZVlGgeRq3B0wR7grDn9QfxL6jiNwMS29LHxfE62f994cf75'
          }
        })
        .then((res) => {
          setEndUsers(res.data.data);
        })
        .catch(() => {
          toast.error('Error getting End Users');
        });
    };

    getEndUsers();
  }, []);

  const deleteLine = async (id) => {
    //setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const getCart = async () => {
      setLoading(true);
      await axios
        .get(`${import.meta.env.VITE_REACT_API_URL}/cart/lines`, {
          headers: {
            Authorization: 'Bearer 14|oZVlGgeRq3B0wR7grDn9QfxL6jiNwMS29LHxfE62f994cf75'
          }
        })
        .then((res) => {
          setLoading(false);
          const cartData = res.data.lines.map((item) => ({
            ...item,
            line: {
              ...item.line,
              id: item.line.id.toString() // Ensure ID is treated as a string
            }
          }));
          setCart(cartData);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    };

    getCart();
  }, []);

  const AttachCart = async () => {
    setLoadingAttach(true);
    await axios
      .post(
        `${import.meta.env.VITE_REACT_API_URL}/cart/enduser/attach`,
        {
          end_user_id: selectedEndUser
        },
        {
          headers: {
            Authorization: 'Bearer 14|oZVlGgeRq3B0wR7grDn9QfxL6jiNwMS29LHxfE62f994cf75'
          }
        }
      )
      .then(() => {
        toast.success('Cart attached successfully');
        setLoadingAttach(false);
      })
      .catch((e) => {
        toast.error('Error attaching cart');
        setLoadingAttach(false);
      });
  };

  function parseProductVariables(input) {
    if (!input) return {};

    const allowedProperties = ['A', 'B', 'C', 'P1', 'P2', 'X', 'Y'];
    const result = {};
    const parts = input.split(' ');

    if (parts.length < 3) return result;

    // Extract the "Louv: 4: AEGI" part
    const letters = parts[2];
    result.V = letters ? letters.split('') : [];

    // Extract the remaining key-value pairs (A=2", B=1", etc.)
    parts.slice(3).forEach((part) => {
      const [key, value] = part.split('=');
      if (key && value && allowedProperties.includes(key)) {
        result[key] = parseFloat(value.replace('"', ''));
      }
    });
    console.log(result);
    return result;
  }

  return (
    <div className="wrapper">
      {loading ? (
        <div className="h-full flex items-center justify-center mt-12">
          <ClipLoader
            color={'black'}
            loading={loading}
            //cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <div className="flex lg:items-center lg:justify-between lg:flex-row flex-col gap-4">
            <div className="flex items-center gap-4 justify-between lg:justify-normal">
              <h3 className="capitalize text-xl font-bold">Your shopping cart</h3>
              <Button>Save</Button>
            </div>
            <div>
              <Button className="text-lg font-semibold" size="lg">
                <BiPrinter className="mr-2 h-8 w-8" /> Print
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row w-100 lg:mt-8">
            <Table className="whitespace-nowrap lg:w-[100%] w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Items</TableHead>
                  <TableHead>QTY</TableHead>
                  <TableHead>Option(s)</TableHead>
                  <TableHead className="text-right">Price</TableHead>

                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex gap-2 min-w-max">
                      <img
                        src={
                          item?.line?.product_category?.toLowerCase() === 'flashing' ||
                          item?.line?.product_category?.toLowerCase() === 'accessories'
                            ? `${import.meta.env.VITE_REACT_PRODUCT_IMAGES_URL}/trim/${item?.line?.product_brand.toLowerCase()}.webp`
                            : item?.line?.product_category?.toLowerCase() === 'flats'
                              ? `${import.meta.env.VITE_REACT_PRODUCT_IMAGES_URL}/flat/${item?.line?.product_brand.toLowerCase()}.webp`
                              : item?.line?.product_category?.toLowerCase() === 'screws'
                                ? `${import.meta.env.VITE_REACT_PRODUCT_IMAGES_URL}/screws/${item?.line?.product_brand.toLowerCase()}.webp`
                                : item?.line?.product_category?.toLowerCase() === 'sliding doors'
                                  ? `${import.meta.env.VITE_REACT_PRODUCT_IMAGES_URL}/west/${item?.line?.product_brand.toLowerCase()}.webp`
                                  : item?.line?.product_category?.toLowerCase() === 'roofing/siding'
                                    ? `${import.meta.env.VITE_REACT_PRODUCT_IMAGES_URL}/${item?.line?.product_brand?.toLowerCase()}/panel.webp`
                                    : item?.line?.product_category?.toLowerCase() === 'decking'
                                      ? `${import.meta.env.VITE_REACT_PRODUCT_IMAGES_URL}/${item?.line?.product_brand?.toLowerCase()}/diagram.webp`
                                      : product
                        }
                        alt="Product Image"
                        className="border-gris-claire border rounded-lg w-40 aspect-w-1 aspect-h-1"
                      />

                      <div>
                        <h3 className="font-bold mb-2">{item?.line?.product_name}</h3>
                        <div className="text-gris-claire text-lg">
                          {item?.part[0]?.color_enc && <p>color: {item?.part[0]?.color_enc}</p>}

                          {item?.part[0]?.gauge && <p>Gauge: {item?.part[0]?.gauge}</p>}

                          <p>Length: {item?.line?.product_entryLen}</p>

                          {item?.part[0]?.size1 && <p>Size1: {item?.part[0]?.size1}</p>}

                          {item?.part[0]?.size2 && <p>size2: {item?.part[0]?.size2}</p>}

                          {item?.part[0]?.sub_brand && <p>Profile: {item?.part[0]?.sub_brand}</p>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="w-40 ">
                      <p className="w-full">{item?.line?.product_salesQty}</p>
                    </TableCell>
                    <TableCell className="max-w-max">
                      <div className="text-gris-claire text-lg">
                        {(() => {
                          try {
                            const productVariablesString = item?.line?.product_variables;
                            const parsedVariables = productVariablesString
                              ? parseProductVariables(productVariablesString)
                              : {};

                            return Object.entries(parsedVariables).map(([key, value]) => (
                              <p className="max-w-max" key={key}>
                                {key}: {Array.isArray(value) ? value.join(', ') : value}
                              </p>
                            ));
                          } catch (error) {
                            console.error('Invalid product variables string:', error);
                            return null;
                          }
                        })()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className=" text-lg">
                        <p>${item?.line?.unity_price}</p>
                        <p className="text-gris-claire">${item?.line?.unity_price}</p>
                      </div>
                    </TableCell>

                    <TableCell className="w-full">
                      <div className="flex gap-3 items-center justify-center w-full">
                        <Dialog>
                          <DialogTrigger>
                            <Edit className="cursor-pointer" size={22} />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit cart line</DialogTitle>
                              <DialogDescription>
                                <EditPopup
                                  vars={parseProductVariables(
                                    item?.line?.product_variables
                                      ? item?.line?.product_variables
                                      : {}
                                  )}
                                  id={item?.line?.id}
                                />
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Trash className="cursor-pointer" size={22} />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this line?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this
                                line.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteLine(item?.line?.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="border border-gris-claire rounded-lg p-4 lg:w-[30%] max-h-max">
              <div className="border-b-2 border-black flex flex-col gap-8 pb-8">
                <div className="flex justify-between items-center">
                  <p>Misc Charges : </p>
                  <p>$245</p>
                </div>

                <div className="flex justify-between items-center">
                  <p>Lines Total : </p>
                  <p>$2485</p>
                </div>

                <div className="flex justify-between items-center">
                  <p>Delivery Fee : </p>
                  <p>$250</p>
                </div>
              </div>

              <div className="border-b-2 border-black flex flex-col gap-8 py-8">
                <div className="flex justify-between items-center">
                  <p>Subtotal : </p>
                  <p>$245978</p>
                </div>

                <div className="flex justify-end items-center">
                  <p>+ Applicable Taxes</p>
                </div>
              </div>

              <div className="py-8">
                <div className="flex justify-between items-center">
                  <p className="font-bold">Grand Total : </p>
                  <p>$245978</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <select
                  className="bg-white border border-gray-300 rounded-md py-1 px-2 w-full disabled:opacity-50"
                  onChange={(e) => setSelectedEndUser(e.target.value)}
                  value={selectedEndUser}>
                  <option value="">Select an client</option>
                  {endUsers?.map((user) => (
                    <option key={user?.id} value={user?.id}>
                      {user?.name}
                    </option>
                  ))}
                </select>
                <Button
                  disabled={loadingAttach || !selectedEndUser}
                  onClick={loadingAttach ? null : AttachCart}
                  className="w-100 rounded-md">
                  {loadingAttach ? 'Attaching cart' : 'Attach a client'}
                </Button>

                <DialogSmall>
                  <DialogTrigger>
                    <Button className="w-100 rounded-md bg-green-primary text-white hover:bg-green-primary/90 border-green-primary w-full">
                      Request Quote
                    </Button>
                  </DialogTrigger>
                  <DialogContentSmall>
                    <DialogHeaderSmall>
                      <DialogTitleSmall>Please choose an address </DialogTitleSmall>
                    </DialogHeaderSmall>
                    <DialogDescriptionSmall className="flex flex-col gap-2">
                      {addresses?.map((address) => (
                        <div
                          onClick={() => setSelectedAddress(address)}
                          className={`flex justify-between gap-4 text-black border rounded-md px-4 py-3 cursor-pointer ${
                            selectedAddress?.ship_id === address?.ship_id
                              ? 'ring-2 ring-blue-500'
                              : ''
                          }`}
                          key={address?.ship_id}>
                          <div>
                            <h3 className="font-blod text-xl">{address.label}</h3>
                            <div>
                              {address?.address +
                                ', ' +
                                address?.city +
                                ', ' +
                                address?.zip +
                                ' ' +
                                address?.state +
                                ', ' +
                                address?.country}
                            </div>
                          </div>
                          <div>
                            <input
                              checked={selectedAddress?.ship_id === address?.ship_id}
                              type="radio"
                            />
                          </div>
                        </div>
                      ))}

                      <div
                        onClick={() => setSelectedAddress(null)}
                        className={`flex justify-between gap-4 text-black border rounded-md px-4 py-3 cursor-pointer ${
                          !selectedAddress ? 'ring-2 ring-blue-500' : ''
                        }`}>
                        <div>
                          <h3 className="font-blod text-xl">Custom address</h3>
                        </div>
                        <div>
                          <input checked={!selectedAddress} type="radio" />
                        </div>
                      </div>
                    </DialogDescriptionSmall>

                    <DialogFooterSmall>
                      <Button className="w-100 rounded-md bg-green-primary text-white hover:bg-green-primary/90 border-green-primary">
                        Request Quote
                      </Button>
                    </DialogFooterSmall>
                  </DialogContentSmall>
                </DialogSmall>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
