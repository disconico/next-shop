const Input = ({ type, required, value, onChange, ...props }) => {
	return (
		<input
			type={type}
			required={required}
			value={value}
			onChange={onChange}
			{...props}
			className='border px-4 py-1 rounded w-80'
		/>
	);
};

export default Input;
