import Navbar from "../components/navbar"

const project = {
        id: 1,
        title: "Taqapay",
        description: "Superchare your fuel usage!",
        by: "Tawapay Team"
    }

export default function Project() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <section>
                    <header>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        <p>Members: X, Y, Z</p>
                    </header>
                    <button>Join project</button>
                </section>
            </main>
        </>)
}
