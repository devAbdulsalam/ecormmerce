import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
// paypla

import axios from '../../axios';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const Paypal = ({ isOpen, order, setIsPayment }) => {
	let navigate = useNavigate();
	// paypal
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
	useEffect(() => {
		if (order) {
			const loadPaypalScript = async () => {
				const { data: clientId } = await axios.get('/api/keys/paypal');
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': clientId,
						currency: 'USD',
					},
				});
				paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
			};
			loadPaypalScript();
		}
	}, [paypalDispatch, order]);

	function createOrder(data, actions) {
		return actions.order
			.create({
				purchase_units: [
					{
						reference_id: 'default',
						amount: {
							value: '10.00',
							currency_code: 'USD',
						},
					},
				],
			})
			.then((orderId) => {
				return orderId;
			});
	}

	function onApprove(data, actions) {
		return actions.order.capture().then((details) => {
			try {
				toast.success(`Paypal transaction completed`);
				console.log(details);
				console.log(order);
				axios
					.post(`${process.env.REACT_APP_BASE_API_URL}/order/pay`, order)
					.then((res) => res.data)
					.then((data) => {
						toast.success(data.message);
						navigate(`/order/${order._id}`);
					})
					.catch((error) => {
						toast.error(
							error
								? error?.response?.data?.error ||
										error?.response?.data?.message ||
										error?.response?.data?.error.message ||
										error?.message
								: error?.message
						);
					});
			} catch (error) {
				console.log(error);
			}
		});
	}
	function onError(error) {
		return console.log('an error occur', error);
	}
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				static={true}
				as="div"
				className=" fixed inset-0 overflow-y-auto text-center z-30"
				onClose={() => {}}
			>
				<div className="min-h-screen px-4">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-60" />
					</Transition.Child>
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						​
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel
							className="
								inline-block w-full max-w-lg
								p-10 overflow-hidden text-left 
								align-middle transition-all transform 
								bg-white shadow-xl rounded-2xl "
						>
							<div className="overflow-hidden bg-white mx-auto">
								<div className="text-center mb-6">
									<h2 className="font-semibold text-black text-2xl text-center py-2 px-5 capitalize">
										Pay with Paypal
									</h2>
								</div>
								<>
									{isPending ? (
										<button
											type="button"
											className="hover:border-gray-600 border border-gray-500 transition-all rounded py-3 text-center text-sm font-medium flex justify-center w-full"
											disabled
										>
											Loading Paypal...
										</button>
									) : (
										<PayPalButtons
											style={{ layout: 'horizontal' }}
											createOrder={createOrder}
											onApprove={onApprove}
											onError={onError}
										/>
									)}{' '}
								</>
							</div>
						</Dialog.Panel>
					</Transition.Child>
					<Transition.Child
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					></Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Paypal;
