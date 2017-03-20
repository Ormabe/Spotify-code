import React, { Component } from 'react';


const Detail = (props) => {
	const people = props.peopleList
	const list = people.map((x) =>
		<li key={x.id}>Name:{x.name}, Favorite City: {x.favoriteCity} </li>
	)
	return (
		<ul>
			{list}
		</ul>
	)
}


export default Detail;
