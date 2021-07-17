import Swal from 'sweetalert2'
export function Fire(title: any, text: any, type: any, callback: Function) {
	Swal.fire({
		title: title,
		text: text,
		icon: type,
		showCancelButton: true,
		confirmButtonText: 'Yes',
		cancelButtonText: 'Cancel',
	}).then((result: any) => {
		if (result.value) {
			return callback()
		}
	})
	if (type == 'error') {
		type = 'warning'
	}
	const audio = new Audio(`../../assets/ipop/audio/${type}.mp3`)
	audio.volume = 0.5
	audio.play()
}

export function Alert(title: any, text: any, type: any) {
	Swal.fire(title, text, type)
	if (type == 'error') {
		type = 'warning'
	}
	const audio = new Audio(`../../assets/ipop/audio/${type}.mp3`)
	audio.volume = 0.5
	audio.play()
}

export function ValidationError() {
	Alert('Error', 'One or more fields should not be empty', 'error')
}

export function Created() {
	Alert('Success', 'Data has been Successfully Created', 'success')
}

export function Updated() {
	Alert('Success', 'Data has been Successfully Updated', 'success')
}

export function Deleted() {
	Alert('Success', 'Data has been Successfully Deleted', 'success')
}

export function Welcome(name: String) {
	Alert('Success', `Welcome Back! ${name}`, 'success')
}

export function noData() {
	const audio = new Audio(`../../assets/ipop/audio/pop.mp3`)
	audio.volume = 0.5
	audio.play()
	setTimeout(() => {
		audio.pause()
		audio.currentTime = 0
	}, 120)
}
