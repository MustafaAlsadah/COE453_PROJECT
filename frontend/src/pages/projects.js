import { Link } from "react-router-dom"
import Navbar from "../components/navbar"
import { useEffect } from "react"
import { useState } from "react"

// const projects = [
//     {
//         id: 1,
//         title: "Taqapay",
//         description: "Superchare your fuel usage!",
//         by: "Tawapay Team"
//     },
//     {
//         id: 2,
//         title: "Warmify",
//         description: "Smart water heater",
//         by: "Warmify team"
//     }
// ]

export default function Projects() {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        fetch("https://rest-gateway-swwzqq7.uc.gateway.dev/projects")
            .then(response => response.json())
            .then(data => setProjects(data.projects)).catch(err => console.log(err))
    }, [])
    console.log(projects)

    return (
        <>
            <header>
                <Navbar />

            </header>
            <main>
                <section>
                    <header>
                        <h2>Projects</h2>
                        <button>Create project</button>
                    </header>
                    {projects.map(({ _id, name, techStack, desc }) => (
                        <aside>
                            <h3><Link to={`/projects/${_id}`}>{name}</Link></h3>
                            <p>{desc}</p>
                            <hr />
                            <p>Tech Stack:{techStack.map(st => <h5>{st}</h5>)}</p>
                        </aside>
                    ))}
                </section>
            </main>
        </>)
}
