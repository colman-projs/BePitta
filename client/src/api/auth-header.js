export default function authHeader() {
    const admin = JSON.parse(localStorage.getItem('admin'));

    if (admin && admin.accessToken) {
        return { 'x-access-token': admin.accessToken };
    } else {
        return {};
    }
}
