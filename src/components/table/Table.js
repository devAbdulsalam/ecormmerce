import React from 'react';
import formatDateString from '../../hooks/useFormattedDate';
import { useNavigate } from 'react-router-dom';

const Table = ({ title, data, loading, error }) => {
	let navigate = useNavigate();
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});
	return (
		<div className="max-w-screen-2xl mx-auto ">
			<div className="rounded-md ">
				<div className="flex flex-col">
					{title && <h3 className="text-lg font-medium mb-5">{title}</h3>}
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="align-middle inline-block   rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
							<div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
								<table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr className="text-xs bg-gray-100">
											<th
												scope="col"
												className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
											>
												Sr.
											</th>
											<th
												scope="col"
												className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
											>
												Order ID
											</th>
											<th
												scope="col"
												className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
											>
												Order Total
											</th>
											<th
												scope="col"
												className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
											>
												Date
											</th>
											<th
												scope="col"
												className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-right"
											>
												status
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{data &&
											data.map((item, index) => (
												<tr key={index}>
													<th className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
														{index + 1}
													</th>
													<td className="px-6 py-1 whitespace-nowrap font-normal text-gray-500">
														{item._id}
													</td>
													<td className="px-6 py-1 whitespace-nowrap font-bold text-center">
														{formatter.format(item.totalPrice)}
													</td>
													<td className="px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu">
														{formatDateString(item?.createdAt)}
													</td>
													<td className="px-6 py-1 whitespace-nowrap text-right font-bold font-DejaVu k-grid">
														{item?.isPaid ? (
															<button
																onClick={() => navigate(`/order/${item._id}`)}
																className={`${
																	item.isDelivered === 'processing'
																		? `text-yellow-500`
																		: 'text-green-500'
																} m-1 rounded-md capitalize`}
															>
																{item.isDelivered}
															</button>
														) : (
															<button
																onClick={() =>
																	navigate(`/checkout/${item._id}`)
																}
																className={`text-blue-500 m-1 rounded-md`}
															>
																Check out
															</button>
														)}
													</td>
												</tr>
											))}
									</tbody>
								</table>
								{loading && (
									<p className="text-blue-500 text-xl text-center w-full">
										Loading
									</p>
								)}
								{error && (
									<p className="text-red-500 text-xl text-center w-full">
										{error}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;
