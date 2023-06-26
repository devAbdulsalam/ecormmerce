import React, { useState, useEffect } from 'react';
import CheckOutSummary from '../orderSummary/CheckOutSummary';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import Payment from '../payment/Payment';
import Paypal from '../payment/Paypal';
// import { useGetPaymentOptionQuery } from '../../fetchers/appApi';
import { loadingAction } from '../../store/reducers/loadingSlice';
import { useGetOrderQuery } from '../../fetchers/appApi';

function CheckOutOrder() {
	const { id } = useParams();
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const { cartTotalAmount } = useSelector((state) => state.cart);
	const { ...item } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.user);
	const orders = useSelector((state) => state.orders);
	const userId = user?.user?._id;
	const [shippingPrice, setShippingPrice] = useState('50');
	let [isPayment, setIsPayment] = useState(false);
	let [paymentMethod, setPaymentMethod] = useState(false);
	let [isPaypal, setIsPaypal] = useState(false);
	let [order, setOrder] = useState('');
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const { isSuccess, isError, isLoading, error } = useGetOrderQuery({
		userId,
	});
	useEffect(() => {
		if (orders) {
			const singleOrder = orders.find((order) => order._id === id);
			if (singleOrder) {
				console.log(singleOrder);
				return setOrder(singleOrder);
			}
		}
	}, [id, orders, navigate]);
	// const { data, isSuccess, isError, isLoading, error } =
	// 	useGetPaymentOptionQuery();
	if (isLoading) {
		dispatch(loadingAction(true));
	}
	if (isSuccess) {
		dispatch(loadingAction(true));
	}
	if (isError) {
		console.log(error.error);
		toast.error(error?.error?.message || error.error);
		dispatch(loadingAction(false));
	}
	const handleSubmit = (value) => {
		if (!cartTotalAmount > 50) {
			return toast.error('Order Items must worth more than $100');
		}

		if (value.shippingOption === 'fedx') {
			setShippingPrice(50);
		} else {
			setShippingPrice(60);
		}
		const data = {
			userId,
			id,
			invoice: id,
			cart: item.cartItems,
			shippingPrice,
			...value,
			cartTotalAmount,
			totalPrice: Number(cartTotalAmount + shippingPrice),
			createdDate: new Date(),
			updatedDate: new Date(),
		};
		setOrder(data);
		setIsPaypal(true);
		// .post(`${process.env.REACT_APP_BASE_API_URL}/order/create`, data)
		// navigate(`/order/${id}`);
	};
	if (order) {
		return (
			<div className="bg-gray-50">
				<div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
					<div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
						<div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
							<div className="mt-5 md:mt-0 md:col-span-2">
								<div>
									<h2 className="font-semibold  text-base text-gray-700 pb-3">
										01. Personal Details
									</h2>
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<h2 className="block text-gray-500 font-medium text-sm leading-none mb-2">
												First Name : {order?.firstName}
											</h2>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<h2 className="block text-gray-500 font-medium text-sm leading-none mb-2">
												Last Name : {order?.lastName}
											</h2>
										</div>
										<div className="col-span-6 sm:col-span-3">
											<h2 className="block text-gray-500 font-medium text-sm leading-none mb-2">
												Email Address : {order?.email}
											</h2>
										</div>
										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="phoneNumber"
												className="block text-gray-500 font-medium text-sm leading-none mb-2"
											>
												Phone Number: {order.phone}
											</label>
										</div>
									</div>
								</div>
								<div className="mt-12">
									<h2 className="font-semibold  text-base text-gray-700 pb-3">
										02. Shipping Details
									</h2>
									<div className="grid grid-cols-6 gap-6 mb-8">
										<div className="col-span-6 ">
											<h2 className="block text-gray-500 font-medium text-sm leading-none mb-2">
												Street Address: {order.address}
											</h2>
										</div>
										<div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<h2 className="block text-gray-500 font-medium text-sm leading-none mb-2">
												City: {order.city}
											</h2>
										</div>
										<div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<h2 className="block text-gray-500 font-medium text-sm leading-none mb-2">
												Country: {order.country}
											</h2>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label
												htmlFor="zipPostal"
												className="block text-gray-500 font-medium text-sm leading-none mb-2"
											>
												ZIP / Postal : {order.zipCode}
											</label>
										</div>
									</div>
									<label className="block text-gray-500 font-medium text-sm leading-none mb-2">
										Shipping Cost
									</label>
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">UPS</div>
										<div className="col-span-6 sm:col-span-3">
											<div>UPS</div>
										</div>
									</div>
								</div>

								<div className="mt-12">
									<h2 className="font-semibold  text-base text-gray-700 pb-3">
										03. Payment Details
									</h2>
									<div className="mb-3">Stripe is Payment</div>
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<div className="px-3 py-4 border border-gray-200 bg-white rounded-md">
												select
											</div>
										</div>
										<div className="col-span-6 sm:col-span-3">
											<div className="px-3 py-4 border border-gray-200 bg-white rounded-md">
												<label className="cursor-pointer">
													<div className="flex items-center justify-between">
														<div className="flex items-center">
															<span className="text-xl mr-3 text-gray-400">
																<svg
																	stroke="currentColor"
																	fill="currentColor"
																	strokeWidth="0"
																	viewBox="0 0 512 512"
																	height="1em"
																	width="1em"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path d="M47.5 104H432V51.52a16 16 0 00-19.14-15.69l-368 60.48a16 16 0 00-12 10.47A39.69 39.69 0 0147.5 104zm416 24h-416a16 16 0 00-16 16v288a16 16 0 0016 16h416a16 16 0 0016-16V144a16 16 0 00-16-16zM368 320a32 32 0 1132-32 32 32 0 01-32 32z"></path>
																	<path d="M31.33 259.5V116c0-12.33 5.72-18.48 15.42-20 35.2-5.53 108.58-8.5 108.58-8.5s-8.33 16-27.33 16V128c18.5 0 31.33 23.5 31.33 23.5L84.83 236z"></path>
																</svg>
															</span>
															<h6 className=" font-medium text-sm text-gray-600">
																Credit Card
															</h6>
														</div>
													</div>
												</label>
											</div>
										</div>
									</div>
								</div>
								{isError && (
									<p className="text-red-500 text-sm my-1">{isError}</p>
								)}
								<div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
									<div className="col-span-6 sm:col-span-3">
										<Link
											className="bg-indigo-50 border !no-underline border-indigo-100 rounded py-3 text-center text-sm font-medium !text-gray-700  hover:!text-gray-800 hover:border-gray-300 transition-all flex justify-center w-full"
											to="/"
										>
											<span className="text-xl mr-2">
												<svg
													stroke="currentColor"
													fill="currentColor"
													strokeWidth="0"
													viewBox="0 0 512 512"
													height="1em"
													width="1em"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="32"
														d="M112 160l-64 64 64 64"
													></path>
													<path
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="32"
														d="M64 224h294c58.76 0 106 49.33 106 108v20"
													></path>
												</svg>
											</span>
											Continue Shopping
										</Link>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<button
											type="submit"
											disabled={isLoading}
											onClick={handleSubmit}
											className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm  font-medium text-white flex justify-center w-full"
										>
											Confirm Order{' '}
											<span className="text-xl ml-2">
												{' '}
												<svg
													stroke="currentColor"
													fill="currentColor"
													strokeWidth="0"
													viewBox="0 0 512 512"
													height="1em"
													width="1em"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="48"
														d="M268 112l144 144-144 144m124-144H100"
													></path>
												</svg>
											</span>
										</button>
									</div>
								</div>
							</div>
						</div>
						<CheckOutSummary order={order} />
					</div>
				</div>
				<Paypal order={order} isOpen={isPaypal} />
				<Payment
					isOpen={isPayment}
					setIsPayment={setIsPayment}
					setPaymentMethod={setPaymentMethod}
					setIsPaypal={setIsPaypal}
					order={order}
				/>
			</div>
		);
	}
}

export default CheckOutOrder;
