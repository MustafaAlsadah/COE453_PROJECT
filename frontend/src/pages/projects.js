import { Link } from "react-router-dom"
import Navbar from "../components/navbar"
import { useEffect } from "react"
import { useState } from "react"
import { API_URL } from "../constants"

export default function Projects() {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        fetch(`${API_URL}/projects`)
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
                        <Link to={`/create-project`}><button>Create project</button>
                        </Link>
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
