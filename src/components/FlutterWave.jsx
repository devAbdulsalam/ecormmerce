import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadingAction } from '../store/reducers/loadingSlice';

const FlutterWave = ({ data }) => {
	const apiUrl = process.env.REACT_APP_BASE_API_URL;
	// const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const apiKey = process.env.REACT_APP_FLWPUBK;
	const config = {
		public_key: apiKey,
		tx_ref: `${data?._id}:${Math.floor(Math.random() * 1000000000 + 1)}`,
		amount: data?.totalPrice,
		currency: 'NGN',
		payment_options: 'card,mobilemoney,ussd',
		customer: {
			email: data?.email,
			phone_number: data?.phone,
			name: `${data?.firstName} ${data?.lastName}`,
		},
		customizations: {
			title: 'My store',
			description: `Test Payment for ${data?.firstName} orders`,
			logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
		},
	};

	const handleFlutterPayment = useFlutterwave(config);

	const close = () => {
		// console.log(response);
		toast.success('Payment Cancel');
	};
	return (
		<>
			<button
				className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm  font-medium text-white flex justify-center w-full"
				onClick={() => {
					handleFlutterPayment({
						callback: (response) => {
							// console.log(response);
							dispatch(loadingAction(true));
							axios
								.post(`${apiUrl}/transactions`, {
									userId: data?.userId,
									reference: response.flw_ref,
									narration: `${response.transaction_id}:${response.tx_ref}`,
									amount: response.charged_amount,
									method: 'flutterWave',
								})
								.then((res) => {
									console.log(res);
									dispatch(loadingAction(false));
								})
								.catch((error) => {
									dispatch(loadingAction(false));
									console.log(error);
								})
								.finally(() => {
									dispatch(loadingAction(false));
									toast.success('Transaction in progress');
									navigate('/dashboard');
									// this will close the modal programmatically
									closePaymentModal();
								});
						},
						onClose: () => close,
					});
				}}
			>
				Make payment
			</button>
		</>
	);
};

export default FlutterWave;
