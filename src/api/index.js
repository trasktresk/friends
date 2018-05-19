export function fetchUsers() {
    return fetch('/api/users').then(res => res.json());
}