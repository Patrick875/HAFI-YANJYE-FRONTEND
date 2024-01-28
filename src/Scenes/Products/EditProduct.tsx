import { useDispatch, useSelector } from "react-redux";
import { getSelectedProduct } from "../../store";
import { useForm } from "react-hook-form";
import useFetchData from "../../Hooks/useFetchData";
import { IoClose } from "react-icons/io5";
import { selectProduct } from "../../Redux/productsSlice";
import instance from "../../API";
import { motion } from "framer-motion";
function EditProduct() {
	const { register } = useForm();
	const { data: categories } = useFetchData("/categories");
	const dispatch = useDispatch();
	const selectedProduct = useSelector(getSelectedProduct);
	const deleteProduct = async () => {
		await instance
			.delete(`/products/${selectedProduct?.id}`)
			.then((res) => {
				console.log("delete success", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
			animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
			className="w-full p-2 basis-1/3">
			<p className=" flex items-center justify-between mb-1 p-2 w-full rounded-[4px] font-bold text-xs bg-theme-yellow text-white ">
				Edit Product
				<IoClose
					className="font-bold cursor-pointer text-md"
					onClick={() => {
						dispatch(selectProduct(null));
					}}
				/>
			</p>
			<div className="w-full p-4 text-xs bg-white rounded-[4px]">
				<div>
					<label htmlFor="" className="block my-2 font-medium capitalize ">
						Name
					</label>
					<input
						type="text"
						defaultValue={selectedProduct ? selectedProduct.name : ""}
						{...register("name")}
						className=" py-1 rounded-[4px] w-full text-xs bg-transparent border-2 border-gray-300"
					/>
				</div>
			</div>
			<div className="my-1 w-full p-4 text-xs bg-white rounded-[4px]">
				<div>
					<label htmlFor="" className="block my-2 font-medium capitalize">
						Description
					</label>
					<textarea
						defaultValue={selectedProduct && selectedProduct.description}
						{...register("description")}
						id="description"
						rows={4}
						className=" py-1 rounded-[4px] w-full border-2 border-gray-300"></textarea>
				</div>
			</div>
			<div className="my-1 w-full p-4 text-xs bg-white rounded-[4px]">
				<div>
					<label htmlFor="" className="block my-2 font-medium">
						Price
					</label>
					<input
						type="number"
						defaultValue={selectedProduct && selectedProduct.price}
						className=" py-1 rounded-[4px] w-full border-2 border-gray-300 "
						{...register("price")}
					/>
				</div>
				<div>
					<label htmlFor="" className="block my-2 font-medium">
						Cost
					</label>
					<input
						type="number"
						defaultValue={selectedProduct && selectedProduct.cost}
						className=" py-1 rounded-[4px] w-full border-2 border-gray-300 "
						{...register("cost")}
					/>
				</div>
			</div>
			<div className="my-1 w-full p-4 text-xs bg-white rounded-[4px]">
				<label
					htmlFor="description"
					className="block my-2 text-xs font-medium text-gray-700 ">
					Category
				</label>
				<select
					className="w-full py-1 text-xs border border-gray-300 rounded-[4px]"
					{...register("categoryId", { required: false })}>
					<option value="" className="text-xs">
						Select category
					</option>
					{categories &&
						categories.map((cat) => (
							<option
								className="capitalize"
								selected={cat.name === selectedProduct?.category.name}
								key={cat.id}
								value={cat.id}>
								{cat.name}
							</option>
						))}
				</select>
			</div>
			<div className="my-1 w-full p-4 text-xs bg-white rounded-[4px]">
				<label htmlFor="" className="block my-2 font-medium">
					Entry Quantity
				</label>
				<input
					type="number"
					defaultValue={selectedProduct?.quatity}
					className=" py-1 rounded-[4px] w-full border-2 border-gray-300 "
					{...register("quatity")}
				/>
			</div>
			<div className="w-5/6 mx-auto">
				<button className=" my-1 py-2 rounded-[4px] w-full text-center bg-teal-900 text-xs text-white font-bold ">
					Save changes
				</button>
				<button
					onClick={deleteProduct}
					className=" my-1 py-2 rounded-[4px] w-full text-center text-xs bg-pink-900 text-white font-bold ">
					Delete{" "}
				</button>
			</div>
		</motion.div>
	);
}

export default EditProduct;
