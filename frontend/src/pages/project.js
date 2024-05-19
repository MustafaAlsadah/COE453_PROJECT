import Navbar from "../components/navbar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const project = {
    id: 1,
    title: "Taqapay",
    description: "Superchare your fuel usage!",
    by: "Tawapay Team"
}

export default function Project() {
    const [project, setProject] = useState({})
    const [members, setMembers] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    // get project id from url
    const { id } = useParams()
    console.log("ID", id)

    useEffect(() => {
        fetch("https://rest-gateway-swwzqq7.uc.gateway.dev/projects")
            .then(response => response.json())
            .then(data => data.projects)
            .then(projects => projects.filter(prj => prj._id === id)[0])
            .then(project => setProject(project))
            .then(project => {
                console.log("id")
                project.members = project.membersIds.foreach((id) => {
                    fetch(`https://rest-gateway-swwzqq7.uc.gateway.dev/users&id=${id}`)
                        .then(response => response.json())
                        .then(data => console.log(data))
                })
            })
            .catch(err => console.log(err))
    }, [])


    // console.log(project)
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <section>
                    <header>
                        <h2>{project.name}</h2>
                        <p>{project.desc}</p>
                        <p>Tech Stack: {project.techStack}</p>
                        <hr />
                        <p>Members: X, Y, Z</p>
                    </header>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="name" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email" />
                    <button onClick={async () => {
                        // add the user
                        const user = await fetch(`https://rest-gateway-swwzqq7.uc.gateway.dev/users/createUser?email=${email}&name=${name}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        console.log(user)

                        // add the user to the project
                        await
                            fetch(`https://rest-gateway-swwzqq7.uc.gateway.dev/projects/${user._id}/join`)
                                .then(response => response.json())
                                .then(data => console.log(data))
                                .catch(err => console.log(err))
                    }}>Join project</button>
                </section>
            </main>
        </>)
}
