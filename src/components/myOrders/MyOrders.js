import React, { useEffect } from 'react';
import Table from '../table/Table';
import { useSelector } from 'react-redux';
const MyOrders = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const order = useSelector((state) => state.orders);
	return (
		<div className="overlow-hidden">
			<Table title="My Order" data={order} />
		</div>
	);
};

export default MyOrders;
