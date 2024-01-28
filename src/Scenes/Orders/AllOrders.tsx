import { useForm } from "react-hook-form";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

type Props = {};

function AllOrders({}: Props) {
	const { register } = useForm();
	return (
		<div>
			<div className="flex items-center w-full px-3 py-2 bg-white rounded-md">
				<div className="flex-1">
					<form className=" w-2/5 flex items-center gap-3 p-2 px-4 bg-slate-100 rounded-[8px] ">
						<HiOutlineMagnifyingGlass className="w-5 h-5 text-login-blue" />
						<input
							placeholder="Search"
							className="w-full bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-normal"
							{...register("query")}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AllOrders;
