// theme.ts
import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
	theme: {
		tokens: {
			colors: {
				brand: {
					500: {value: "#f000b8"},
				},
			},
			fonts: {
				body: { value: "Roboto, sans-serif" },
				heading: { value: "Oswald, sans-serif" },
			},
			//components: {
			//	Button: {
			//		baseStyle: {
			//			borderRadius: "8px",
			//		},
			//		defaultProps: {
			//			variant: "solid",
			//			size: "md",
			//			colorScheme: 'blue',
			//			//colorScheme: 'teal',
			//			//colorScheme: 'purple',
			//		},
			//	},
			//},
		},
	},
});
