import React, { useEffect, useState } from 'react';
import Table from '../table/Table';
import { useSelector } from 'react-redux';
const MyOrders = () => {
	const [myOrder, setMyOrders] = useState([]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const order = useSelector((state) => state.orders);
	useEffect(() => {
		console.log(order);
		if (order?.length > 0) {
			setMyOrders(order);
		}
	}, [order]);
	return (
		<div className="overlow-hidden">
			<Table title="My Order" data={myOrder} />
		</div>
	);
};

export default MyOrders;
