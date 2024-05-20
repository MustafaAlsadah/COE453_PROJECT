useEffect(() => {
    fetch("https://rest-gateway-swwzqq7.uc.gateway.dev/projects")
        .then(response => response.json())
        .then(data => data.projects)
        .then(projects => projects.filter(prj => prj._id === id)[0])
        .then(project => {
            setProject(project)
            project.membersIds.forEach((id) => {
                fetch(`http://localhost:3001/getUser?id=${id}`)
                    .then(res => res.json())
                    .then(data => setMembers(members.concat(data)))
            })
        })
        // .then(project => {
        //     project.members = project.membersIds.map((id) => {
        //         fetch(`https://rest-gateway-swwzqq7.uc.gateway.dev/getUser?id=${id}`)
        //             .then(response => response.json())
        //             .then(data => data.user)
        //     })
        // })
        .catch(err => console.log(err))
}, [])

const joinProject = (e) => {
    e.preventDefault()
    const formdata = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formdata)
    fetch(`http://localhost:3001/createUser`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((res) => {
        const payload = { member: res.id }
        fetch(`https://rest-gateway-swwzqq7.uc.gateway.dev/projects/${project.id}/join`, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    })
}