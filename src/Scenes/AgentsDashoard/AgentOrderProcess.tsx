import { useOutletContext } from "react-router-dom";
import { OrderItem } from "../../shared/types";
import { useState } from "react";
import toast from "react-hot-toast";
import instance from "../../API";

function AgentOrderProcess() {
	const order = useOutletContext();
	const [itemsChecked, setItemsChecked] = useState<number[]>([]);
	const updateOrderStatus = async () => {
		await instance
			.patch(`/orders/${order.id}`, { status: "CONFIRMED" })
			.then(() => {
				toast.success("Order updated !!!!");
			})
			.catch((err) => {
				console.log("err", err);
				toast.error(err.code);
			});
	};

	return (
		order && (
			<div>
				<p className="mt-4 text-xl font-bold text-center"> Items Checklist </p>

				<div className="relative">
					<p className="sticky top-0 text-lg font-bold">
						Items Checked {itemsChecked.length} / {order.orderDetails.length}{" "}
					</p>

					{order &&
						order.orderDetails &&
						order.orderDetails.map((item: OrderItem) => (
							<div className="bg-white  flex items-center justify-between  rounded-[8px] p-4">
								<div className="grid grid-cols-5 gap-5 ">
									<p className="py-1">{item.product?.name}</p>
									<p className="py-1">Requested Quantity:{item.quantity}</p>
									<p className="py-1">
										Product cost:{item.product?.cost.toLocaleString()}
									</p>

									{/* {<p className="py-1">list of suppliers for the product</p>} */}
								</div>
								<div>
									<button
										onClick={() => {
											if (!itemsChecked.includes(item.id)) {
												setItemsChecked((prev) => [...prev, item.id]);
											}
										}}
										className="px-6 py-1 font-bold text-white rounded-md bg-sky-800">
										{itemsChecked.includes(item.id)
											? "Collected"
											: "Mark as Collected"}
									</button>
								</div>
								<div></div>
							</div>
						))}
					<div className="mt-3">
						<button
							onClick={updateOrderStatus}
							disabled={itemsChecked.length < order.orderDetails.length}
							className={`w-full py-1 rounded-[8px]  ${
								itemsChecked.length !== order.orderDetails.length
									? "text-gray-300 bg-pink-900 "
									: " text-white bg-emerald-800 "
							}  font-bold `}>
							Mark order as processed
						</button>
					</div>
				</div>
			</div>
		)
	);
}

export default AgentOrderProcess;
