import React, { useEffect, useState } from 'react';
import Table from '../table/Table';
import { useSelector } from 'react-redux';
import axios from '../../axios';
const MyOrders = () => {
	let [order, setOrder] = useState();
	const user = useSelector((state) => state.user);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const userId = user?.user?._id;
	useEffect(() => {
		axios.post('/order/get', userId).then(({ data }) => setOrder(data));
	}, [userId]);
	return (
		<div className="overlow-hidden">
			<Table title="My Order" data={order} />
		</div>
	);
};

export default MyOrders;
