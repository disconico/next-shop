import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => {
	return (
		<div className='border w-80 shadow overflow-hidden '>
			<Link href={`/products/${product.id}`}>
				<Image
					src={product.pictureUrl}
					width={320}
					height={240}
					alt=''
					className='hover:scale-105 duration-300 object-cover w-[100%]'
				/>
				<div className='p-2 flex justify-between items-baseline'>
					<h2 className='text-lg font-bold'>{product.title}</h2>
					<span>${product.price.toFixed(2)}</span>
				</div>
			</Link>
		</div>
	);
};

export default ProductCard;
