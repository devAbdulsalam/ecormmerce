import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// stripe
import { Elements } from '@stripe/react-stripe-js';
import { StripeCheckout } from './StripeCheckout';
import { loadStripe } from '@stripe/stripe-js';

const Payment = ({ isOpen, order, setIsPayment, setIsPaypal }) => {
	// paypal
	// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);
	const stripePromise = loadStripe(
		'pk_test_51NBaTpCCrWcBmYv2xmC9Db65X1M6cyftLwspR6b8z3Xkg5Q0XVX07ZJ2d7286rqwrZrqJ7ZtbnF7Eb3xVVp0YciQ00AcgfSwvG'
	);
	const handlePaypal = () => {
		setIsPaypal(true);
		setIsPayment(false);
	};
	const handelStripe = () => {
		// setIsPaypal(true);
		console.log('pay with stripe');
		setIsPayment(false);
	};
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
										Select a Payment method
									</h2>
								</div>
								<button
									type="button"
									onClick={handlePaypal}
									className="hover:border-gray-600 border border-gray-500 transition-all rounded py-3 text-center text-sm font-medium flex justify-center w-full"
									disabled
								>
									Pay with Paypal
								</button>
								<button
									type="button"
									onClick={handelStripe}
									className="hover:border-gray-600 border border-gray-500 transition-all rounded py-3 text-center text-sm font-medium flex justify-center w-full"
									disabled
								>
									Pay with Bank
								</button>
								{/* stripe */}
								<div className="h-fit">
									<Elements stripe={stripePromise}>
										<StripeCheckout order={order} />
									</Elements>
								</div>
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
					>
						<div
							onClick={() => setIsPayment(false)}
							className="absolute right-5 top-5"
						>
							<button
								type="button"
								className="inline-flex justify-center px-2 py-2 text-base font-medium text-red-500 bg-white border border-transparent rounded-full hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
							>
								<svg
									stroke="currentColor"
									fill="currentColor"
									strokeWidth="0"
									viewBox="0 0 512 512"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
								</svg>
							</button>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Payment;
