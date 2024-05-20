import Navbar from "../components/navbar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { API_URL } from "../constants"

export default function Project() {
    const [project, setProject] = useState(null)
    const [members, setMembers] = useState([])

    // get project id from url
    const { id } = useParams()

    useEffect(() => {
        setMembers([])
        fetch(`${API_URL}/projects`)
            .then(response => response.json())
            .then(data => data.projects)
            .then(projects => projects.filter(prj => prj._id === id)[0])
            .then(project => {
                setProject(project)
                project.membersIds.forEach((id) => {
                    fetch(`${API_URL}/user?id=${id}`)
                        .then(res => res.json())
                        .then(data => setMembers(members.concat(data)))
                })
            })
            .catch(err => console.log(err))
    }, [])

    const joinProject = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        const payload = Object.fromEntries(formdata)
        fetch(`${API_URL}/user?email=${payload.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.length == 0)
                    return fetch(`${API_URL}/user`, {
                        method: "post",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    }).then((res) => res.json())
                return data
            })
            .then((data) => {
                const joinPayload = { member: data._id, id: project._id }
                fetch(`${API_URL}/projects/${project.id}/join`, {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(joinPayload)
                })

            }).catch(err => console.log(err))
    }


    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <section>
                    <><header>
                        {!project ? (<p>Loading..</p>) : (
                            <>
                                <h2>{project.name}</h2>
                                <p>{project.desc}</p>
                                <p>Tech Stack: {project?.techStack?.join(", ")}</p>
                                <p>Members: {members.map((member) => member.name).join(", ")}</p>
                                <hr />
                            </>
                        )}
                    </header>
                        <form onSubmit={joinProject}>
                            <input name="name" placeholder="name" />
                            <input name="email" placeholder="email" />
                            <button>Join project</button>
                        </form>
                    </>
                </section>
            </main>
        </>)
}
