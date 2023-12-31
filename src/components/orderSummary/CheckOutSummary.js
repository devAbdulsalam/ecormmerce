import React from 'react';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
function CheckOutSummary({ order }) {
	return (
		<div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
			<div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
				<h2 className="font-semibold text-black text-lg pb-4">Order Summary</h2>
				<div className="overflow-y-scroll flex-grow w-full max-h-64 bg-gray-50 block ">
					{order?.cart?.map((cartItem, index) => {
						return (
							<div
								key={index}
								className="group w-full h-auto flex justify-start items-center bg-white py-3 px-4 border-b hover:bg-gray-50 transition-all border-gray-100 relative last:border-b-0 "
							>
								<div className="relative flex rounded-full border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 cursor-pointer mr-4">
									<img
										src={cartItem.image?.url}
										width="40"
										height="40"
										alt="Blueberry"
									/>
								</div>
								<div className="flex flex-col w-full overflow-hidden">
									<Link
										className="truncate text-sm font-medium !no-underline !text-gray-700 text-heading line-clamp-1 "
										to="/product/bluberry"
									>
										{cartItem.name}
									</Link>
									<span className="text-xs text-gray-400 mb-1">
										Item Price $ {cartItem.price}
									</span>
									<div className="flex items-center justify-between">
										<div className="font-bold text-sm md:text-base text-heading leading-5">
											<span className="text-black">
												$ {cartItem.price * cartItem.cartQuantity}
											</span>
										</div>
										<div className="h-8 w-22 md:w-24 lg:w-24 flex flex-wrap items-center justify-evenly p-1 border border-gray-100 bg-white text-gray-600 rounded-md">
											{/* <button onClick={() => dispatch(decreaseCart(cartItem))}>
												<span className="text-dark text-base">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth="2"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M18 12H6"
														/>
													</svg>
												</span>
											</button> */}
											<p className="text-sm font-semibold text-dark px-1">
												{cartItem.cartQuantity}
											</p>
											{/* <button onClick={() => dispatch(incrementCart(cartItem))}>
												<span className="text-dark text-base">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth="2"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M12 6v6m0 0v6m0-6h6m-6 0H6"
														/>
													</svg>
												</span>
											</button> */}
										</div>
										{/* <button
											onClick={() => dispatch(removeFromCart(cartItem))}
											className="hover:text-red-600 text-red-400 text-lg cursor-pointer"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</button> */}
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="flex items-center mt-4 py-4 lg:py-4 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0 ">
					<form className="w-full">
						<div className="flex flex-col sm:flex-row items-start justify-end">
							<input
								type="text"
								placeholder="Input your coupon code"
								className="form-input py-2 px-3 md:px-4 w-full appearance-none transition ease-in-out border text-input text-sm rounded-md h-12 duration-200 bg-white border-gray-200 focus:ring-0 focus:outline-none focus:border-emerald-500 placeholder-gray-500 placeholder-opacity-75"
							></input>
							<button className="md:text-sm text-black leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border border-gray-200 rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-3 sm:mt-0 sm:ml-3 md:mt-0 md:ml-3 lg:mt-0 lg:ml-3 hover:text-white hover:bg-emerald-500 h-12 text-sm lg:text-base w-full sm:w-auto">
								Apply
							</button>
						</div>
					</form>
				</div>
				<div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0   ">
					Subtotal
					<span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
						$ {order.cartTotalAmount}
					</span>
				</div>
				<div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0   ">
					Shipping Cost
					<span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
						$ {order.shippingPrice}
					</span>
				</div>
				<div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
					Discount
					<span className="ml-auto flex-shrink-0 font-bold text-orange-400">
						$ {order.discount}
					</span>
				</div>
				<div className="border-t mt-4 text-black">
					<div className="flex items-center font-bold justify-between pt-5 text-sm uppercase">
						Total Cost
						<span className="font-extrabold text-lg">$ {order.totalPrice}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CheckOutSummary;
