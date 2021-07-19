export type UserType = {
	assigned_barangay: [] | null
	assigned_municipality: [] | null
	barangay: string
	blocked: boolean
	created_at: string
	district: string
	fullname: string
	id: number
	iterations: number
	municipality: string
	permissions: [] | any
	profile_picture: ProfilePicture | null
	profile_picture_id: string
	question: string
	roles: Roles[]
	updated_at: string
	username: string
}

interface ProfilePicture {
	uri: string
}

interface Roles {
	name: string
}
