import { useState } from 'react';
import {
	// useMonnifyPayment,
	MonnifyButton,
	// MonnifyConsumer,
	// MonnifyHookExample,
} from 'react-monnify';

import axios from 'axios';
const Monnify = ({ data }) => {
	const apiUrl = process.env.REACT_APP_BASE_API_URL;
	const apiKey = process.env.REACT_APP_MONNIFY_API_KEY;
	const contractCode = process.env.REACT_APP_MONNIFY_CONTRACT_CODE;
	console.log(contractCode);
	const [isLoading, setIsLoading] = useState(false);
	const paidWithMonnify = async () => {
		setIsLoading(true);
		try {
			axios
				.post(`${apiUrl}/payments/monnify`)
				.then((res) => {
					console.log(res);
					setIsLoading(false);
				})
				.catch((error) => {
					setIsLoading(false);
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			console.log(error);
		}
	};
	const onLoadStart = () => {
		console.log('loading has started');
	};
	const onLoadComplete = () => {
		console.log('SDK is UP');
	};

	const onComplete = (response) => {
		console.log(response); // card charged successfully, get reference here
		paidWithMonnify(response);
	};

	const close = (response) => {
		console.log(response);
	};
	const paymentData = {
        currency: 'NGN',
		reference: `${data?._id} ${Math.floor(Math.random() * 1000000000 + 1)}`,
		amount: data?.totalPrice + 6000,
		customerFullName: `${data?.firstName} ${data?.lastName}`,
		customerEmail: data?.email,
		customerMobileNumber: data?.phone,
		paymentDescription: `Test Payment for ${data?.firstName} orders`,
		apiKey,
		contractCode,
		isTestMode: true,
		metadata: {
			name: `${data?.firsName} ${data?.lastName}`,
			age: 45,
		},
	};
	return (
		<MonnifyButton
			text="Make Payment"
			className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm  font-medium text-white flex justify-center w-full"
			{...paymentData}
			disabled={isLoading}
			onLoadComplete={(res) => onLoadComplete(res)}
			onLoadStart={onLoadStart}
			onComplete={(res) => onComplete(res)}
			close={(res) => close(res)}
			embed={true}
			tag="button"
		/>
	);
};

export default Monnify;
