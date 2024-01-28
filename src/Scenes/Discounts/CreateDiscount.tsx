import { FaCircleCheck } from "react-icons/fa6";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useFetchData from "../../Hooks/useFetchData";

type Props = {};

function CreateDiscount({}: Props) {
	const { register } = useForm();
	const { data: categories } = useFetchData("/categories");
	const { data: products } = useFetchData("/products");
	const types: string[] = ["all", "categories", "products"];
	const [selectedType, setSelectedType] = useState<string>(types[0]);
	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
	const onSelectProduct = (e) => {
		const prod =
			products && products.filter((prod) => prod.id == e.target.value)[0];
		if (selectedProducts.filter((pr) => pr.id === prod.id).length === 0) {
			setSelectedProducts((prev) => [...prev, prod]);
		}
	};

	console.log("select --- items", selectedProducts);

	return (
		<div className="w-full">
			<p className="w-full my-3 text-xs font-bold text-center">
				Create Discount
			</p>

			<div className="p-4 bg-white ">
				<div className="w-2/3 mx-auto ">
					<div className="w-full">
						<label
							htmlFor=""
							className="block my-2 text-xs font-medium capitalize ">
							Name
						</label>
						<input
							type="text"
							{...register("name")}
							className=" py-1 rounded-[6px] w-full text-xs bg-transparent border-[1px] border-black"
						/>
					</div>
					<div className="flex w-full gap-4">
						<div className="w-1/2">
							<label
								htmlFor=""
								className="block my-2 text-xs font-medium capitalize ">
								Starts
							</label>
							<input
								type="datetime"
								{...register("starts")}
								className="w-full py-1 rounded-[6px]  text-xs bg-transparent border-[1px] border-black"
							/>
						</div>
						<div className="w-1/2">
							<label
								htmlFor=""
								className="block my-2 text-xs font-medium capitalize ">
								Ends
							</label>
							<input
								type="datetime"
								{...register("ends")}
								className="w-full py-1 rounded-[6px]  text-xs bg-transparent border-[1px] border-black"
							/>
						</div>
					</div>
					<div className="w-full">
						<label
							htmlFor=""
							className="block my-2 text-xs font-medium capitalize ">
							Percentage
						</label>
						<div className="flex items-center gap-3">
							<input
								type="number"
								{...register("percentage")}
								className=" block py-1 rounded-[6px] w-1/2 text-xs bg-transparent border-[1px] border-black"
							/>
							<p className="font-bold">%</p>
						</div>
					</div>
					<p className="my-3 text-xs font-bold">Applied to</p>
					<div className="grid grid-cols-3 gap-6">
						{types &&
							types.map((ty: string) => (
								<div
									onClick={() => setSelectedType(ty)}
									className={`${
										selectedType === ty && " border-[2px] border-theme-yellow "
									}  rounded-[6px] cursor-pointer p-4  h-24 my-3 text-xs font-bold capitalize bg-slate-50`}>
									<div className="flex justify-end">
										{selectedType === ty && (
											<FaCircleCheck className="text-theme-yellow" />
										)}
									</div>
									<div className="flex items-center justify-center">{ty}</div>
								</div>
							))}
					</div>

					<div className="flex w-full ">
						<div className="w-1/2">
							{selectedType === "categories" && (
								<div className="grid grid-cols-3 gap-3 my-2">
									{categories &&
										categories.map((cat) => (
											<div
												key={cat.id}
												onClick={() => {
													if (!selectedCategories?.includes(cat.id)) {
														setSelectedCategories((prev) => [...prev, cat.id]);
													} else {
														setSelectedCategories((prev) => [
															...prev.filter((el) => el !== cat.id),
														]);
													}
												}}
												className="px-2 cursor-pointer flex justify-between py-1 rounded-[4px] text-xs font-medium bg-gray-200">
												{cat.name}
												{selectedCategories?.includes(cat.id) && (
													<FaCircleCheck className="text-theme-yellow" />
												)}
											</div>
										))}
								</div>
							)}

							{selectedType === "products" && (
								<div className="grid grid-cols-2 gap-4 ">
									<div className="w-full">
										<label
											htmlFor="description"
											className="block my-2 text-xs font-medium text-gray-700 ">
											Select products
										</label>
										<select
											onChange={onSelectProduct}
											className="w-full py-1 text-xs border border-gray-300 rounded-[4px]">
											<option value="" className="text-xs">
												Select products
											</option>
											{products &&
												products.map((prod) => (
													<option
														className="capitalize"
														key={prod.id}
														value={prod.id}>
														{prod.name}
													</option>
												))}
										</select>
									</div>
								</div>
							)}

							<div className="w-full">
								<label
									htmlFor=""
									className="block my-2 text-xs font-medium capitalize ">
									Minimum number of items on order
								</label>

								<input
									type="number"
									{...register("numberOfItems")}
									className=" block py-1 rounded-[6px] border-[1px] border-black w-full text-xs bg-transparent "
								/>
							</div>
							<div className="w-full">
								<label
									htmlFor=""
									className="block my-2 text-xs font-medium capitalize ">
									Minimum total cost of order
								</label>
								<div className="flex items-center gap-3">
									<input
										type="number"
										{...register("costOfOrder")}
										className=" block py-1 rounded-[6px] w-full text-xs bg-transparent border-[1px] border-black"
									/>
								</div>
							</div>
						</div>
						<div className="w-1/2">
							{selectedProducts.length !== 0 &&
								selectedProducts.map((prod) => (
									<p
										className="p-2 my-1 text-xs font-medium bg-slate-100"
										key={prod.id}>
										{prod.name}
									</p>
								))}
						</div>
					</div>

					<button className="px-12 py-1 my-3 text-xs rounded-[4px] text-white bg-teal-900">
						Create
					</button>
				</div>
			</div>
		</div>
	);
}

export default CreateDiscount;
