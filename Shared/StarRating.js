import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text
} from 'react-native';


const StarRating = ({ score }) => {

		// This array will contain our star tags. We will include this
		// array between the view tag.
		let stars = [];
		// Loop 5 times
		for (var i = 1; i <= 5; i++) {
			// set the path to filled stars
			let path = require('../assets/star_filled.png');
			// If ratings is lower, set the path to unfilled stars
			if (i > score) {
				path = require('../assets/star.png');
			}

			stars.push((<Image style={styles.image} source={path} key={i}/>));
		}

		return (
			<View style={ styles.container }>
				{ stars }
			</View>
		);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		alignItems: 'center'
	},
	image: {
		width: 15,
		height: 15
	},
	text: {
		fontSize: 20,
		marginLeft: 10,
		marginRight: 10
	}
});

export default StarRating;