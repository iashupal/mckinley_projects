export function submitForm(email, password, passwordConfirm) {
	const email = this.props.email;
	const password = this.props.password;
	const passwordConfirm = this.props.passwordConfirm;

	if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
		Alert.alert('오류', '올바른 정보를 입력해주세요.');
	} else {
		this.props.authUser(
			this.props.email,
			this.props.password,
			this.props.passwordConfirm
		);
	}
}
