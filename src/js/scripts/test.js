export let user = [
    {name: 'Vano', number: false},
    {name: 'Petya', number: false},
]

export function numberUser(user, userName){
    return user.map(e => {
        if (e.name !== userName) {
            e.number = false;
        } else {
            e.number = true;
        }
    })
}