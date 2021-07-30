import Swal from 'sweetalert2'

export function Fire(
	title: string,
	text: string,
	type: any,
	callback: Function
) {
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
	const audio = new Audio(`/assets/ipop/audio/${type}.mp3`)
	audio.volume = 0.5
	audio.play()
}

export function Alert(title: string, text: string, type: any) {
	Swal.fire(title, text, type)
	if (type == 'error') {
		type = 'warning'
	}
	const audio = new Audio(`/assets/ipop/audio/${type}.mp3`)
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

export function HasApprovals(mode: string) {
	if (localStorage.getItem('role') !== 'Super Admin') {
		return Alert(
			'Your content has been sent to admin',
			'Please wait for your content to be approved by the administrator',
			'success'
		)
	}
	if (mode === 'Created') {
		return Created()
	}
	if (mode === 'Updated') {
		return Updated()
	}
	return Deleted()
}

export function Welcome(name: String) {
	Alert('Success', `Welcome Back! ${name}`, 'success')
}

export function pop() {
	const audio = new Audio(`/assets/ipop/audio/pop1.mp3`)
	audio.volume = 0.1
	audio.play()
}
