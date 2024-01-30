import { useOutletContext } from "react-router-dom";
import BackButton from "../../shared/BackButton";
import {
	MdOutlineCheckBox,
	MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { useState } from "react";
import useFetchData from "../../Hooks/useFetchData";
import { agent, identityPerson } from "../../shared/types";

interface orderAssign {
	agent: number;
	items: number[];
}

function ProcessOrder() {
	const { role, order } = useOutletContext();
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [selectedAgent, setSelectedAgent] = useState<identityPerson | null>(
		null
	);
	const [assignedAgents, setAssignedAgents] = useState<orderAssign[]>([]);
	const [selectAll, setSelectAll] = useState<boolean>(false);
	const handleSelectAll = () => {
		setSelectAll(true);
		const orderDetailIds: number[] = order.orderDetails.map(
			(detail) => detail.id
		);
		setSelectedItems((prev) => [...prev, ...orderDetailIds]);
		if (selectedAgent !== null) {
			if (
				assignedAgents.length !== 0 &&
				assignedAgents.some((el) => el.agent == selectedAgent.id)
			) {
				const newAssigned = assignedAgents.map((el) =>
					el.agent === selectedAgent.id
						? { ...el, items: [...el.items, id] }
						: el
				);
				setAssignedAgents((prev) => [...newAssigned]);
			} else {
				setAssignedAgents((prev) => [
					...prev,
					{ agent: selectedAgent.id, items: orderDetailIds },
				]);
			}
		}
	};

	const toggleSelectItem = (id: number) => {
		if (selectedItems.includes(id)) {
			setSelectedItems((prev) => prev.filter((el) => el !== id));
		} else {
			setSelectedItems((prev) => [...prev, id]);
			if (selectedAgent !== null) {
				if (
					assignedAgents.length !== 0 &&
					assignedAgents.some((el) => el.agent == selectedAgent.id)
				) {
					const newAssigned = assignedAgents.map((el) =>
						el.agent === selectedAgent.id
							? { ...el, items: [...el.items, id] }
							: el
					);
					setAssignedAgents((prev) => [...newAssigned]);
				} else {
					setAssignedAgents((prev) => [
						...prev,
						{ agent: selectedAgent.id, items: [id] },
					]);
				}
			}
		}
	};
	const toggleSelectAll = () => {
		if (selectAll) {
			setSelectedItems([]);
			setSelectAll(false);
		} else {
			setSelectAll(true);
			handleSelectAll();
		}
	};
	const toggleSelectAgent = (person: identityPerson) => {
		if (selectedAgent !== null && selectedAgent.id == person.id) {
			setSelectedAgent(null);
		} else {
			setSelectedAgent({ id: person.id, fullName: person.fullName });
		}
	};
	const { data: agents, loading } = useFetchData("/users");

	console.log("order", order);
	console.log("agents-assign", assignedAgents);

	return (
		<div>
			<BackButton />
			<div className="grid w-full grid-cols-4 gap-3 my-2 ">
				<div className="p-2 text-xs bg-white rounded-[6px]">
					<p className="mb-2 text-xs font-medium uppercase">Customer</p>
					<p className="py-1">{order.customer.fullName}</p>
					<p className="py-1">{order.customer.telphone}</p>
					<p className="py-1">address</p>
				</div>
				<div className="p-2 text-xs bg-white rounded-[6px]">
					<p className="mb-2 text-xs font-medium uppercase">Date</p>
					<p className="py-1">
						{new Date(order.orderDate).toLocaleDateString("fr-FR")}
					</p>
					<p className="py-1">{new Date(order.orderDate).toTimeString()}</p>
				</div>
				<div className="p-2 text-xs bg-white rounded-[6px]">
					<p className="mb-2 text-xs font-medium uppercase">Payment</p>
				</div>
				<div className="p-2 text-xs bg-white rounded-[6px]">
					<p className="mb-2 text-xs font-medium uppercase">Status</p>
					<p
						className={`py-1 ${
							order.status === "PENDING"
								? " text-sky-900 "
								: order.status === "CANCELED"
								? "text-pink-900"
								: "text-teal-900"
						}`}>
						{order.status}
					</p>
				</div>
			</div>
			<div className="flex justify-between gap-3">
				<div className="w-1/2">
					<p className="my-2 text-xs font-medium">List of items</p>
					<div className="grid grid-cols-3 py-2 my-1">
						<div className="flex items-center gap-2 text-xs font-bold cursor-pointer">
							{selectedAgent !== null ? (
								selectAll ? (
									<MdOutlineCheckBox
										onClick={toggleSelectAll}
										className="w-4 h-4"
									/>
								) : (
									<MdOutlineCheckBoxOutlineBlank
										onClick={toggleSelectAll}
										className="w-4 h-4"
									/>
								)
							) : null}
							<p>Name</p>
						</div>
						<p className="text-xs font-bold">Quantity</p>
						<p className="text-xs font-bold">Price</p>
					</div>
					<div className="my-1">
						{order.orderDetails &&
							order.orderDetails.map((det) => (
								<div
									onClick={() => {
										toggleSelectItem(det.id);
									}}
									key={det.id}
									className="grid items-center grid-cols-3 py-2 cursor-pointer hover:bg-slate-200 ">
									<div className="flex items-center gap-2">
										{selectedAgent ? (
											selectedItems.includes(det.id) ? (
												<MdOutlineCheckBox className="w-4 h-4" />
											) : (
												<MdOutlineCheckBoxOutlineBlank className="w-4 h-4" />
											)
										) : null}

										<p className="text-xs">{det.product.name}</p>
									</div>
									<p className="text-xs">{det.quantity}</p>
									<p className="text-xs">{det.product.price}</p>
								</div>
							))}
					</div>
				</div>
				<div className="w-1/2">
					<p className="my-2 text-xs font-medium">Assign Order</p>
					<div className="w-full p-2 bg-white">
						{agents &&
							agents
								.filter((el: agent) => el.role === "AGENT")
								.map((agent: agent) => (
									<div
										onClick={() => {
											toggleSelectAgent(agent);
										}}
										key={agent.id}
										className={`${
											selectedAgent && selectedAgent.id === agent.id
												? "border-[1.5px] border-theme-yellow"
												: " "
										}  w-full cursor-pointer  p-2 rounded-[6px] bg-slate-100`}>
										<p className="text-xs font-medium">{agent.fullName}</p>
										<p className="text-xs">{agent.telphone}</p>
										<p className="text-xs">{agent.location}</p>
									</div>
								))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProcessOrder;
