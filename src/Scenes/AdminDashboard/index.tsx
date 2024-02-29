import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../store";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";

const AdminDashboard = () => {
	const user = useSelector(getUser);
	const { control } = useForm();
	// const SelectDay = forwardRef(({ value, onClick }, ref) => (
	// 	<button className="px-8 font-bold bg-gray-300" onClick={onClick} ref={ref}>
	// 		{value}
	// 	</button>
	// ));
	const { data: orders, loading } = useFetchData("/orders");

	return (
		<div>
			{user && (
				<div>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-lg font-bold">Welcome Back {user.fullname}</p>
							<p className="mt-8 text-xs font-semibold">Latest updates</p>
						</div>
						<div className="">
							<Controller
								name="date"
								control={control}
								defaultValue={new Date()}
								render={({ field }) => (
									<DatePicker
										onChange={(date: Date) => field.onChange(date)}
										selected={new Date()}
										placeholderText={new Date().toLocaleDateString("fr-FR")}
									/>
								)}
							/>
						</div>
						<div className="grid grid-cols-4 gap-4">
							<div className=" bg-white rounded-[12px] p-4"></div>
							<div className=" bg-white rounded-[12px] p-4"></div>
							<div className=" bg-white rounded-[12px] p-4"></div>
							<div className=" bg-white rounded-[12px] p-4"></div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminDashboard;
