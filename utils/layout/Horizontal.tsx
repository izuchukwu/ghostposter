import {
	Group,
	GroupPosition,
	MantineStyleSystemProps,
	Stack
} from '@mantine/core'
import {Sx} from '@mantine/styles'
import React, {PropsWithChildren} from 'react'

type HorizontalHPos = 'left' | 'center' | 'right' | 'spread-out'
type HorizontalVPos = 'top' | 'center' | 'bottom' | 'stretch'
type HorizontalProps = {
	gap?: number
	style?: React.CSSProperties
	className?: string

	h?: HorizontalHPos
	v?: HorizontalVPos
	fullWidth?: boolean
	wrap?: boolean
} & PropsWithChildren &
	MantineStyleSystemProps &
	React.RefAttributes<HTMLDivElement>
export const Horizontal = React.forwardRef<HTMLDivElement, HorizontalProps>(
	function Horizontal(
		{
			gap = 0,
			style,
			className,

			h = 'left',
			v = 'center',
			fullWidth = false,
			wrap = false,

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
		}: HorizontalProps,
		ref
	) {
		return (
			<Group
				ref={ref}
				className={className}
				style={{
					gap: gap,
					alignContent: VToAlignMap[v],
					width: fullWidth ? '100%' : 'fit-content',
					flexWrap: wrap ? 'wrap' : 'nowrap',
					...style
				}}
				position={HToPositionMap[h]}
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
			</Group>
		)
	}
)

/* -- Helpers -- */

const HToPositionMap: Record<HorizontalHPos, GroupPosition> = {
	left: 'left',
	center: 'center',
	right: 'right',
	'spread-out': 'apart'
}

const VToAlignMap: Record<HorizontalVPos, string> = {
	top: 'flex-start',
	center: 'center',
	bottom: 'flex-end',
	stretch: 'stretch'
}
