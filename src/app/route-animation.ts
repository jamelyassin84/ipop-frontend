import {
	animate,
	animateChild,
	group,
	query,
	style,
	transition,
	trigger,
} from '@angular/animations'

export const fader = trigger('routeAnimations', [
	transition('* => *', [
		query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
			optional: true,
		}),
		group([
			query(
				':enter',
				[
					style({ opacity: '.5' }),
					animate('.5s ease-in-out', style({ opacity: '1' })),
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ opacity: '1' }),
					animate('.1s ease-in-out', style({ opacity: '0' })),
				],
				{ optional: true }
			),
		]),
	]),
])
