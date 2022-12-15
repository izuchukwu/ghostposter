import {MantineStyleSystemProps, Stack} from '@mantine/core'
import {Sx} from '@mantine/styles'
import React, {PropsWithChildren} from 'react'

type VerticalHPos = 'left' | 'center' | 'right' | 'stretch'
type VerticalVPos = 'top' | 'center' | 'bottom' | 'spread-out'
type VerticalProps = {
	gap?: number
	style?: React.CSSProperties
	className?: string

	h?: VerticalHPos
	v?: VerticalVPos

	[prop: string]: any
} & PropsWithChildren &
	MantineStyleSystemProps &
	React.RefAttributes<HTMLDivElement>
export const Vertical = React.forwardRef<HTMLDivElement, VerticalProps>(
	function Vertical(
		{
			gap = 0,
			style,
			className,

			h = 'left',
			v = 'top',
			children,

			m,
			my,
			mx,
			mt,
			mb,
			ml,
			mr,
			p,
			py,
			px,
			pt,
			pb,
			pl,
			pr,
			...props
		}: VerticalProps,
		ref
	) {
		return (
			<Stack
				ref={ref}
				className={className}
				style={{gap, ...style}}
				align={HToAlignMap[h]}
				justify={VToJustifyMap[v]}
				m={m}
				my={my}
				mx={mx}
				mt={mt}
				mb={mb}
				ml={ml}
				mr={mr}
				p={p}
				py={py}
				px={px}
				pt={pt}
				pb={pb}
				pl={pl}
				pr={pr}
				{...props}
			>
				{children}
			</Stack>
		)
	}
)

/* -- Helpers -- */

const HToAlignMap: Record<VerticalHPos, string> = {
	left: 'flex-start',
	center: 'center',
	right: 'flex-end',
	stretch: 'stretch'
}

const VToJustifyMap: Record<VerticalVPos, string> = {
	top: 'flex-start',
	center: 'center',
	bottom: 'flex-end',
	'spread-out': 'space-between'
}
