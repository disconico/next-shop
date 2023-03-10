const Button = ({ type, children, onClick }) => {
	return (
		<button
			type={type}
			className='bg-green-800 rounded text-gray-100 px-4 py-2 hover:bg-green-600 my-2'
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
