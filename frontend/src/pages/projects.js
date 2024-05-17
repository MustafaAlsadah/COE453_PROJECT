import { Link } from "react-router-dom"
import Navbar from "../components/navbar"

const projects = [
    {
        id: 1,
        title: "Taqapay",
        description: "Superchare your fuel usage!",
        by: "Tawapay Team"
    },
    {
        id: 2,
        title: "Warmify",
        description: "Smart water heater",
        by: "Warmify team"
    }
]

export default function Projects() {
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
                    {projects.map(({ id, title, description, by }) => (
                        <aside>
                            <h3><Link to={`/projects/${id}`}>{title}</Link></h3>
                            <p>{description}</p>
                            <p>By: {by}</p>
                        </aside>
                    ))}
                </section>
            </main>
        </>)
}
