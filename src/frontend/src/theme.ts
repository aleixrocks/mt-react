// theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	colors: {
		brand: {
			500: "#f000b8",
		},
	},
	fonts: {
		body: "Roboto, sans-serif",
		heading: "Oswald, sans-serif",
	},
	components: {
		Button: {
			baseStyle: {
				borderRadius: "8px",
			},
			defaultProps: {
				variant: "solid",
				size: "md",
				colorScheme: 'blue',
				//colorScheme: 'teal',
				//colorScheme: 'purple',
			},
		},
	},
	// ... other customizations ...
});

export default theme;
