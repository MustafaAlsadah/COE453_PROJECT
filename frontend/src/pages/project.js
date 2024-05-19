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

    // get project id from url
    const { id } = useParams()
    console.log("ID", id)

    useEffect(() => {
        fetch("https://rest-gateway-swwzqq7.uc.gateway.dev/projects")
            .then(response => response.json())
            .then(data => data.projects)
            .then(projects => projects.filter(prj => prj._id === id)[0])
            .then(project => {
                project.members = project.membersIds.foreach((id) => {
                    fetch(`https://rest-gateway-swwzqq7.uc.gateway.dev/users/${id}`)
                        .then(response => response.json())
                        .then(data => data.user)
                })
            })
            .then(project => setProject(project))
            .catch(err => console.log(err))
    }, [])


    console.log(project)
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
                    <button>Join project</button>
                </section>
            </main>
        </>)
}
