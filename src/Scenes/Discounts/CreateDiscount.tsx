import { FaCircleCheck } from "react-icons/fa6";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useFetchData from "../../Hooks/useFetchData";
import { IoCalendar } from "react-icons/io5";
import instance from "../../API";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

function CreateDiscount() {
	const { register, control, handleSubmit } = useForm();
	const { data: categories } = useFetchData("/categories");
	const { data: products } = useFetchData("/products");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const types: string[] = ["all", "categories", "products"];
	const [selectedType, setSelectedType] = useState<string>(types[0]);
	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
	const onSelectItem = (e) => {
		if (selectedType === "products") {
			const prod =
				products && products.filter((prod) => prod.id == e.target.value)[0];
			if (selectedProducts.filter((pr) => pr.id === prod.id).length === 0) {
				setSelectedProducts((prev) => [...prev, prod]);
			}
		} else if (selectedType === "categories") {
			const cat =
				categories && categories.filter((prod) => prod.id == e.target.value)[0];
			if (
				selectedCategories.filter((category) => category.id === cat.id)
					.length === 0
			) {
				setSelectedCategories((prev) => [...prev, cat]);
			}
		}
	};

	console.log("select --- items", selectedProducts);
	const createDiscount = async (data) => {
		const submitData = {
			...data,
			rate: Number(data.rate),
			productIds: selectedProducts.map((el) => el.id),
			categoryIds: selectedCategories.map((el) => el.id),
		};
		setLoading(true);
		await instance
			.post("/discounts", { ...submitData, type: selectedType })
			.then(() => {
				setSuccess(true);
			})
			.catch((err) => {
				toast.error(err.response.data.message[0]);
			})
			.finally(() => {
				setLoading(false);
				if (success) {
					toast.success("discount created");
				}
				setSuccess(false);
			});
	};

	return (
		<div className="w-full">
			<p className="w-full my-3 text-xs font-bold text-center">
				Create Discount
			</p>

			<form onSubmit={handleSubmit(createDiscount)} className="p-4 bg-white ">
				<div className="w-2/3 mx-auto ">
					<div className="w-1/2">
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
					<div className="flex w-full ">
						<div className="w-1/2">
							<label
								htmlFor=""
								className="block my-2 text-xs font-medium capitalize ">
								Starts
							</label>
							<Controller
								name="startAt"
								control={control}
								render={({ field }) => (
									<DatePicker
										placeholderText="select received date"
										onChange={(date) => field.onChange(date)}
										selected={field.value}
										showIcon
										className="w-full border-[1.5px] text-xs border-gray-800 rounded-[4px]"
										icon={<IoCalendar className="w-3 h-3 " />}
									/>
								)}
							/>
						</div>
						<div className="w-1/2">
							<label
								htmlFor=""
								className="block my-2 text-xs font-medium capitalize ">
								Ends
							</label>
							<Controller
								name="endAt"
								control={control}
								render={({ field }) => (
									<DatePicker
										placeholderText="select received date"
										onChange={(date) => field.onChange(date)}
										selected={field.value}
										showIcon
										className="w-full border-[1.5px] text-xs border-gray-800 rounded-[4px]"
										icon={<IoCalendar className="w-3 h-3 " />}
									/>
								)}
							/>
						</div>
					</div>
					<div className="w-1/2">
						<label
							htmlFor=""
							className="block my-2 text-xs font-medium capitalize ">
							Percentage
						</label>
						<div className="flex items-center gap-3">
							<input
								type="number"
								step="any"
								{...register("rate")}
								className=" block py-1 rounded-[6px] w-11/12 text-xs bg-transparent border-[1px] border-black"
							/>
							<p className="font-bold">%</p>
						</div>
					</div>
					<div className="flex w-full gap-3 ">
						<div className="w-1/2">
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
						<div className="w-1/2">
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

					<div className="flex w-full gap-3">
						<div className="w-full">
							{selectedType === "categories" && (
								<div className="grid grid-cols-3 gap-3 my-2">
									{categories && (
										<div className="w-full">
											<label
												htmlFor="description"
												className="block my-2 text-xs font-medium text-gray-700 ">
												Select categories
											</label>
											<select
												onChange={onSelectItem}
												className="w-full py-1 text-xs border border-gray-300 rounded-[4px]">
												<option value="" className="text-xs">
													Select ...
												</option>
												{categories &&
													categories.map((cat) => (
														<option
															className="capitalize"
															key={cat.id}
															value={cat.id}>
															{cat.name}
														</option>
													))}
											</select>
										</div>
									)}
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
											onChange={onSelectItem}
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
						</div>
					</div>
					<div className="grid w-full grid-cols-3 gap-3">
						{selectedType === "products"
							? selectedProducts.length !== 0 &&
							  selectedProducts.map((prod) => (
									<div
										className="flex items-center  rounded-[6px] justify-between p-2 my-1 text-xs font-medium bg-[#f0f0f0]"
										key={prod.id}>
										<p className="px-3 ">{prod.name}</p>
										<p
											className="py-0 font-bold text-pink-900 cursor-pointer"
											onClick={() => {
												setSelectedProducts(
													selectedProducts.filter((el) => el.id !== prod.id)
												);
											}}>
											remove
										</p>
									</div>
							  ))
							: selectedType === "categories"
							? selectedCategories.length !== 0 &&
							  selectedCategories.map((cat) => (
									<div
										className="flex items-center  rounded-[6px] justify-between p-2 my-1 text-xs font-medium bg-[#f0f0f0]"
										key={cat.id}>
										<p className="px-3 ">{cat.name}</p>
										<p
											className="py-0 font-bold text-pink-900 cursor-pointer"
											onClick={() => {
												setSelectedCategories(
													selectedCategories.filter((el) => el.id !== cat.id)
												);
											}}>
											remove
										</p>
									</div>
							  ))
							: null}
					</div>

					<button className="px-12 py-2 my-3 text-xs rounded-[4px] text-white bg-teal-900">
						Create
					</button>
				</div>
			</form>
		</div>
	);
}

export default CreateDiscount;
